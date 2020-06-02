function Chart(props) {
  console.log(props);
  return (
    <Recharts.ResponsiveContainer>
      <Recharts.LineChart data={props.data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <Recharts.CartesianGrid strokeDasharray="3 3" />
        <Recharts.XAxis dataKey="name" />
        <Recharts.YAxis />
        <Recharts.Tooltip />
        <Recharts.Legend />
        <Recharts.Line type="monotone" dataKey="pv" stroke="#8884d8" />
        <Recharts.Line type="monotone" dataKey="uv" stroke="#82ca9d" />
      </Recharts.LineChart>
    </Recharts.ResponsiveContainer>
  );
}

class ChartContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      name: "---"
    }
    console.log("llelgaaa", props);
    this.loadData();
  }

  loadData = () => {
    fetch(`https://api.citylink.cl/metrics/${this.props.metricId}`)
    .then(res => res.json())
    .then((result) => {
      let data = [];
      let name = result.metric.name.replace("_", " ");
      for (let metric in result.metric.data)
      {
        console.log(result.metric.data[metric]);
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

  render () {
    return (
      <div class="col-xs-12 col-md-6">
        <div className="card">
          <div className="card-body">
            <div className="pull-left">
              <h4 className="card-title">{this.state.name}</h4>
            </div>
            <div className="pull-right" data-toggle="buttons">
              <label className="btn btn-outline-primary btn-xs btn-pill active">
                <input type="radio" name="options" id="option1" ></input> Past 24hr
              </label>
              <label className="btn btn-outline-primary btn-xs btn-pill">
                <input type="radio" name="options" id="option2" ></input> Past 7 days
              </label>
              <label className="btn btn-outline-primary btn-xs btn-pill">
                <input type="radio" name="options" id="option3" ></input> Past 30 days
              </label>
            </div>
          </div>
          <div className="card-body">
            <div className="card-chart" id="page-container" style={{height: "200px"}}>
              <div className="row body" >
                <Chart data={this.state.data} ></Chart>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function Layout(props) {

  return (
    <div>
      <ChartContainer metricId="6cedc79c" ></ChartContainer>
      <ChartContainer metricId="67424534" ></ChartContainer>
      <ChartContainer metricId="7d384f6a" ></ChartContainer>
      <ChartContainer metricId="bf9c3de0" ></ChartContainer>
      <ChartContainer metricId="f0e2a10e" ></ChartContainer>
    </div>
  );
}

let root = document.getElementById("page-container");
ReactDOM.render(<Layout></Layout>, root);
