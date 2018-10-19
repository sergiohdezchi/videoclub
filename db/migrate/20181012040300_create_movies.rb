class CreateMovies < ActiveRecord::Migration[5.2]
  def change
    create_table :movies do |t|
      t.string :title
      t.string :description
      t.string :genre
      t.date :year
      t.string :starring

      t.timestamps
    end
  end
end
