class CreateFeedbacks < ActiveRecord::Migration[7.0]
  def change
    create_table :feedbacks do |t|
      t.string :query
      t.string :results
      t.text :content

      t.timestamps
    end
  end
end
