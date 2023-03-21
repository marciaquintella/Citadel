class FeedbacksController < ApplicationController
  skip_before_action :authenticate_user!, only: :create

  def create
    Feedback.create(feedback_params)
    redirect_to '/pages/home', notice: "Agradecemos o feedback!"
  end

  def index
    untreated_feedbacks = Feedback.all
    @feedbacks = {}
    @feedbacks = untreated_feedbacks.map do |feedback|
      {
        query: feedback[:query],
        content: feedback[:content],
        results: retrieve_results(feedback[:results])
      }
    end
  end

  private

  def feedback_params
    params.require(:feedback).permit(:query, :results, :content)
  end

  def retrieve_results(results_string)
    results_array = results_string.split(',').map(&:to_i)
    results_array.map! { |id| Function.find(id) }
  end
end
