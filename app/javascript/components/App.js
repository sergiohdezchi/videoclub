import React from "react"
import { Route, Switch } from 'react-router-dom'
import  Home  from './Home'
import { Detail } from './Detail'
import { NotFound } from './NotFound'
class App extends React.Component {

 

  render () {

    return(
        <div className="App">
        	<Switch>
        		<Route exact path="/" component={ Home } />        		
          		<Route path='/detail/:movieId' component={ Detail } />
        		<Route component={ NotFound } />
        	</Switch>
        </div>
    )
  }
}

export default App
