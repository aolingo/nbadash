import React from 'react';

class Search extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            name: "",
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event){
        const {className, value} = event.target;
        this.setState({
            [className]: value
        })
    }

    render(){
        return(
            <div className="search_bar_container">
                <input className="name" type="text" placeholder="Player Name" onChange={this.handleChange} value={this.state.name} />
            </div>
        )
    }

}

export default Search