
function LineChart(props) {
  return (
    <Recharts.ResponsiveContainer>
      <Recharts.LineChart data={props.data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <Recharts.CartesianGrid stroke="#101822" strokeDasharray="3 3" />
        <Recharts.XAxis dataKey="name" />
        <Recharts.YAxis />
        <Recharts.Tooltip />
        <Recharts.Legend />
        <Recharts.Line type="linear" dataKey="uv" stroke={props.color} />
      </Recharts.LineChart>
    </Recharts.ResponsiveContainer>
  );
}

function AreaChart(props) {
  return (
    <Recharts.ResponsiveContainer>
      <Recharts.AreaChart data={props.data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <Recharts.CartesianGrid stroke="#101822" strokeDasharray="3 3" />
        <Recharts.XAxis dataKey="name" />
        <Recharts.YAxis />
        <Recharts.Tooltip />
        <Recharts.Area type="linear" dataKey="uv" stroke={props.color} fill={props.color} fillOpacity={1} />
      </Recharts.AreaChart>
    </Recharts.ResponsiveContainer>
  );
}


function BarChart(props) {
  return (
    <Recharts.ResponsiveContainer>
      <Recharts.BarChart
        width={500}
        height={300}
        data={props.data}
        margin={{
          top: 20, right: 30, left: 20, bottom: 5,
        }}
      >
        <Recharts.CartesianGrid stroke="#101822" strokeDasharray="3 3" />
        <Recharts.XAxis dataKey="name" />
        <Recharts.YAxis />
        <Recharts.Tooltip />
        <Recharts.Legend />
        <Recharts.Bar dataKey="uv" stackId="a" fill={props.color} fillOpacity={1} />
      </Recharts.BarChart>
    </Recharts.ResponsiveContainer>
  );
}


function Chart(props) {
  if (props.chartType == "Area")
    return (<AreaChart color={props.color} data={props.data} ></AreaChart>);
  else if (props.chartType == "Line")
    return (<LineChart color={props.color} data={props.data} ></LineChart>);
  else if (props.chartType == "Bar")
    return (<BarChart color={props.color} data={props.data} ></BarChart>);
}

class ChartContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      name: "---"
    }
    this.loadData();
  }

  loadData = () => {
    fetch(`https://api.citylink.cl/metrics/${this.props.metricId}`)
      .then(res => res.json())
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

        setTimeout(this.loadData, 1000);
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
              <label className="btn btn-outline-primary btn-xs btn-pill">
                <input type="radio" name="options" id="option2" ></input> Últimos 7 días
              </label>
              <label className="btn btn-outline-primary btn-xs btn-pill">
                <input type="radio" name="options" id="option3" ></input> Últimos 30 días
              </label>
            </div>
          </div>
          <div className="card-body">
            <div className="card-chart" id="page-container" style={{ height: "200px" }}>
              <div className="row body" >
                <Chart color={this.props.color} chartType={this.props.chartType} data={this.state.data} ></Chart>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


function IOControl(props) {
  return (
    <div className="col-xs-6 col-md-3">
      <div className="card">
        <div className="card-values">
          <div className="p-x">
            <small>{props.name[0].toUpperCase() + props.name.slice(1)}</small>
          </div>
        </div>
        <div className="card-chart">
          <button disabled={props.disabled} onClick={props.onChange} className={"btn btn-sm btn-block " + (props.value ? "btn-primary":"btn-outline-danger")} >
            {props.value ? "Encendido":"Apagado"}
          </button>
        </div>
      </div>
    </div>
  );
}

class IOControlContainer extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      name: "-",
      value: "-",
      disabled: true
    };

    this.loadCurrentState();
  }

  loadCurrentState = () => {
    fetch("https://api.citylink.cl/controls/" + this.props.controlId)
    .then((res) => res.json())
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
      console.log(result);
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

function Layout(props) {

  return (
    <div className="layout-content-body" >
      <div className="row gutter-xs">
        <IOControlContainer controlId="ad804cb8" ></IOControlContainer>
        <IOControlContainer controlId="b0a5f4e2" ></IOControlContainer>
        <IOControlContainer controlId="b5747c6e" ></IOControlContainer>
        <IOControlContainer controlId="b31bb41e" ></IOControlContainer>
      </div>
      <div className="row gutter-xs" >
        <ChartContainer color="#7c55fb" chartType="Area" metricId="6cedc79c" ></ChartContainer>
        <ChartContainer color="#63d9ad" chartType="Area" metricId="bf9c3de0" ></ChartContainer>
        <ChartContainer color="#63d9ad" chartType="Area" metricId="7d384f6a" ></ChartContainer>
        <ChartContainer color="#63d9ad" chartType="Bar" metricId="f0e2a10e" ></ChartContainer>
      </div>
    </div>
  );
}

let root = document.getElementById("page-container");
ReactDOM.render(<Layout></Layout>, root);
