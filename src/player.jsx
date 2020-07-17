import React, { Component } from 'react'
import ReactTable from 'react-table-6'
import 'react-table-6/react-table.css'
import axios from 'axios'
//import PlayerChart from './PlayerChart'
import styled from 'styled-components'
import './player.css'

const Intro = styled.div`
  .dashboard {
    padding-top: 75px;
  }

  h4 {
    color: #23233e;
    text-align: center;
    font-family: "GT America Condensed Bold";
    font-weight: bold;
  }
`;

class Player extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selected_player_id: null,
      playerData: [],
      playerName: ''
    }
  }

  async getDataWithPid(pid) {
    let data = [];
    for (let i = 2019; i > 2003; i--) {
      let url = ('https://www.balldontlie.io/api/v1/season_averages?season=' + i + '&player_ids[]=' + pid);
      let res = await axios.get(url)
      res.data.data.map(player =>
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
  }

  componentDidUpdate(prevProps) {
    if (this.props.id !== prevProps.id) {
      this.getDataWithPid(this.props.id)
    }
  }

  componentDidMount() {
    const pid = this.props.id
    this.setState({
      selected_player_id: pid
    })
    this.getDataWithPid(pid)
  }

  render() {
    const columns = [
      {
        Header: 'Year',
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
      <Intro>
        <div>
          <div>
            <div>
              <h4>{this.props.name}</h4>
              <ReactTable
                className="table"
                data={this.state.playerData}
                columns={columns} />
            </div>

          </div>

        </div>
      </Intro>
    )
  }
}

export default Player
