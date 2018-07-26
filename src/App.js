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
      zoom: 350,
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
            <h1 className="App-title">Helsinki Simple Maps</h1>
          </header>
          <ComposableMap className="selection-map" projection="mercator">
            <ZoomableGroup zoom={ this.state.zoom } center={ [25.04,60.2] } disablePanning={ true }>
            <Geographies geography={ "data/helsinki_kaupunginosat-wgs84.json" }>
              {(geographies, projection) => geographies.map((geography, i) => (
                <Geography
                  key={ i }
                  data-tip={geography.properties.nimi_fi}
                  geography={ geography }
                  projection={ projection }
                  onClick={this.handleClick}
                  onMouseMove={this.handleMove}
                  onMouseLeave={this.handleLeave}
                  style={{
                      default: {
                        fill: "#ECEFF1",
                        stroke: "#607D8B",
                        strokeWidth: 0.001,
                        outline: "none",
                      },
                      hover: {
                        fill: "#607D8B",
                        stroke: "#607D8B",
                        strokeWidth: 0.001,
                        outline: "none",
                      },
                      pressed: {
                        fill: "#FF5722",
                        stroke: "#607D8B",
                        strokeWidth: 0.001,
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
