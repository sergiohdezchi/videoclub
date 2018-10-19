import React from "react"
import PropTypes from "prop-types"

class Movie extends React.Component {

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
    };
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



  render () {



          return(
          <div className="card" style={{width: '18rem'}}>
            <a href={`?id=${this.state.id}`}>
              <img className="card-img-top" src={this.state.photo} alt="Card image cap" />
              <div className="card-body">
                <h5 className="card-title">{this.state.title}</h5>
                <p className="card-text">{this.state.description}.</p>
              </div>
            </a>
          </div>
          )

  }
}

export default Movie
