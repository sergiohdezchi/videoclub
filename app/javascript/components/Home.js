import React from "react"
import PropTypes from "prop-types"
import MoviesList from "./MoviesList"

class Home extends React.Component {

  state = { results: [] }



  componentDidMount() {
  	console.log("mount");
    fetch(`/movies`)
      .then(res => res.json())
      .then(results => {
        
        this.setState({ results: results })

      })
  }
  
  _renderResults() {
    return this.state.results.length === 0
      ? <p>Sorry! Results not found!</p>
      : <MoviesList movies={this.state.results} />
  }

  render () {
  	console.log("render");
    return (
    	<div className="App">
    		<h1 className="text-center">Video Club</h1>
    		<div className="text-center">    			
		        {
		          this._renderResults()
		        }
    		</div>

    		<div className="content">
    		</div>



    	</div>
    );
  }
}

export default Home
