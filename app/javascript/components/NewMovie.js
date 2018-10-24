import React from "react"
import PropTypes from "prop-types"
class NewMovie extends React.Component {


 

  render () {
    let formFields = {}
    return (
      <div>

			<div className="modal fade" id="exampleModalLong" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
			  <div className="modal-dialog" role="document">
			    <div className="modal-content">
			      <div className="modal-header">
			        <h5 className="modal-title" id="exampleModalLongTitle">Ingresar Pelicula</h5>
			        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
			          <span aria-hidden="true">&times;</span>
			        </button>
			      </div>
			      <div className="modal-body">

			            <input className="form-control" ref={input => formFields.title = input} placeholder='Titulo'/><br></br>
				        <input className="form-control" ref={input => formFields.description = input} placeholder='Descripcion' /><br></br>
				        <input className="form-control"  ref={input => formFields.starring = input} placeholder='Protagonistas' /><br></br>
				        <input className="form-control"  ref={input => formFields.genre = input} placeholder='Genero' />      <br></br>  
				        <input className="form-control" type='date'  ref={input => formFields.year = input} placeholder='Fecha' /><br></br>
				        <input className="form-control" type="file"  ref={input => formFields.photo = input} placeholder='Imagen' />   <br></br>

				        <button data-dismiss="modal" className="btn btn-success" onClick={ () => this.props.handleFormSubmit(formFields.title.value, formFields.description.value, formFields.starring.value, formFields.year.value, formFields.genre.value, formFields.photo)}>Submit</button>
			      </div>
			    </div>
			  </div>
			</div>



      </div>
    );
  }
}


NewMovie.propTypes = {

  handleFormSubmit: PropTypes.func,

};


export default NewMovie
