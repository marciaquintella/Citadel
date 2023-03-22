class PagesController < ApplicationController
  require 'securerandom'
  skip_before_action :authenticate_user!, only: [:home, :javascript, :ai_request]

  def home
  end

  def javascript
    @uuid = SecureRandom.uuid
  end

  def ai_request
    AiRequestJob.perform_later(ai_request_params)
  end

  private

  def ai_request_params
    params.require(:ai_request).permit(:prompt, :uuid)
  end
end
