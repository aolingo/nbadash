import React from 'react';
import axios from 'axios';
import Player from './player.jsx';

class Search extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            name: "",
            players: [],
            selected_player_id: null
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleChange(event){
        const {className, value} = event.target;
        this.setState({
            [className]: value
        })
        const info = this.state.name;
        axios.get('https://www.balldontlie.io/api/v1/players?search=' + info + '&page=1')
            .then(response => {
                if (response.data.data.length > 0){
                    const list_of_players = [];
                    response.data.data.map(player => 
                        list_of_players.push([player.first_name, player.last_name, player.team.abbreviation, player.id])
                    )
                    this.setState({
                        players: list_of_players
                    })
                }
            })
    }

    handleClick(event){
        const { id } = event.target;
        this.setState({
            selected_player_id: id,
            name: ""
        })
    }

    render(){
        return(
            <div className="search_bar_container">
                <input className="name" type="text" placeholder="Player Name" onChange={this.handleChange} value={this.state.name} />
                <ul className="list_of_players">
                    {this.state.players.map((value, idx) => (
                        <div key={idx}>
                            <button id={value[3]} className="individual_player" onClick={this.handleClick}>
                                {`${value[1]}, ${value[0]}   ${value[2]}`}
                            </button>
                            <br />
                        </div>
                    ))}
                </ul>
                <Player id={this.state.selected_player_id} />
            </div>
        )
    }
}

export default Search