import React from 'react';


const HOME_URL =  typeof window !== 'undefined' && document.location.protocol + "//" +  document.location.host;

function Login(props) {
  return (<div><button onClick={props.onLogin} >Entrar</button></div>);
}

export default function WithLoginController(Component) {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        access_token: typeof window !== 'undefined' && window.localStorage.getItem("access_token")
      };
    }

    getAccessToken = async (code) => {
      const data = {
        "code": code,
        "grant_type": "authorization_code",
        "client_id": "447",
        "client_secret": "3d9f6bfc222ba77ba75c4a146a2101f7",
        "redirect_uri": encodeURI(HOME_URL + "/?access_token")
      }
      let form_data = [];
      Object.keys(data).forEach(
        key => {
          form_data.push(`${key}=${data[key]}`);
        }
      )
      const response = await fetch(
        "https://accounts.loadingplay.com/oauth2/token",
        {
          method: 'POST',
          body: form_data.join("&"),
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        }
      )
      const result = await response.json();
      // load current status
      typeof window !== 'undefined' && window.localStorage.setItem("access_token", result.access_token);
      typeof window !== 'undefined' && window.history.pushState("", "dashboard", "/");
      return result.access_token;
    }

    componentDidMount = async (props) => {
      // extract code
      if (!~"code".indexOf(document.location.search)) {
        let code = document.location.search.split("&")[0].split("=")[1];
        let token = await this.getAccessToken(code);
        this.setState({
          access_token: token
        })
      }
    }

    onLogin = () => {
      document.location.href = "https://accounts.loadingplay.com/oauth2/auth?"
        + "redirect_uri=" + encodeURI(HOME_URL + "/?code&")
        + "site_name=dashboard&"
        + "client_id=447&"
        + "response_type=code";
    }

    render = () => {
      return (
        <>
          {
            this.state.access_token ?
              <Component access_token={this.state.access_token} />
              :
              <Login onLogin={this.onLogin} ></Login>
          }
        </>
      );
    }
  }
}
