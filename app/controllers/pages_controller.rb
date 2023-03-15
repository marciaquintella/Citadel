class PagesController < ApplicationController
  skip_before_action :authenticate_user!, only: [:home, :javascript]

  def home
   
  end

  def javascript
  end
end
