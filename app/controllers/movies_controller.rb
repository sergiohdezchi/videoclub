class MoviesController < ApplicationController

	before_action :set_movie, only: [:show, :edit, :update, :destroy]

	def index
		@movies = Movie.all
		#@movies.order(id: :desc)		
		render json: @movies.order(title: :desc)
	end		

	def new
		@movie = Movie.new
		#@movie		
		render json: @movie
	end	

	def create
		#render plain: params[:movie].inspect
		@movie = Movie.new movie_params

		if @movie.save
			return redirect_to movies_path		
		end
		render :new 
	end

	def show
		render json: @movie
	end



	def edit
	end

	def update
		@movie.update movie_params
		#redirect_to @movie		
		render json: @movie
	end


	def destroy 
		@movie.destroy
		redirect_to movies_path
	end


	def make_a_rent
		
	end

	def rent
		palos = [ "Se completó la renta" , "No se le puede rentar porque tiene deudas"]
		num = palos.length
  		palo_aleat = rand(num)
  		output = { 'respuesta' => palos[palo_aleat] }.to_json
		render json: output
	end

	private
	def movie_params
		params.require(:movie).permit(:photo, :title, :description, :genre, :starring, :year)
	end

	def set_movie
		@movie = Movie.find params[:id]
	end

end
