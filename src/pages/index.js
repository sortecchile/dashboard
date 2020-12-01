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
  <div className="layout-content-body" >
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
    </div>
  );
}

function DashboardNico(props) {
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


function getDashboardBySite(site_name)
{
  if (site_name === "provi") return DashboardProvi;
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
