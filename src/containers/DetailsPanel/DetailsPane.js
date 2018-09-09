import React from 'react';
import { Header, Icon, Label, List, ListItem, Message, Segment } from "semantic-ui-react";
import { Bar } from "@nivo/bar";

class DetailsPane extends React.Component {
  getChartData(lgacrime) {
    const chartData = lgacrime.map((lga) => {
      return {
        "lgaId": lga.lgaId,
        "murder": lga.murder,
        "murderColor": "hsl(327, 70%, 50%)",
        "domesticViolence": lga.domesticViolence,
        "domesticViolenceColor": "hsl(138, 70%, 50%)",
        "nonDomesticViolence": lga.nonDomesticViolence,
        "nonDomesticViolenceColor": "hsl(128, 70%, 50%)",
        "sexualAssault" : lga.sexualAssault,
        "sexualAssaultColor": "hsl(120, 100%, 79%)",
        "robbery": lga.robbery,
        "robberyColor": "hsl(145, 100%, 79%)",
        "breakIns" : lga.breakIns,
        "breakInsColor": "hsl(189, 100%, 79%)",
        "fraud" : lga.fraud,
        "fraudColor": "hsl(250, 100%, 79%)",
        "motorVehicleTheft" : lga.motorVehicleTheft,
        "motorVehicleTheftColor": "hsl(220, 100%, 79%)",
      }
    })
    console.log("chartData : " + chartData)
    return chartData
  }

  render() {
    const crime = this.props.crime;
    const chartData = this.getChartData(crime).slice(1,15)
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
        />

        <Segment>
          <Header>Indicators</Header>
          <List>
            {["wheelchair"].map(ind => (
              <ListItem key={ind}>
                <Label image>
                  <Icon circular name={ind} />
                  {ind} = {(Math.random() * 100).toFixed(0)}%
                </Label>
              </ListItem>
            ))}
          </List>
        </Segment>
        <Segment>
          <Header>Available Services</Header>
          <List>
            {["Hospitals", "General practices"].map(ind => (
              <ListItem key={ind}>{ind}</ListItem>
            ))}
          </List>
        </Segment>
        <Segment >
          <Bar height={500} width={800}
               data={chartData}
               keys={[
                 "murder",
                 "domesticViolence",
                 "nonDomesticViolence",
                 "sexualAssault",
                 "robbery",
                 "breakIns",
                 "fraud",
                 "motorVehicleTheft"
               ]}
               indexBy="lgaId"
               margin={{
                 "top": 50,
                 "right": 130,
                 "bottom": 50,
                 "left": 60
               }}
               padding={0.3}
               colors="nivo"
               colorBy="id"
               defs={[
                 {
                   "id": "dots",
                   "type": "patternDots",
                   "background": "inherit",
                   "color": "#38bcb2",
                   "size": 4,
                   "padding": 1,
                   "stagger": true
                 },
                 {
                   "id": "lines",
                   "type": "patternLines",
                   "background": "inherit",
                   "color": "#eed312",
                   "rotation": -45,
                   "lineWidth": 6,
                   "spacing": 10
                 }
               ]}
               fill={[
                 {
                   "match": {
                     "id": "fries"
                   },
                   "id": "dots"
                 },
                 {
                   "match": {
                     "id": "sandwich"
                   },
                   "id": "lines"
                 }
               ]}
               borderColor="inherit:darker(1.6)"
               axisBottom={{
                 "orient": "top",
                 "tickSize": 5,
                 "tickPadding": 5,
                 "tickRotation": 0,
                 "legend": "Local government area",
                 "legendPosition": "middle",
                 "legendOffset": 36
               }}
               axisLeft={{
                 "orient": "left",
                 "tickSize": 5,
                 "tickPadding": 5,
                 "tickRotation": 0,
                 "legend": "Crimes",
                 "legendPosition": "middle",
                 "legendOffset": -40
               }}
               labelSkipWidth={12}
               labelSkipHeight={12}
               labelTextColor="inherit:darker(1.6)"
               animate={true}
               motionStiffness={90}
               motionDamping={15}
               legends={[
                 {
                   "dataFrom": "keys",
                   "anchor": "bottom-right",
                   "direction": "column",
                   "justify": false,
                   "translateX": 120,
                   "translateY": 0,
                   "itemsSpacing": 2,
                   "itemWidth": 100,
                   "itemHeight": 20,
                   "itemDirection": "left-to-right",
                   "itemOpacity": 0.85,
                   "symbolSize": 20,
                   "effects": [
                     {
                       "on": "hover",
                       "style": {
                         "itemOpacity": 1
                       }
                     }
                   ]
                 }
               ]}
          />
        </Segment>
      </div>
    );
  }
}

export default DetailsPane;