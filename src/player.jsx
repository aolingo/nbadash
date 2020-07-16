import React, { Component } from 'react'

export default class Player extends Component {


  //the id of this player can be accessed with props.id

  render() {
    return (
      <div>
        {this.props.id}
      </div>
    )
  }
}
