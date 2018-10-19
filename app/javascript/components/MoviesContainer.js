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
    console.log(title+ description+ starring+ year+ genre+ photo);
    let body = JSON.stringify({movie: { title: title, description: description, starring: starring, year: year, genre: genre, photo: photo} })

    fetch('/movies', {
      method: 'POST',
    headers: {
      'X-CSRF-Token': token,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
      body: body,
    }).then((response) => {return response.json()})
    .then((movie)=>{
        this.setState({
          movies: movie.sort((a, b) => a.id > b.id)
        })
        var notification = alertify.notify('Creado Correctamente', 'success', 5, function(){});
    })
    
  }



  parentUpdateProject(movie){

      fetch(`/movies/${movie.id}`, 
      {
        method: 'PUT',
        body: JSON.stringify({movie: movie}),
      headers: {
        'X-CSRF-Token': token,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      }).then((response) => { 
            return response.json()
      }).then((movie)=>{
          let newMovies = this.state.movies.filter((f) => f.id !== movie.id)
          newMovies.push(movie)


          this.setState({
            movies: newMovies.sort((a, b) => a.id > b.id)
          })
          var notification = alertify.notify('Actualizado Correctamente', 'success', 5, function(){});

      })
      
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
 
                    <div className="row" style={{  'padding-bottom': '90px' }} />


      </div>
    )
  }
}



export default MoviesContainer
