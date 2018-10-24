import React from "react"
import PropTypes from "prop-types"
import Movie from "./Movie"
import FormUpdate from "./FormUpdate"

class MoviesList extends React.Component {

  constructor(props) {
    super(props);
    this.state = { 
      id: '', 
      title: '', 
      description: '', 
      genre: '',     
      year: '', 
      starring: '', 
      photo: '', 
    }


    this.renderProjectRows = this.renderProjectRows.bind(this);    


  }


    handleEdit(selectedId){
     
       const { movies } = this.props

         // Here we make sure we don't mutate the state
         movies.map((movie) => {
            // Toggle the clicked one, and reset all others to be `false`.
              selectedId == movie.id ? 
              this.setState({
                  id: movie.id,                  
                  title: movie.title,                  
                  description: movie.description,                  
                  genre: movie.genre,                  
                  year: movie.year,                                  
                  starring: movie.starring,                  
                  photo: movie.photo.url,
              })
              : console.log('no')

         })

   /*     this.setState({
          editable: !this.state.editable
        })*/
  }

  renderProjectRows() {
    console.log('render movie')
    console.log(this.props.movies)
    return  this.props.movies.map((movie) => {
      return(
           <div  key={movie.id} className="col-sm-12 col-md-6 col-lg-4" style={{marginTop: "20px"}}>

            <Movie
            id={movie.id}
            title={movie.title}
            description={movie.description}
            genre={movie.genre}
            year={movie.year}             
            starring={movie.starring}
            photo={movie.photo.url}  />
            <button type="button" style={{'width': '18rem'}}   onClick={ () => this.handleEdit(movie.id) } className="btn btn-primary" data-toggle="modal" data-target="#formUpdate">Update</button>    

            </div>
        )
      })
  }





  render () {
    return (
       <div className="row">



          {this.renderProjectRows()}

                    <div className="modal fade" id="formUpdate" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                      <div className="modal-dialog" role="document">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Editar Pelicula</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                              <span aria-hidden="true">×</span>
                            </button>
                          </div>
                          <div className="modal-body">


                           <FormUpdate
                        id={this.state.id}
                        title={this.state.title}
                        description={this.state.description}
                        genre={this.state.genre}
                        year={this.state.year}             
                        starring={this.state.starring}
                        photo={this.state.photo} 
                        parentUpdateProject={this.props.parentUpdateProject} />   


                          </div>

                        </div>
                      </div>
                    </div>

        </div>
    )
  }
}

export default MoviesList
