import React from "react"

import "../styles/vendor.css";
import "../styles/elephant.css";
import "../styles/application.css";

import { IOControlContainer, ChartContainer } from "./components/page";
import WithLayout from "./components/layout";
import WithLoginController from "./components/login";


function DashboardProvi(props)
{
  return (
  <>
      <div className="row gutter-xs">
        <IOControlContainer controlId="ad804cb2" ></IOControlContainer>
      </div>
      <div className="row gutter-xs" >
        <ChartContainer color="#7c55fb" chartType="Area" metricId="00a102e2" ></ChartContainer>
        <ChartContainer color="#63d9ad" chartType="Area" metricId="00d69ddc" ></ChartContainer>
        <ChartContainer color="#63d9ad" chartType="Area" metricId="01be1256" ></ChartContainer>
        <ChartContainer color="#63d9ad" chartType="Area" metricId="022be6f2" ></ChartContainer>
        <ChartContainer color="#63d9ad" chartType="Area" metricId="023a91c2" ></ChartContainer>
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
        <ChartContainer color="#7c55fb" chartType="Area" metricId="6cedc79c" ></ChartContainer>
        <ChartContainer color="#63d9ad" chartType="Area" metricId="bf9c3de0" ></ChartContainer>
        <ChartContainer color="#63d9ad" chartType="Area" metricId="7d384f6a" ></ChartContainer>
        <ChartContainer color="#63d9ad" chartType="Bar" metricId="f0e2a10e" ></ChartContainer>
      </div>
    </>
  );
}

class CalculosAgrozziContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {}
    }
  }


  componentDidMount = async () => {
    const response = await fetch("https://api.citylink.cl/calculo/262678678");
    const json_data = await response.json();

    this.setState({
      data: json_data
    });
  }


  render = () => {
    return (
      <>
          {
            !this.state.data.metrics ?
            "cargando...."
            :
            <>
              <div class="col-xs-6 col-md-3">
                <div class="card">
                  <div class="card-values">
                    <div class="p-x">
                      <small>Día del año</small>
                      <h3 class="card-title fw-l">{this.state.data.metrics[0].day}</h3>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-xs-6 col-md-3">
                <div class="card">
                  <div class="card-values">
                    <div class="p-x">
                      <small>Día del cultivo</small>
                      <h3 class="card-title fw-l">{this.state.data.metrics[0].current_day}</h3>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-xs-6 col-md-3">
                <div class="card">
                  <div class="card-values">
                    <div class="p-x">
                      <small>ET0</small>
                      <h3 class="card-title fw-l">{this.state.data.metrics[0].eto.toFixed(1)}</h3>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-xs-6 col-md-3">
                <div class="card">
                  <div class="card-values">
                    <div class="p-x">
                      <small>KC</small>
                      <h3 class="card-title fw-l">{this.state.data.metrics[0].kc.toFixed(2)}</h3>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-xs-6 col-md-3">
                <div class="card">
                  <div class="card-values">
                    <div class="p-x">
                      <small>ETC</small>
                      <h3 class="card-title fw-l">{(this.state.data.metrics[0].kc * this.state.data.metrics[0].eto).toFixed(2)}</h3>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-xs-6 col-md-3">
                <div class="card">
                  <div class="card-values">
                    <div class="p-x">
                      <small>Humedad promedio</small>
                      <h3 class="card-title fw-l">{this.state.data.metrics[0].humidity_prom.toFixed(1)}</h3>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-xs-6 col-md-3">
                <div class="card">
                  <div class="card-values">
                    <div class="p-x">
                      <small>Temperatura promedio</small>
                      <h3 class="card-title fw-l">{this.state.data.metrics[0].temp_average.toFixed(1)}</h3>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-xs-6 col-md-3">
                <div class="card">
                  <div class="card-values">
                    <div class="p-x">
                      <small>Velocidad promedio del viento</small>
                      <h3 class="card-title fw-l">{this.state.data.metrics[0].wind_speed_average.toFixed(1)}</h3>
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
  return (
    <>
      <div className="row gutter-xs">
        <CalculosAgrozziContainer></CalculosAgrozziContainer>
        {/* <IOControlContainer controlId="ad804cb8" ></IOControlContainer>
        <IOControlContainer controlId="b0a5f4e2" ></IOControlContainer>
        <IOControlContainer controlId="b5747c6e" ></IOControlContainer>
        <IOControlContainer controlId="b31bb41e" ></IOControlContainer> */}
      </div>
      <div className="row gutter-xs" >
        <ChartContainer color="#7c55fb" chartType="Area" metricId="ad804cb8" ></ChartContainer>
        <ChartContainer color="#63d9ad" chartType="Area" metricId="b0a5f4e2" ></ChartContainer>
        <ChartContainer color="#63d9ad" chartType="Area" metricId="b5747c6e" ></ChartContainer>
        <ChartContainer color="#63d9ad" chartType="Bar" metricId="ad804cb2" ></ChartContainer>
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
