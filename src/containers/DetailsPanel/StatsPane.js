import React from 'react';
import {Segment, Header} from "semantic-ui-react";
import {Bar} from "@nivo/bar";
import {Pie} from "@nivo/pie";

class StatsPane extends React.Component {
    getCrimeChartData(lgacrime) {
        const chartData = lgacrime.map((lga) => {
            return {
                "lgaId": lga.lgaId,
                "murder": lga.murder,
                "murderColor": "hsl(327, 70%, 50%)",
                "domesticViolence": lga.domesticViolence,
                "domesticViolenceColor": "hsl(138, 70%, 50%)",
                "nonDomesticViolence": lga.nonDomesticViolence,
                "nonDomesticViolenceColor": "hsl(128, 70%, 50%)",
                "sexualAssault": lga.sexualAssault,
                "sexualAssaultColor": "hsl(120, 100%, 79%)",
                "robbery": lga.robbery,
                "robberyColor": "hsl(145, 100%, 79%)",
                "breakIns": lga.breakIns,
                "breakInsColor": "hsl(189, 100%, 79%)",
                "fraud": lga.fraud,
                "fraudColor": "hsl(250, 100%, 79%)",
                "motorVehicleTheft": lga.motorVehicleTheft,
                "motorVehicleTheftColor": "hsl(220, 100%, 79%)"
            }
        })
        return chartData
    }

    getSelectedLgaCrimeChartData(selectedLgaId, crimes) {
        const selectedCrimeData = crimes.find((crime) => crime.lgaId === selectedLgaId)
        console.log(selectedCrimeData)
        return[
            {
                "id" : "breakIns",
                "label" : "breakIns",
                "value" : selectedCrimeData.breakIns,
                "color" : "hsl(189, 100%, 79%)"
            }, {
                "id" : "domesticViolence",
                "label" : "domesticViolence",
                "value" : selectedCrimeData.domesticViolence,
                "color" : "hsl(138, 70%, 50%)"
            }, {
                "id" : "fraud",
                "label" : "fraud",
                "value" : selectedCrimeData.fraud,
                "color" : "hsl(250, 100%, 79%)"
            }, {
                "id" : "motorVehicleTheft",
                "label" : "motorVehicleTheft",
                "value" : selectedCrimeData.motorVehicleTheft,
                "color" : "hsl(220, 100%, 79%)"
            }, {
                "id" : "murder",
                "label" : "murder",
                "value" : selectedCrimeData.murder,
                "color" : "hsl(327, 70%, 50%)"
            }, {
                "id" : "nonDomesticViolence",
                "label" : "nonDomesticViolence",
                "value" : selectedCrimeData.nonDomesticViolence,
                "color" : "hsl(128, 70%, 50%)"
            }, {
                "id" : "robbery",
                "label" : "robbery",
                "value" : selectedCrimeData.robbery,
                "color" : "hsl(145, 100%, 79%)"
            }, {
                "id" : "sexualAssault",
                "label" : "sexualAssault",
                "value" : selectedCrimeData.sexualAssault,
                "color" : "hsl(120, 100%, 79%)"
            }
        ]
    }

    renderLgasCrime(crimeChartData) {
        return <Bar
            height={500}
            width={750}
            data={crimeChartData}
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
            }, {
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
            }, {
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
            legends={[{
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
        ]}/>
    }

    renderSelectedLgaCrime(selectedLgaCrimeData) {
        return <Pie
            height={380}
            width={800}
            data={selectedLgaCrimeData}
            margin={{
            "top": 40,
            "right": 80,
            "bottom": 80,
            "left": 80
        }}
            innerRadius={0.5}
            padAngle={0.7}
            cornerRadius={3}
            colors="nivo"
            colorBy="id"
            borderWidth={1}
            borderColor="inherit:darker(0.2)"
            radialLabelsSkipAngle={10}
            radialLabelsTextXOffset={6}
            radialLabelsTextColor="#333333"
            radialLabelsLinkOffset={0}
            radialLabelsLinkDiagonalLength={16}
            radialLabelsLinkHorizontalLength={24}
            radialLabelsLinkStrokeWidth={1}
            radialLabelsLinkColor="inherit"
            slicesLabelsSkipAngle={10}
            slicesLabelsTextColor="#333333"
            animate={true}
            motionStiffness={90}
            motionDamping={15}
            defs={[
            {
                "id": "dots",
                "type": "patternDots",
                "background": "inherit",
                "color": "rgba(255, 255, 255, 0.3)",
                "size": 4,
                "padding": 1,
                "stagger": true
            }, {
                "id": "lines",
                "type": "patternLines",
                "background": "inherit",
                "color": "rgba(255, 255, 255, 0.3)",
                "rotation": -45,
                "lineWidth": 6,
                "spacing": 10
            }
        ]}
            fill={[
            {
                "match": {
                    "id": "ruby"
                },
                "id": "dots"
            }, {
                "match": {
                    "id": "c"
                },
                "id": "dots"
            }, {
                "match": {
                    "id": "go"
                },
                "id": "dots"
            }, {
                "match": {
                    "id": "python"
                },
                "id": "dots"
            }, {
                "match": {
                    "id": "scala"
                },
                "id": "lines"
            }, {
                "match": {
                    "id": "lisp"
                },
                "id": "lines"
            }, {
                "match": {
                    "id": "elixir"
                },
                "id": "lines"
            }, {
                "match": {
                    "id": "javascript"
                },
                "id": "lines"
            }
        ]}
            legends={[{
                "anchor": "bottom",
                "direction": "row",
                "translateY": 56,
                "itemWidth": 100,
                "itemHeight": 18,
                "itemTextColor": "#999",
                "symbolSize": 18,
                "symbolShape": "circle",
                "effects": [
                    {
                        "on": "hover",
                        "style": {
                            "itemTextColor": "#000"
                        }
                    }
                ]
            }
        ]}/>
    }

    render() {
        const crime = this.props.crime;
        const {selectedLgaId} = this.props
        const crimeChartData = this
            .getCrimeChartData(crime)
            .slice(1, 15)
        const selectedLgaCrimeData = this.getSelectedLgaCrimeChartData(selectedLgaId, crime)
        return (
            <div>
                <Segment>
                    <Header>Crime Data</Header>
                    {this.renderLgasCrime(crimeChartData)}
                    {this.renderSelectedLgaCrime(selectedLgaCrimeData)}
                </Segment>
            </div>
        );
    }
}

export default StatsPane;