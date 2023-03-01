class CreateFunctions < ActiveRecord::Migration[7.0]
  def change
    create_table :functions do |t|
      t.string :klass
      t.string :function_name
      t.text :content
      t.text :code
      t.string :key_words
      t.references :language, null: false, foreign_key: true

      t.timestamps
    end
  end
end
