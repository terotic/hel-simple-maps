import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
} from 'react-simple-maps';

import ReactTooltip from "react-tooltip"

import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      zoom: 450,
    }
  }

  componentDidMount() {
    setTimeout(() => {
      ReactTooltip.rebuild()
    }, 100)
  }

  handleClick(geography, evt) {
    console.log("Geography data: ", geography.properties.nimi_fi, " / ", geography.properties.tunnus)
  }

  render() {
    return (
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">Helsinki Simple Map</h1>
          </header>
          <ComposableMap className="selection-map" projection="mercator">
            <ZoomableGroup zoom={ this.state.zoom } center={ [25.04,60.21] } disablePanning={ true }>
            <Geographies geography={ "data/helsinki-hoods-topo.json" }>
              {(geographies, projection) => geographies.map((geography, i) => (
                <Geography
                  key={ i }
                  data-tip={geography.properties.nimi}
                  geography={ geography }
                  projection={ projection }
                  onClick={this.handleClick}
                  onMouseMove={this.handleMove}
                  onMouseLeave={this.handleLeave}
                  style={{
                      default: {
                        fill: "#009246",
                        stroke: "#ffffff",
                        strokeWidth: 0.0015,
                        outline: "none",
                      },
                      hover: {
                        fill: "#00d7a7",
                        stroke: "#ffffff",
                        strokeWidth: 0.0015,
                        outline: "none",
                      },
                      pressed: {
                        fill: "#0000bf",
                        stroke: "#ffffff",
                        strokeWidth: 0.0015,
                        outline: "none",
                      },
                    }}
                  />
              ))}
            </Geographies>
            <Geographies geography={ "data/helsinki-sea-topo.json" }>
              {(geographies, projection) => geographies.map((geography, i) => (
                <Geography
                  tabable={false}
                  geography={ geography }
                  projection={ projection }
                  style={{
                      default: {
                        fill: "#9fc9eb",
                        strokeWidth: 0,
                        outline: "none",
                      },
                      hover: {
                        fill: "#9fc9eb",
                        strokeWidth: 0,
                        outline: "none",
                      },
                      pressed: {
                        fill: "#9fc9eb",
                        strokeWidth: 0,
                        outline: "none",
                      },
                    }}
                  />
              ))}
            </Geographies>
            </ZoomableGroup>
          </ComposableMap>
          <ReactTooltip />
        </div>
    );
  }
}

export default App;
