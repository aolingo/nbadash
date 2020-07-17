import React, { Component } from 'react';
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
} from 'recharts';
import axios from 'axios'

export default class PlayerChart extends Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      selected_player_id: null,
      selected_season: 2019,
      data: [
        { subject: 'PTS', A: 0, B: 110, fullMark: 40 },
        { subject: 'AST', A: 0, B: 130, fullMark: 40 },
        { subject: 'REB', A: 0, B: 130, fullMark: 40 },
        { subject: 'STL', A: 0, B: 100, fullMark: 40 },
        { subject: 'BLK', A: 0, B: 90, fullMark: 40 },
        { subject: 'MIN', A: 0, B: 85, fullMark: 40 },
      ]
    }
  }

  handleChange(event){
    const year = event.target.value;
    this.setState({
      selected_season: year
    })
    this.getRadarWithPid(this.props.id, year)
  }

  componentDidUpdate(prevProps) {
    if (this.props.id !== prevProps.id) {
      this.getRadarWithPid(this.props.id, 2019)
    }
  }

  componentDidMount() {
    const pid = this.props.id
    this.setState({
      selected_player_id: pid
    })
    this.getRadarWithPid(pid, 2019);
  }

  async getRadarWithPid(pid, season) {
    let data = [
      { subject: 'PTS', A: 0, B: 110, fullMark: 30 },
      { subject: 'AST', A: 0, B: 130, fullMark: 20 },
      { subject: 'REB', A: 0, B: 130, fullMark: 20 },
      { subject: 'STL', A: 0, B: 100, fullMark: 4 },
      { subject: 'BLK', A: 0, B: 90, fullMark: 4 },
      { subject: 'MIN', A: 0, B: 85, fullMark: 40 },
    ]

    let url = 'https://www.balldontlie.io/api/v1/season_averages?season=' + season + '&player_ids[]=' + pid;
    await axios.get(url)
      .then(response => {
        if (response.data.data.length > 0) {
          data[0].A = response.data.data[0].pts;
          data[1].A = 4*(response.data.data[0].ast);
          data[2].A = 3*(response.data.data[0].reb);
          data[3].A = 20*(response.data.data[0].stl);
          data[4].A = 20*(response.data.data[0].blk);
          data[5].A = parseInt(response.data.data[0].min);
        }
      })

    this.setState({ data: data });
  }

  render() {
    return (
      <div>
        <h4 style={{marginLeft: "180px"}} >{`Selected Season ${this.state.selected_season}`}</h4>
        <input type="number" min="2003" max="2019" value={this.state.selected_season} onChange={this.handleChange} style={{marginLeft: "270px"}} />
        <RadarChart cx={300} cy={250} outerRadius={150} width={500} height={500} data={this.state.data}>
          <PolarGrid dataKey="fullMark" />
          <PolarAngleAxis dataKey="subject" />
          <PolarRadiusAxis dataKey="fullMark" />
          <Radar name="Mike" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
        </RadarChart>
      </div>
    );
  }
}
