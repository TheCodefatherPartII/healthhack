import React from 'react';
import { Header, Icon, Label, Table, List, ListItem, Message, Segment } from "semantic-ui-react";
import { ResponsiveLine } from "@nivo/line";

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const getRank = () => getRandomInt(1, 45);

function ordinal_suffix_of(i) {
  var j = i % 10,
    k = i % 100;
  if (j == 1 && k != 11) {
    return i + "st";
  }
  if (j == 2 && k != 12) {
    return i + "nd";
  }
  if (j == 3 && k != 13) {
    return i + "rd";
  }
  return i + "th";
}
const generalName = (specific) => specific.replace('school', 'education').replace('hospital', 'health')

class DetailsPane extends React.Component {
  renderStats() {
    const stats = [
      { icon: 'ambulance', name: 'Health Services'},
      { icon: 'user secret', name: 'Crime Rate'},
      { icon: 'book', name: 'Education' },
      { icon: 'usd', name: 'Employment' }
    ];

    return stats.map(s => {
      const rank = getRank();
      let colour;

      if (rank <= 10) colour = 'green';
      else if (rank <= 20) colour = undefined;
      else if (rank <= 35) colour = 'orange';
      else if (rank <= 45) colour = 'red';

      return (
        <Table.Row style={{color: colour}}>
          <Table.Cell>
            <Icon name={s.icon}/>
          </Table.Cell>

          <Table.Cell>
            <strong>{s.name}</strong>
          </Table.Cell>
          <Table.Cell>
            {ordinal_suffix_of(rank)} state-wide
          </Table.Cell>

          <Table.Cell style={{textAlign: 'right'}}>
            <Icon name={'arrow alternate circle ' + (rank % 2 ? 'up' : 'down') }/>
          </Table.Cell>
        </Table.Row>
      );
    });
  }

  renderOverall() {
    return (
      <ResponsiveLine
        data={[
          {
           "id": "Education",
            "color": "hsl(239, 70%, 50%)",
            "data": [
              {
                "x": "2016",
                "y": getRank()
              },
              {
                "x": "2016",
                "y": getRank()
              },
              {
                "x": "2016",
                "y": getRank()
              },
              {
                "x": "2016",
                "y": getRank()
              },
            ]
          },
          {
            "id": "Crime Rate",
            "color": "hsl(106, 70%, 50%)",
            "data": [
              {
                "x": "2017",
                "y": getRank()
              },
              {
                "x": "2017",
                "y": getRank()
              },
              {
                "x": "2017",
                "y": getRank()
              },
              {
                "x": "2017",
                "y": getRank()
              },
            ]
          },
          {
            "id": "Child Care",
            "color": "hsl(56, 70%, 50%)",
            "data": [
              {
                "x": "2018",
                "y": getRank()
              },
              {
                "x": "2018",
                "y": getRank()
              },
              {
                "x": "2018",
                "y": getRank()
              },
              {
                "x": "2018",
                "y": getRank()
              },
            ]
          },
        ]}
        margin={{
          "top": 40,
          "right": 40,
          "bottom": 40,
          "left": 40
        }}
        xScale={{
          "type": "linear",
          "stacked": true,
          "min": 45,
          "max": 1
        }}
        yScale={{
          "type": "point",
        }}
        minY="auto"
        maxY="auto"
        stacked={true}
        axisBottom={{
          "orient": "bottom",
          "tickSize": 5,
          "tickPadding": 5,
          "tickRotation": 0,
          "legendOffset": 36,
          "legendPosition": "center"
        }}
        axisLeft={{
          "orient": "left",
          "tickSize": 5,
          "tickPadding": 5,
          "tickRotation": 0,
          "legend": "count",
          "legendOffset": -40,
          "legendPosition": "center"
        }}
        dotSize={10}
        dotColor="inherit:darker(0.3)"
        dotBorderWidth={2}
        dotBorderColor="#ffffff"
        enableDotLabel={true}
        dotLabel="y"
        dotLabelYOffset={-12}
        animate={true}
        motionStiffness={90}
        motionDamping={15}
        legends={[
          {
            "anchor": "bottom-right",
            "direction": "column",
            "justify": false,
            "translateX": 100,
            "translateY": 0,
            "itemsSpacing": 0,
            "itemDirection": "left-to-right",
            "itemWidth": 80,
            "itemHeight": 20,
            "itemOpacity": 0.75,
            "symbolSize": 12,
            "symbolShape": "circle",
            "symbolBorderColor": "rgba(0, 0, 0, .5)",
            "effects": [
              {
                "on": "hover",
                "style": {
                  "itemBackground": "rgba(0, 0, 0, .03)",
                  "itemOpacity": 1
                }
              }
            ]
          }
        ]}
      />
    );
  }
  render() {

    const population = parseInt(this.props.lga.POPULATION, 10);
    return (
      <div>

        <Message
          info
          icon='map marker alternate'
          header={this.props.lga.ORGNAME}
          content={!Number.isNaN(population)
            ? population.toLocaleString() + ' residents'
            : undefined}
          attached="top"
        />
        <Table attached='bottom'>
          <Table.Body>
            {this.renderStats()}
          </Table.Body>
        </Table>

        { false &&
          <div>
        <Message attached='top' header='Overall Rating'/>
        <Segment attached='bottom' style={{height: 200}}>
          {this.renderOverall()}
        </Segment>
          </div>
        }

        <Message
          header='Available Services'
          attached="top"
        />
          <Table attached='bottom'>
            <Table.Body>
            {
              Object.keys(this.props.selectedLgaStats).map(type =>
                <Table.Row>
                  <Table.Cell>
                  <img src={`/${type}.png`} style={{verticalAlign: 'middle'}} />
                  </Table.Cell>
                  <Table.Cell>
                  {' '}
                  {this.props.selectedLgaStats[type]} {type.replace('childcare', 'childcare centre')}s
                  </Table.Cell>
                </Table.Row>
              )
            }
            </Table.Body>
          </Table>
      </div>
    );
  }
}

export default DetailsPane;