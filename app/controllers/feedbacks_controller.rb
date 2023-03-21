class FeedbacksController < ApplicationController
  skip_before_action :authenticate_user!

  def create
    Feedback.create(feedback_params)
    redirect_to '/pages/home', notice: "Agradecemos o feedback!"
  end

  private

  def feedback_params
    params.require(:feedback).permit(:query, :results, :content)
  end
end
