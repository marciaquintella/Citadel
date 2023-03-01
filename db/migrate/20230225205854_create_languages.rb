class CreateLanguages < ActiveRecord::Migration[7.0]
  def change
    create_table :languages do |t|
      t.string :name
      t.string :version
      t.string :source_reference

      t.timestamps
    end
  end
end
