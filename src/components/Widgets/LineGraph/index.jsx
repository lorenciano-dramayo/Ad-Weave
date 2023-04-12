import * as React from 'react';
import Paper from '@mui/material/Paper';
import { connectProps } from '@devexpress/dx-react-core';
import { EventTracker, HoverState } from '@devexpress/dx-react-chart';

import PropTypes from 'prop-types';

import {
  Chart,
  SplineSeries,
  ArgumentAxis,
  ValueAxis,
  Legend,
  Title,
} from '@devexpress/dx-react-chart-material-ui';
import { energyConsumption as data } from './demo';

const rootStyles = {
  display: 'flex',
  margin: 'auto',
  flexDirection: 'row',
};
const LegendRoot = (props) => <Legend.Root {...props} style={rootStyles} />;

const defaultLabelStyles = {
  marginBottom: '8px',
  whiteSpace: 'nowrap',
  fontSize: '20px',
  color: 'lightgray',
};
const hoveredLabelStyles = {
  ...defaultLabelStyles,
  color: 'black',
};
const LegendLabel = ({ hoveredSeriesName, text }) => (
  <div
    style={hoveredSeriesName === text ? hoveredLabelStyles : defaultLabelStyles}
  >
    {text}
  </div>
);

const itemStyles = {
  flexDirection: 'column-reverse',
};
const LegendItem = (props) => <Legend.Item {...props} style={itemStyles} />;

export default class LineGraph extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data,
      hover: undefined,
    };

    this.changeHover = (hover) => this.setState({ hover });

    this.legendLabel = connectProps(LegendLabel, () => {
      const { hover } = this.state;
      const hoveredSeriesName = hover ? hover.series : undefined;
      return {
        hoveredSeriesName,
      };
    });
  }

  componentDidUpdate() {
    this.legendLabel.update();
  }

  render() {
    const { data: chartData, hover } = this.state;

    return (
      <Paper elevation={0} variant="outlined">
        <Chart data={chartData}>
          <ArgumentAxis />
          <ValueAxis />

          <SplineSeries
            name="Others"
            valueField="hydro"
            argumentField="country"
          />
          <SplineSeries
            name="Asset Review"
            valueField="oil"
            argumentField="country"
          />
          <SplineSeries
            name="Client Revisions"
            valueField="gas"
            argumentField="country"
          />
          <SplineSeries
            name="Assembly/Audience"
            valueField="coal"
            argumentField="country"
          />
          <SplineSeries
            name="Studio Setup"
            valueField="nuclear"
            argumentField="country"
          />
          <SplineSeries
            name="Creative Build"
            valueField="nuclear"
            argumentField="country"
          />
          <Title text="In Progress" />
          <Legend
            position="top"
            rootComponent={LegendRoot}
            itemComponent={LegendItem}
            labelComponent={this.legendLabel}
          />

          <EventTracker />
          <HoverState hover={hover} onHoverChange={this.changeHover} />
        </Chart>
      </Paper>
    );
  }
}

LegendLabel.propTypes = {
  hoveredSeriesName: PropTypes.string,
  text: PropTypes.string,
};
