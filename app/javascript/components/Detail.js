import React, { Component } from 'react'
import PropTypes from 'prop-types'

export class Detail extends Component {
  static propTypes = {
    id: PropTypes.string
  }

  state = { movie: {} }

  _fetchMovie ({ id }) {
    fetch(`/movies/${id}`)
      .then(response => response.json() 
        
      )
      .then(results => {

        this.setState({ movie: results })

      })
  }

  componentDidMount () {
    const { id } = this.props
    this._fetchMovie({ id })
  }

  render () {
    const { title, year, genre, starring, photo, description } = this.state.movie
    let pho = typeof photo === "undefined" ? 'na' : photo.url

    return (

      <div>
        <a href='/' style={{'margin-bottom': '1rem'}} className="btn btn-light">regresar</a>
        <div className="center-block">
              <div className="card" style={{width: '18rem'}}>
        <img className="card-img-top" src={pho} alt="Card image cap" />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}.</p>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">{genre}</li>
          <li className="list-group-item">{year}</li>
          <li className="list-group-item">{starring}</li>
        </ul>
      </div>
        </div>
      </div>
      





    )
  }
}

export default Detail