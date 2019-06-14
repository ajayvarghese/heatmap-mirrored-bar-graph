import React from "react";
import ReactDOM from "react-dom";
import HeatMap from "./HeatMap";
import MirroredBarGraph from "./MirroredBarGraph";
import "./styles.css";

const data = {
  "Case 1": {
    Var2: 0.03,
    Var5: 0.6658943892,
    Var1: -1.02,
    Var4: 0.47962921299999994,
    Var3: 0.091
  },
  "Case 4": {
    Var2: 0.5,
    Var5: 0.0328569751,
    Var1: -1.34,
    Var4: 0.3394967599,
    Var3: 0.87
  },
  "Case 2": {
    Var2: 0.024,
    Var5: 0.8102111617000001,
    Var1: 0.002,
    Var4: 0.7002518876999999,
    Var3: 1.43
  },
  "Case 3": {
    Var2: -0.001,
    Var5: 0.5597155665,
    Var1: -0.78,
    Var4: 0.2891421407,
    Var3: 0.002
  },
  "Case 5": {
    Var2: 0.983,
    Var5: 0.49687034259999996,
    Var1: 0.0056,
    Var4: 0.38438010229999997,
    Var3: 1.45
  }
};

function App() {
  return (
    <div className="App">
      <HeatMap data={data} />
      {Object.keys(data).map(key => (
        <MirroredBarGraph data={data[key]} label={key} />
      ))}
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
