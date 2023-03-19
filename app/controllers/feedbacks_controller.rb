class FeedbacksController < ApplicationController
  skip_before_action :authenticate_user!

  def create
    ids_funcoes = params["array"]
    feedback = params["content"]
    query = params["query"]

    Feedback.create(query:, results: ids_funcoes, content: feedback)
    redirect_to '/pages/home'
  end
end
