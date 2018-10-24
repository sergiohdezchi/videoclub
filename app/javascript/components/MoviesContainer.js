import React from "react"
import PropTypes from "prop-types"
import MoviesList from "./MoviesList"
import NewMovie from "./NewMovie"
import Detail from './Detail'

var token = document.querySelector("meta[name='csrf-token']").content;

class MoviesContainer extends React.Component {	



  constructor(props) {
    super(props);
    this.state = {
  		movies: []
    };
    this.parentUpdateProject = this.parentUpdateProject.bind(this)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)

  }



  handleFormSubmit(title, description, starring, year, genre, photo){
    console.log(photo);
    if (title=='' && description=='') {
           var notification2 = alertify.notify('No puede crear una pelicula sin titulo y descripcion.', 'error', 5, function(){});
    }else{

    //  let body = JSON.stringify({movie: { title: title, description: description, starring: starring, year: year, genre: genre, photo: photo } })

      var formData = new FormData()
      formData.append("movie[title]", title)
      formData.append("movie[description]", description)
      formData.append("movie[starring]", starring)
      formData.append("movie[year]", year)
      formData.append("movie[genre]", genre)
      formData.append("movie[photo]", photo.files[0])

      var that = this
      $.ajax({
          url: '/movies',
          data: formData,
          type: 'POST',
          dataType: "json",
          contentType: false, // NEEDED, DON'T OMIT THIS (requires jQuery 1.6+)
          processData: false, // NEEDED, DON'T OMIT THIS
          success : function(response){
              var movie = response
              console.log(that.state.movies)
              let newMovies = that.state.movies.filter((f) => f.id !== movie.id)
              newMovies.push(movie)


              that.setState({
                movies: newMovies.sort((a, b) => a.id > b.id)
              })
              var notification = alertify.notify('Creado Correctamente', 'success', 5, function(){});
          },
          error : function(){
              var notification2 = alertify.notify('Error al crear pelicula', 'error', 5, function(){});
          },
      });

    }
    
  }



  parentUpdateProject(movie,id){



      var that = this
      $.ajax({
          url: `/movies/${id}`,
          data: movie,
          type: 'PUT',
          dataType: "json",
          contentType: false, // NEEDED, DON'T OMIT THIS (requires jQuery 1.6+)
          processData: false, // NEEDED, DON'T OMIT THIS
          success : function(response){
              var movie = response
              let newMovies = that.state.movies.filter((f) => f.id !== movie.id)
              newMovies.push(movie)


              that.setState({
                movies: newMovies.sort((a, b) => a.id > b.id)
              })
              var notification = alertify.notify('Actualizado Correctamente', 'success', 5, function(){});
          },
          error : function(){
              var notification2 = alertify.notify('Error al actualizar pelicula', 'error', 5, function(){});
          },
      });



  }

  componentDidMount(){
    fetch('/movies')
      .then((response) => {return response.json()})
      .then((data) => {this.setState({ movies: data.sort((a, b) => a.id > b.id) }) });
  }



  render () {


    const url = new URL(document.location)
      const hasId= url.searchParams.has('id')
        
        if (hasId) {
          return <Detail id={url.searchParams.get('id')}/>
        }


    return (
      <div>
        <br/>
        <h1 className="centrado">LISTA DE PELICULAS</h1>

        <button type="button"   className="btn btn-primary" data-toggle="modal" data-target="#exampleModalLong">+</button>  
        <NewMovie handleFormSubmit={this.handleFormSubmit}/>
        <MoviesList movies={this.state.movies} parentUpdateProject={this.parentUpdateProject} />
 
                    <div className="row" />


      </div>
    )
  }
}



export default MoviesContainer
