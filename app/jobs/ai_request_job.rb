class AiRequestJob < ApplicationJob
  queue_as :default

  def perform(ai_request_params)
    client = OpenAI::Client.new
    @openai_output = client.chat(
      parameters: {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: "#{ai_request_params[:prompt]} Javascript"}],
        temperature: 0.5
      }
    )

    generated_answers = @openai_output['choices'][0]['message']['content']

    uuid = ai_request_params[:uuid]
    Turbo::StreamsChannel.broadcast_update_to("channel_#{uuid}",
                                              target: 'ai_output',
                                              partial: 'ai/output',
                                              locals: { generated_answers: })
  end
end
