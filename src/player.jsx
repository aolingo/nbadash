import React, { Component } from 'react'
import ReactTable from 'react-table-6'
import 'react-table-6/react-table.css'
import axios from 'axios'

class Player extends Component {

  constructor(props) {
    super(props);
    this.state = {
      playerData: []
    }
  }

  componentDidMount() {
    let data = []
    const pid = this.props.id
    axios.get('https://www.balldontlie.io/api/v1/season_averages?season=2010&player_ids[]=' + pid)
      .then(response => {
        if (response.data.data.length > 0) {
          response.data.data.map(player =>
            data.push({
              pid: player.player_id,
              season: player.season,
              gp: player.games_played,
              min: player.min,
              fgm: player.fgm,
              fga: player.fga,
              fg3m: player.fg3m,
              fg3a: player.fg3a,
              ftm: player.ftm,
              fta: player.fta,
              oreb: player.oreb,
              dreb: player.dreb,
              reb: player.reb,
              ast: player.ast,
              stl: player.stl,
              blk: player.blk,
              turnover: player.turnover,
              pf: player.pf,
              pts: player.pts,
              fg_pct: player.fg_pct,
              fg3_pct: player.fg3_pct,
              ft_pct: player.ft_pct
            })
          )
          this.setState({
            playerData: data
          })
        }
      })
      .catch(err => console.log(err))
  }

  // Need player id and player name, team name from parent class

  render() {

    const columns = [{
      id: 'pid',
      Header: 'Player ID',
      accessor: 'pid',
    },
    {
      Header: 'Yr',
      accessor: 'season'
    },
    {
      Header: 'GP',
      accessor: 'gp'
    },
    {
      Header: 'MIN',
      accessor: 'min'
    },
    {
      Header: 'FGM',
      accessor: 'fgm'
    },
    {
      Header: 'FGA',
      accessor: 'fga'
    },
    {
      Header: 'FG%',
      accessor: 'fg_pct'
    },
    {
      Header: 'FG3M',
      accessor: 'fg3m'
    },
    {
      Header: 'FG3A',
      accessor: 'fg3a'
    },
    {
      Header: 'FG3%',
      accessor: 'fg3_pct'
    },
    {
      Header: 'FTM',
      accessor: 'ftm'
    },
    {
      Header: 'FTA',
      accessor: 'fta'
    },
    {
      Header: 'FT%',
      accessor: 'ft_pct'
    },
    {
      Header: 'OREB',
      accessor: 'oreb'
    },
    {
      Header: 'DREB',
      accessor: 'dreb'
    },
    {
      Header: 'AST',
      accessor: 'ast'
    },
    {
      Header: 'STL',
      accessor: 'stl'
    },
    {
      Header: 'BLK',
      accessor: 'blk'
    },
    {
      Header: 'TO',
      accessor: 'turnover'
    },
    {
      Header: 'PF',
      accessor: 'pf'
    },
    {
      Header: 'PTS',
      accessor: 'pts'
    }]

    return (
      <div>
        <h4>Player Stats</h4>
        <ReactTable
          data={this.state.playerData}
          columns={columns} />
      </div>
    )
  }
}

export default Player
