import React from 'react';
import axios from 'axios';
import Player from './player.jsx';
import './search.css'
import PlayerChart from './PlayerChart'


class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            players: [],
            selected_player_id: null,
            selected_player_name: ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.clearAll = this.clearAll.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        })
        const info = this.state.name;
        if (this.state.name !== "") {
            axios.get('https://www.balldontlie.io/api/v1/players?search=' + info + '&page=1')
                .then(response => {
                    if (response.data.data.length > 0) {
                        const list_of_players = [];
                        response.data.data.map(player =>
                            list_of_players.push([player.first_name, player.last_name, player.team.abbreviation, player.id])
                        )
                        this.setState({
                            players: list_of_players
                        })
                    }
                })
        } else {
            this.setState({
                players: []
            })
        }

    }

    handleClick(event) {
        this.clearAll();
        const { id, value } = event.target;
        this.setState({
            selected_player_id: id,
            name: "",
            players: [],
            selected_player_name: value
        })
    }

    clearAll() {
        this.setState({
            selected_player_id: null,
            selected_player_name: ""
        })
    }

    render() {
        return (
            <div className="search_bar_container">
                <div className="form__group field">
                    <input className="form__field" name="name" id="name" type="text" placeholder="Player Name" onChange={this.handleChange} value={this.state.name} required />
                    <label htmlFor="name" className="form__label" >Player Name</label>
                </div>
                <ul className="list_of_players">
                    {this.state.players.map((value, idx) => (
                        <div key={idx}>
                            <button id={value[3]} value={`${value[0]} ${value[1]}`} className="individual_player" onClick={this.handleClick}>
                                {`${value[0]} ${value[1]} - ${value[2]}`}
                            </button>
                            <br />
                        </div>
                    ))}
                </ul>
                <div className="stats">
                    {this.state.selected_player_id === null ? null : <Player id={this.state.selected_player_id} name={this.state.selected_player_name} />}
                    {this.state.selected_player_id === null ? null : <PlayerChart id={this.state.selected_player_id} />}
                </div>
            </div>
        )
    }
}

export default Search