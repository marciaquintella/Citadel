class AiRequestJob < ApplicationJob
  queue_as :default

  before_perform do
    loading_message(@arguments)
  end

  def perform(ai_request_params)
    if ai_request_params[:prompt] == ""
      generated_answers = "Por favor, inclua ao menos um termo a ser pesquisado na sua busca."

      uuid = ai_request_params[:uuid]
      Turbo::StreamsChannel.broadcast_update_to("channel_#{uuid}",
                                                target: 'ai_output',
                                                partial: 'ai/output',
                                                locals: { generated_answers: })
    else
      client = OpenAI::Client.new
      @openai_output = client.chat(
        parameters: {
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: "#{ai_request_params[:prompt]} Javascript em português"}],
          temperature: 0.1
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

  private

  def loading_message(arguments)
    generated_answers = "load"

    uuid = arguments[0][:uuid]
    Turbo::StreamsChannel.broadcast_update_to("channel_#{uuid}",
                                                target: 'ai_output',
                                                partial: 'ai/output',
                                                locals: { generated_answers: })
  end
end
