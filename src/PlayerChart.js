import React, { PureComponent } from 'react';
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
} from 'recharts';
import axios from 'axios'

export default class PlayerChart extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      selected_player_id: null,
      data: [
        {
          subject: 'PTS', A: 120, fullMark: 150,
        },
        {
          subject: 'AST', A: 98, fullMark: 150,
        },
        {
          subject: 'REB', A: 86, fullMark: 150,
        },
        {
          subject: 'STL', A: 99, fullMark: 150,
        },
        {
          subject: 'BLK', A: 85, fullMark: 150,
        },
        {
          subject: 'MIN', A: 65, fullMark: 150,
        },
      ]
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.id !== prevProps.id) {
      this.getRadarWithPid(this.props.id)
    }
  }

  componentDidMount() {
    const pid = this.props.id
    this.setState({
      selected_player_id: pid
    })
    this.getRadarWithPid(pid)
  }

  getRadarWithPid(pid) {
    const season = this.findLastSeason(pid, 2019);
    let data = [
      {
        subject: 'PTS', A: 120, fullMark: 150,
      },
      {
        subject: 'AST', A: 98, fullMark: 150,
      },
      {
        subject: 'REB', A: 86, fullMark: 150,
      },
      {
        subject: 'STL', A: 99, fullMark: 150,
      },
      {
        subject: 'BLK', A: 85, fullMark: 150,
      },
      {
        subject: 'MIN', A: 65, fullMark: 150,
      }
    ];

    axios.get('https://www.balldontlie.io/api/v1/season_averages?season=' + season + '&player_ids[]=' + pid)
      .then(response => {
        data[0].A = response.data.data[0].pts;
        data[1].A = response.data.data[0].ast;
        data[2].A = response.data.data[0].reb;
        data[3].A = response.data.data[0].stl;
        data[4].A = response.data.data[0].blk;
        data[5].A = response.data.data[0].min;
      })

    this.setState({ data: data });
  }

  findLastSeason(pid, season) {
    axios.get('https://www.balldontlie.io/api/v1/season_averages?season=' + season + '&player_ids[]=' + pid)
      .then(response => {
        if (response.data.data.length === 1) {
          if (response.data.data[0].games_played > 30) {
            return season;
          }
        }
        if (season > 2002)
          return (this.findLastSeason(pid, season - 1));
        else
          return 2020;
      })
  }

  render() {
    return (
      <RadarChart cx={300} cy={250} outerRadius={150} width={500} height={500} data={this.state.data}>
        <PolarGrid />
        <PolarAngleAxis dataKey="subject" />
        <PolarRadiusAxis />
        <Radar name="Mike" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
      </RadarChart>
    );
  }
}
