import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
} from 'react-simple-maps';

import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super()
    this.state = {
      zoom: 350,
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Helsinki Simple Maps</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload. Or nevermind.
        </p>
        <ComposableMap>
          <ZoomableGroup zoom={ this.state.zoom } center={ [25.1,60.1] }>
          <Geographies geography={ "/data/helsinki_kaupunginosat-wgs84.json" }>
            {(geographies, projection) => geographies.map(geography => (
              <Geography
                key={ geography.id }
                geography={ geography }
                projection={ projection }
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
      </div>
    );
  }
}

export default App;
