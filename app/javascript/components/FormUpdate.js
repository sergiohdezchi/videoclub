import React from "react"
import PropTypes from "prop-types"

class FormUpdate extends React.Component {

  constructor(props) {
      super(props);
      this.state = { 
        id: this.props.id, 
        title: this.props.title, 
        description: this.props.description, 
        genre: this.props.genre,     
        year: this.props.year, 
        starring: this.props.starring, 
        photo: this.props.photo, 
        formErrors: {},
      }
      

  }





  handleTitleChange = (event) => {
    this.setState({
      title: event.target.value
    })
  }

   handleDescriptionChange = (event) => {
    this.setState({
      description: event.target.value
    })
  }

   handleStarringChange = (event) => {
    this.setState({
      starring: event.target.value
    })
  }

   handleGenreChange = (event) => {
    this.setState({
      genre: event.target.value
    })
  }

   handleYearChange = (event) => {
    this.setState({
      year: event.target.value
    })
  }

   handlePhotoChange = (event) => {
    this.setState({
      photo: event.target.files[0]
    })
  }



  componentWillReceiveProps(props) {
    this.setState({ 
      id:props.id,
      title: props.title,
      description: props.description,
      starring: props.starring,
      genre: props.genre,
      year: props.year,
      photo: props.photo,
    })
  }


  handleEdit = () => {
   
      let title = this.state.title
      let description = this.state.description
      let id = this.state.id
      let starring = this.state.starring
      let genre = this.state.genre
      let year = this.state.year
      let photo = this.state.photo

      var formData = new FormData()
      formData.append("movie[title]", title)
      formData.append("movie[description]", description)
      formData.append("movie[starring]", starring)
      formData.append("movie[year]", year)
      formData.append("movie[genre]", genre)
      formData.append("movie[id]", id)

      var pattern = new RegExp("((http|https)(:\/\/))?([a-zA-Z0-9]+[.]{1}){2}[a-zA-z0-9]+(\/{1}[a-zA-Z0-9]+)*\/?","i"); 
      if(!pattern.test(photo)) {
        formData.append("movie[photo]", photo)
        console.log('no era')
      } else {
        formData.append("movie[photo]", '')
        console.log('si era')
      }

      this.props.parentUpdateProject(formData,id)


  }


  render () {



                return (
                  <div>

                <input className="form-control" type='text' onChange={ this.handleTitleChange } value={ this.state.title }   placeholder='title'/><br></br>
                <input className="form-control" type='text' onChange={ this.handleDescriptionChange } value={this.state.description} placeholder="Descripcion"/><br></br>
               <input className="form-control" type='text'  onChange={ this.handleStarringChange } value={this.state.starring} placeholder="Actores"/><br></br>
                 <input className="form-control" type='text' onChange={ this.handleGenreChange }  value={this.state.genre} placeholder="Genero"/>   <br></br>  
               <input className="form-control" type='date'  onChange={ this.handleYearChange }  value={this.state.year} placeholder="Fecha"/><br></br>
             <input className="form-control" type="file"  onChange={ this.handlePhotoChange } value='' /> <br></br>


                          <button data-dismiss="modal" className="btn btn-success" onClick={this.handleEdit}>Send</button>
                  </div>
                  )



  }
}

export default FormUpdate
