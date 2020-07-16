import React, { PureComponent } from 'react';
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
} from 'recharts';

const data = [
  {
    subject: 'PTS', A: 120, B: 110, fullMark: 150,
  },
  {
    subject: 'AST', A: 98, B: 130, fullMark: 150,
  },
  {
    subject: 'REB', A: 86, B: 130, fullMark: 150,
  },
  {
    subject: 'STL', A: 99, B: 100, fullMark: 150,
  },
  {
    subject: 'BLK', A: 85, B: 90, fullMark: 150,
  },
  {
    subject: 'MIN', A: 65, B: 85, fullMark: 150,
  },
];

export default class PlayerChart extends PureComponent {

  render() {
    return (
      <RadarChart cx={300} cy={250} outerRadius={150} width={500} height={500} data={data}>
        <PolarGrid />
        <PolarAngleAxis dataKey="subject" />
        <PolarRadiusAxis />
        <Radar name="Mike" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
      </RadarChart>
    );
  }
}
