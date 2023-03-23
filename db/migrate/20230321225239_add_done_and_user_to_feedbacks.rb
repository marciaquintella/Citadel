class AddDoneAndUserToFeedbacks < ActiveRecord::Migration[7.0]
  def change
    add_column :feedbacks, :done, :boolean, default: false
    add_reference :feedbacks, :user
  end
end
