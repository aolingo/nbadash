import React from 'react';
import axios from 'axios';

class Search extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            name: "",
            players: []
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleChange(event){
        const {className, value} = event.target;
        this.setState({
            [className]: value
        })
    }

    handleClick(){
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
                else {
                    alert("there is no player named " + info + " !");
                }
            })
    }

    render(){
        return(
            <div className="search_bar_container">
                <input className="name" type="text" placeholder="Player Name" onChange={this.handleChange} value={this.state.name} />
                <button className="search" onClick={this.handleClick}>Search</button>
                <ul className="list_of_players">
                    {this.state.players.map((value, idx) => (
                        <li key={idx} className="individual_player">
                            {`${value[1]}, ${value[0]}   ${value[2]}`}
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}

export default Search