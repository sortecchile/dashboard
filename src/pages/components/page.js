import React, { Component } from "react";

import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar
} from "recharts";


export default function CLLineChart(props) {
  return (
    <ResponsiveContainer>
      <LineChart data={props.data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid stroke="#101822" strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="linear" dataKey="uv" stroke={props.color} />
      </LineChart>
    </ResponsiveContainer>
  );
}

function CLAreaChart(props) {
  console.log(props.data);

  return (
    <ResponsiveContainer>
      <AreaChart data={props.data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid stroke="#101822" strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Area type="monotone" dataKey="uv" stroke={props.color} fill={props.color} />
      </AreaChart>
    </ResponsiveContainer>
  );
}


function CLBarChart(props) {
  return (
    <ResponsiveContainer>
      <BarChart
        width={500}
        height={300}
        data={props.data}
        margin={{
          top: 20, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid stroke="#101822" strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="uv" stackId="a" fill={props.color} fillOpacity={1} />
      </BarChart>
    </ResponsiveContainer>
  );
}


function Chart(props) {
  if (props.chartType === "Area")
    return (<CLAreaChart color={props.color} data={props.data} ></CLAreaChart>);
  else if (props.chartType === "Line")
    return (<CLLineChart color={props.color} data={props.data} ></CLLineChart>);
  else if (props.chartType === "Bar")
    return (<CLBarChart color={props.color} data={props.data} ></CLBarChart>);
}

export class ChartContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      name: "---"
    }
    // this.loadData();
  }

  componentDidMount = () => {
    this.loadData();
  }

  loadData = () => {

    fetch(`https://api.citylink.cl/metrics/${this.props.metricId}`)
    .then((res) => {return res.json()})
    .then((result) => {
      let data = [];
      let name = result.metric.name.replace("_", " ");
      for (let metric in result.metric.data) {
        data.push({
          "name": result.metric.data[metric].creation_date,
          "uv": result.metric.data[metric].value
        });
      }

      this.setState({
        data,
        name
      });

      setTimeout(this.loadData, 2000);
    });

  }

  render() {
    return (
      <div className="col-xs-12 col-md-6">
        <div className="card">
          <div className="card-body">
            <div className="pull-left">
              <h4 className="card-title">{this.state.name[0].toUpperCase() + this.state.name.slice(1)}</h4>
            </div>
            <div className="pull-right" data-toggle="buttons">
              <label className="btn btn-outline-primary btn-xs btn-pill active">
                <input type="radio" name="options" id="option1" ></input> Últimas 24hr
              </label>
              {/* <label className="btn btn-outline-primary btn-xs btn-pill">
                <input type="radio" name="options" id="option2" ></input> Últimos 7 días
              </label>
              <label className="btn btn-outline-primary btn-xs btn-pill">
                <input type="radio" name="options" id="option3" ></input> Últimos 30 días
              </label> */}
            </div>
          </div>
          <div className="card-body">
            <div className="card-chart" id="page-container" style={{ height: "200px" }}>
              <div className="row body" style={{ width: "100%", height: "100%" }} >
                <Chart color={this.props.color} chartType={this.props.chartType} data={this.state.data} ></Chart>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


export class IOControl extends Component {

  render() {
    return (
      <div className="col-xs-6 col-md-3">
        <div className="card">
          <div className="card-values">
            <div className="p-x">
              <small>{this.props.name[0].toUpperCase() + this.props.name.slice(1)}</small>
            </div>
          </div>
          <div className="card-chart">
            <button disabled={this.props.disabled} onClick={this.props.onChange} className={"btn btn-sm btn-block " + (this.props.value ? "btn-primary":"btn-outline-danger")} >
              {this.props.value ? "Encendido":"Apagado"}
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export class IOControlContainer extends Component {
  constructor (props) {
    super(props);

    this.state = {
      name: "-",
      value: "-",
      disabled: true
    };

  }

  componentDidMount = () => {
    this.loadCurrentState();
  }

  loadCurrentState = () => {
    fetch("https://api.citylink.cl/controls/" + this.props.controlId)
    .then((res) => { return res.json() })
    .then((result) => {
      this.setState({
        value: result.control.data[0].value,
        disabled: false,
        name: result.control.name
      });
    });
  }

  onChange = () => {
    this.setState({
      disabled: true
    })
    // hit api
    console.log("value=" + (this.state.value ? "false": "true"));
    fetch(
      "https://api.citylink.cl/controls/" + this.props.controlId,
      {
        method: 'POST',
        body: "value=" + (this.state.value ? "false": "true"),
        headers:{
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }
    )
    .then((res) => res.json())
    .then((result) => {
      // load current status
      this.loadCurrentState();
    });

    // change status
    this.setState({
      value: !this.state.value
    });
  }

  render = () => {
    return (<IOControl {...this.state} onChange={this.onChange} ></IOControl>);
  }
}
// let root = document.getElementById("page-container");
// ReactDOM.render(<Layout></Layout>, root);
