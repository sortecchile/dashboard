const d = [
  {
    "name": "A",
    "uv": 4000
  },
  {
    "name": "B",
    "uv": 3000
  },
  {
    "name": "C",
    "uv": 2000
  },
  {
    "name": "D",
    "uv": 2780
  },
  {
    "name": "E",
    "uv": 1890
  },
  {
    "name": "F",
    "uv": 2390
  },
  {
    "name": "G",
    "uv": 3490
  }
]


function Chart(props) {
  return (
    <Recharts.LineChart width={730} height={250} data={props.data}
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
      <Recharts.CartesianGrid strokeDasharray="3 3" />
      <Recharts.XAxis dataKey="name" />
      <Recharts.YAxis />
      <Recharts.Tooltip />
      <Recharts.Legend />
      <Recharts.Line type="monotone" dataKey="pv" stroke="#8884d8" />
      <Recharts.Line type="monotone" dataKey="uv" stroke="#82ca9d" />
    </Recharts.LineChart>
  );
}

function Layout(props) {

  return (
    <div>
      <div className="row header" >
        <h2>Graficos.</h2>
      </div>
      <div className="row body" >
        <Chart data={props.data} ></Chart>
      </div>
    </div>
  );
}

class LayoutContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: []
    }
    this.loadData();
  }

  loadData = (metric_id) => {
    fetch(`https://api-2753bae4zq-uc.a.run.app/metrics/6cedc79c`)
    .then(res => res.json())
    .then((result) => {
      let data = [];
      for (let metric in result.metric.data)
      {
        console.log(result.metric.data[metric]);
        data.push({
          "name": result.metric.data[metric].creation_date,
          "uv": result.metric.data[metric].value
        });
      }
      this.setState({
        data
      });

      setTimeout(this.loadData, 1000);
    });
  }

  render () {
    return (<Layout data={this.state.data} ></Layout>);
  }
}

let root = document.getElementById("page-container");
ReactDOM.render(<LayoutContainer></LayoutContainer>, root);
