import React, { Component } from 'react';
import { Container, Draggable } from 'react-smooth-dnd';
import { applyDrag, generateItems } from './utils';
const groupStyle = {
  marginLeft: '50px',
  flex: 1
};
var token = document.querySelector("meta[name='csrf-token']").content;

class Groups extends Component {
  constructor() {
    super();

    this.state = {

      items1:[],
      items2:[],
    };

    this.sendData = this.sendData.bind(this)
  }


  componentDidMount(){
    fetch('/movies')
      .then((response) => {return response.json()})
      .then((data) => {
          let datos=[]
          data.map((movie) => {
            datos=[...datos,{ id: movie.id , data: movie.title}]
          })

        this.setState({ 
          items1: datos.sort((a, b) => a.id > b.id) 
        }) 
      });
  }

   sendData(datos){
     fetch(`/rent`, 
      {
        method: 'POST',
        body: JSON.stringify({datos: datos}),
      headers: {
        'X-CSRF-Token': token,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      }).then((response) => { 
            return response.json()
      }).then((movie)=>{
          console.log(movie.respuesta)
          if (movie.respuesta=='Se completó la renta') {
            var notification = alertify.notify(movie.respuesta, 'success', 2, function(){});
            notification.ondismiss = function(){ document.location.href="/"; };

          }else{
            var notification2 = alertify.notify(movie.respuesta, 'error', 5, function(){});
          }

      })
    
  }

   rentMovie = (event) => {
      let datasend=[]
      if (this.state.items2.length==0) {
        var notification2 = alertify.notify('No puede rentar sin haber seleccinado al menos una pelicula.', 'error', 5, function(){});
      }else{      
        this.state.items2.map((item) => {
          datasend=[...datasend, item.id ]
        })
        this.sendData(datasend)
      }
  }


  render() {

    return (
      <div className="row">
        <div className="col-md-12"><h3 className="centrado">Rentar Peliculas</h3></div>
        <div className="col-md-12"><p className="opaco">(Arrastre sobre la linea punteada)</p></div>
        <div className="col-md-12">
          <div style={{ display: 'flex', justifyContent: 'stretch', marginTop: '50px', marginRight: '50px' }}>
            <div style={groupStyle}>
              <Container groupName="1" getChildPayload={i => this.state.items1[i]} onDrop={e => this.setState({ items1: applyDrag(this.state.items1, e) })}>
                {
                  this.state.items1.map(p => {
                    return (
                      <Draggable key={p.id}>
                        <div className="draggable-item">
                          {p.data}
                        </div>
                      </Draggable>
                    );
                  })
                }
              </Container>
            </div>
            <div style={groupStyle}>
              <Container  groupName="1" getChildPayload={i => this.state.items2[i]} onDrop={e => this.setState({ items2: applyDrag(this.state.items2, e) })}>
                {
                  this.state.items2.map(p => {
                    return (
                      <Draggable key={p.id}>
                        <div className="draggable-item">
                          {p.data}
                        </div>
                      </Draggable>
                    );
                  })
                }
              </Container>
            </div>
          </div>
        </div>
        <div className="col-md-12 boton-rent">

 
          <button type="button" className="btn btn-primary"   onClick={this.rentMovie} >Rentar</button>
        </div>

      
      </div>
    );
  }
}

Groups.propTypes = {

};

export default Groups;