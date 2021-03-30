import React, { useState, useEffect } from "react"

import "../styles/vendor.css";
import "../styles/elephant.css";
import "../styles/application.css";

import { IOControlContainer, APIChartContainer, CalculationsChartContainer, SmallCalculationsChartContainer } from "./components/page";
import WithLayout from "./components/layout";
import WithLoginController from "./components/login";
import { CSVLink } from "react-csv";


function DashboardProvi(props)
{
  return (
  <>
      <div className="row gutter-xs">
        <IOControlContainer controlId="ad804cb2" ></IOControlContainer>
      </div>
      <div className="row gutter-xs" >
        <APIChartContainer color="#7c55fb" chartType="Area" metricId="00a102e2" ></APIChartContainer>
        <APIChartContainer color="#63d9ad" chartType="Area" metricId="00d69ddc" ></APIChartContainer>
        <APIChartContainer color="#63d9ad" chartType="Area" metricId="01be1256" ></APIChartContainer>
        <APIChartContainer color="#63d9ad" chartType="Area" metricId="022be6f2" ></APIChartContainer>
        <APIChartContainer color="#63d9ad" chartType="Area" metricId="023a91c2" ></APIChartContainer>
      </div>
    </>
  );
}

function DashboardNico(props) {
  return (
    <>
      <div className="row gutter-xs">
        <IOControlContainer controlId="ad804cb8" ></IOControlContainer>
        <IOControlContainer controlId="b0a5f4e2" ></IOControlContainer>
        <IOControlContainer controlId="b5747c6e" ></IOControlContainer>
        <IOControlContainer controlId="b31bb41e" ></IOControlContainer>
      </div>
      <div className="row gutter-xs" >
        <APIChartContainer color="#7c55fb" chartType="Area" metricId="ee123498" ></APIChartContainer>
        <APIChartContainer color="#7c55fb" chartType="Area" metricId="6cedc79c" ></APIChartContainer>
        <APIChartContainer color="#63d9ad" chartType="Area" metricId="bf9c3de0" ></APIChartContainer>
        <APIChartContainer color="#63d9ad" chartType="Area" metricId="7d384f6a" ></APIChartContainer>
        <APIChartContainer color="#63d9ad" chartType="Bar" metricId="f0e2a10e" ></APIChartContainer>
      </div>
    </>
  );
}

class AgrozziCalculationContainer extends React.Component {

  render = () => {
    return (
      <>
          {
            this.props.metrics.length === 0 ?
            "cargando...."
            :
            <>
              <div className="row" >
                <div className="col-xs-6 col-md-4">
                  <div className="card">
                    <div className="card-values">
                      <div className="p-x">
                        <small>Día del año</small>
                        <h3 className="card-title fw-l">{this.props.metrics[0].day}</h3>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-xs-6 col-md-4">
                  <div className="card">
                    <div className="card-values">
                      <div className="p-x">
                        <small>Día del cultivo</small>
                        <h3 className="card-title fw-l">{this.props.metrics[0].current_day}</h3>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-xs-6 col-md-4">
                  <div className="card">
                    <div className="card-values">
                      <div className="p-x">
                        <small>ETC</small>
                        <h3 className="card-title fw-l">{(this.props.metrics[0].kc * this.props.metrics[0].eto).toFixed(2)}</h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <hr/>
              <div className="row" >
                <div className="col-xs-6 col-md-4">
                  <div className="card">
                    <div className="card-values">
                      <div className="p-x">
                        <small>ET0</small>
                        <h3 className="card-title fw-l">{this.props.metrics[0].eto.toFixed(1)}</h3>
                        <div style={{ height: "50px" }} >
                          <SmallCalculationsChartContainer
                            data={this.props.metrics}
                            showLine={false}
                            color="#63d9ad"
                            chartType="Area"
                            metricId="b5747c6e"
                            field="eto"
                            onlyGraph={true}
                          ></SmallCalculationsChartContainer>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-xs-6 col-md-4">
                  <div className="card">
                    <div className="card-values">
                      <div className="p-x">
                        <small>KC</small>
                        <h3 className="card-title fw-l">{this.props.metrics[0].kc.toFixed(2)}</h3>
                        <div style={{ height: "50px" }} >
                          <SmallCalculationsChartContainer
                            data={this.props.metrics}
                            showLine={false}
                            color="#63d9ad"
                            chartType="Area"
                            metricId="b5747c6e"
                            field="kc"
                            onlyGraph={true}
                          ></SmallCalculationsChartContainer>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-xs-6 col-md-4">
                  <div className="card">
                    <div className="card-values">
                      <div className="p-x">
                        <small>Humedad promedio</small>
                        <h3 className="card-title fw-l">{this.props.metrics[0].humidity_prom.toFixed(1)}</h3>
                        <div style={{ height: "50px" }} >
                          <SmallCalculationsChartContainer
                            data={this.props.metrics}
                            showLine={false}
                            color="#63d9ad"
                            chartType="Area"
                            metricId="b5747c6e"
                            field="humidity_prom"
                            onlyGraph={true}
                          ></SmallCalculationsChartContainer>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-xs-6 col-md-4">
                  <div className="card">
                    <div className="card-values">
                      <div className="p-x">
                        <small>Temperatura promedio</small>
                        <h3 className="card-title fw-l">{this.props.metrics[0].temp_average.toFixed(1)}</h3>
                        <div style={{ height: "50px" }} >
                          <SmallCalculationsChartContainer
                            data={this.props.metrics}
                            showLine={false}
                            color="#63d9ad"
                            chartType="Area"
                            metricId="b5747c6e"
                            field="temp_average"
                            onlyGraph={true}
                          ></SmallCalculationsChartContainer>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-xs-6 col-md-4">
                  <div className="card">
                    <div className="card-values">
                      <div className="p-x">
                        <small>Velocidad promedio del viento</small>
                        <h3 className="card-title fw-l">{this.props.metrics[0].wind_speed_average.toFixed(1)}</h3>
                        <div style={{ height: "50px" }} >
                          <SmallCalculationsChartContainer
                            data={this.props.metrics}
                            showLine={false}
                            color="#63d9ad"
                            chartType="Area"
                            metricId="b5747c6e"
                            field="wind_speed_average"
                            onlyGraph={true}
                          ></SmallCalculationsChartContainer>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          }
        </>
    );
  }
}

function DashboardAgrozzi(props) {

  const [metrics, setMetrics] = useState([]);
  useEffect(() => {
    const loadData = async () => {
      const response = await fetch("https://api.citylink.cl/calculo/262678678");
      const json_data = await response.json();
      setMetrics(json_data.metrics);
    }

    if (metrics.length === 0) {
      loadData();
    }

    let interval = setInterval(loadData, 10000);
    return () => { clearInterval(interval) }
  });

  return (
    <>
      <div className="row">
        <div className="col-xs-12">
          <div className="card" >
            <div className="card-body" >
              <CSVLink data={metrics} target="_blank" >descargar csv</CSVLink>
            </div>
          </div>
        </div>
      </div>
      <hr/>
      <div className="row gutter-xs">
        <AgrozziCalculationContainer metrics={metrics} ></AgrozziCalculationContainer>
        {/* <IOControlContainer controlId="ad804cb8" ></IOControlContainer>
        <IOControlContainer controlId="b0a5f4e2" ></IOControlContainer>
        <IOControlContainer controlId="b5747c6e" ></IOControlContainer>
        <IOControlContainer controlId="b31bb41e" ></IOControlContainer> */}
      </div>
      <hr/>
      <div className="row gutter-xs" >
        <APIChartContainer color="#7c55fb" chartType="Area" metricId="ad804cb8" ></APIChartContainer>
        <APIChartContainer color="#63d9ad" chartType="Area" metricId="b0a5f4e2" ></APIChartContainer>
        <CalculationsChartContainer color="#63d9ad" chartType="Area" metricId="b5747c6e" ></CalculationsChartContainer>
        <APIChartContainer color="#63d9ad" chartType="Bar" metricId="ad804cb2" ></APIChartContainer>
      </div>
    </>
  );
}


function getDashboardBySite(site_name)
{
  if (site_name === "provi") return DashboardProvi;
  if (site_name === "agrozzi") return DashboardAgrozzi;
  return DashboardNico;
}


class Dashboard extends React.Component {

  constructor(props)
  {
    super(props);
    this.state = {
      isLoading: true,
      email: ""
    }
  }

  componentDidMount = async () => {
    let response = await fetch(
      "https://accounts.loadingplay.com/users/me",
      {
        headers: {
          "Authorization": `Bearer ${this.props.access_token}`
        }
      });
    let json_data = await response.json();

    this.setState({
      isLoading: false,
      email: json_data.email,
      site_name: json_data.site_name
    });

    this.props.onChangeUser(json_data.email)
  }

  render = () => {
    const Dash = getDashboardBySite(this.state.site_name);
    return (
      <>
        {
          this.state.isLoading ?
          <div>Cargando...</div>:
          <Dash {...this.props} />
        }
      </>
    );
  }

}

export default WithLoginController(WithLayout(Dashboard));
