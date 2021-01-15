import React from 'react';


export default function WithLayout(Component) {
  return class extends React.Component {

    constructor(props){
      super(props);
      this.state = {
        user: "Cargando...",
        show_menu: false
      }
    }

    onChangeUser = (user) => {
      this.setState({
        user: user
      });
    }

    onLogout = (user) => {
      typeof window !== 'undefined' && window.localStorage.removeItem("access_token");
      document.location.href = "https://accounts.loadingplay.com/auth/logout?next=" + encodeURI(document.location.href)
    }

    render = () => {
      return(
        <div className="layout layout-header-fixed">
          <div className="layout-header">
            <div className="navbar navbar-default">
              <div className="navbar-header">
                {/* <a className="navbar-brand navbar-brand-center" ui-sref="dashboards.dashboard-1" >
                  <img className="navbar-brand-logo" src="https://www.citylink.cl/img/logo-white4.png" alt="Elephant"></img>
                </a> */}
                <button className="navbar-toggler visible-xs-block collapsed" type="button">
                  <span className="sr-only">Toggle navigation</span>
                  <span className="bars">
                    <span className="bar-line bar-line-1 out"></span>
                    <span className="bar-line bar-line-2 out"></span>
                    <span className="bar-line bar-line-3 out"></span>
                  </span>
                  <span className="bars bars-x">
                    <span className="bar-line bar-line-4"></span>
                    <span className="bar-line bar-line-5"></span>
                  </span>
                </button>
                <button onClick={() => { this.setState({ show_menu: !this.state.show_menu }) }} className="navbar-toggler visible-xs-block collapsed" type="button" data-toggle="collapse" data-target="#navbar">
                  <span className="ellipsis ellipsis-vertical">
                    <img className="ellipsis-object" width="32" height="32" src="img/0180441436.jpg" alt="Teddy Wilson"></img>
                  </span>
                </button>
              </div>
              {
                this.state.show_menu ?
                <div>
                  <ul className="nav navbar-nav navbar-right" style={{backgroundColor: "#7c55fb"}} >
                    <li className="visible-xs-block">
                      <a onClick={this.onLogout} >{this.state.user} | Salir</a>
                    </li>
                  </ul>
                </div>
                : null
              }
              <div className="navbar-toggleable">
                <nav id="navbar" className="navbar-collapse collapse">
                  <button className="sidenav-toggler hidden-xs" type="button">
                    <span className="sr-only">Toggle navigation</span>
                    <span className="bars">
                      <span className="bar-line bar-line-1 out"></span>
                      <span className="bar-line bar-line-2 out"></span>
                      <span className="bar-line bar-line-3 out"></span>
                      <span className="bar-line bar-line-4 in"></span>
                      <span className="bar-line bar-line-5 in"></span>
                      <span className="bar-line bar-line-6 in"></span>
                    </span>
                  </button>
                  <ul className="nav navbar-nav navbar-right">
                    <li className="visible-xs-block">
                      <h4 className="navbar-text text-center">Hi, Teddy Wilson</h4>
                    </li>
                    <li className="dropdown">
                      {/* <a className="dropdown-toggle" role="button" data-toggle="dropdown" aria-haspopup="true">
                        <span className="icon-with-child hidden-xs">
                          <span className="icon icon-envelope-o icon-lg"></span>
                          <span className="badge badge-danger badge-above right">8</span>
                        </span>
                        <span className="visible-xs-block">
                          <span className="icon icon-envelope icon-lg icon-fw"></span>
                          <span className="badge badge-danger pull-right">8</span>
                          Messages
                        </span>
                      </a> */}
                      <div className="dropdown-menu dropdown-menu-right dropdown-menu-lg">
                        <div className="dropdown-header">
                          {/* <a className="dropdown-link" >New Message</a> */}
                          <h5 className="dropdown-heading">Recent messages</h5>
                        </div>
                        <div className="dropdown-body">
                          <div className="custom-scrollable-area">
                          </div>
                        </div>
                        <div className="dropdown-footer">
                          {/* <a className="dropdown-btn" >See All</a> */}
                        </div>
                      </div>
                    </li>
                    <li className="dropdown">
                      {/* <a className="dropdown-toggle" role="button" data-toggle="dropdown" aria-haspopup="true">
                        <span className="icon-with-child hidden-xs">
                          <span className="icon icon-bell-o icon-lg"></span>
                          <span className="badge badge-danger badge-above right">7</span>
                        </span>
                        <span className="visible-xs-block">
                          <span className="icon icon-bell icon-lg icon-fw"></span>
                          <span className="badge badge-danger pull-right">7</span>
                          Notifications
                        </span>
                      </a> */}
                      <div className="dropdown-menu dropdown-menu-right dropdown-menu-lg">
                        <div className="dropdown-header">
                          {/* <a className="dropdown-link" >Mark all as read</a> */}
                          <h5 className="dropdown-heading">Recent Notifications</h5>
                        </div>
                        <div className="dropdown-body">
                          <div className="custom-scrollable-area">
                            <div className="list-group list-group-divided">
                              {/* <a className="list-group-item" >
                                <div className="notification">
                                  <div className="notification-media">
                                    <span className="icon icon-exclamation-triangle bg-warning circle sq-40"></span>
                                  </div>
                                  <div className="notification-content">
                                    <small className="notification-timestamp">35 min</small>
                                    <h5 className="notification-heading">Update Status</h5>
                                    <p className="notification-text"><small className="truncate">Failed
                                    to get available update data. To ensure the proper
                                        functioning of your application, update now.</small>
                                    </p>
                                  </div>
                                </div>
                              </a>
                              <a className="list-group-item" >
                                <div className="notification">
                                  <div className="notification-media">
                                    <span className="icon icon-flag bg-success circle sq-40"></span>
                                  </div>
                                  <div className="notification-content">
                                    <small className="notification-timestamp">43 min</small>
                                    <h5 className="notification-heading">Account Contact Change</h5>
                                    <p className="notification-text"><small className="truncate">A
                                    contact detail associated with your account
                                        teddy.wilson, has recently changed.</small></p>
                                  </div>
                                </div>
                              </a>
                              <a className="list-group-item" >
                                <div className="notification">
                                  <div className="notification-media">
                                    <span className="icon icon-exclamation-triangle bg-warning circle sq-40"></span>
                                  </div>
                                  <div className="notification-content">
                                    <small className="notification-timestamp">1 hr</small>
                                    <h5 className="notification-heading">Failed Login Warning</h5>
                                    <p className="notification-text"><small className="truncate">There
                                    was a failed login attempt from "192.98.19.164" into
                                        the account teddy.wilson.</small></p>
                                  </div>
                                </div>
                              </a>
                              <a className="list-group-item" >
                                <div className="notification">
                                  <div className="notification-media">
                                    <img className="circle" width="40" height="40" src="img/0310728269.jpg" alt="Daniel Taylor"></img>
                                  </div>
                                  <div className="notification-content">
                                    <small className="notification-timestamp">4 hr</small>
                                    <h5 className="notification-heading">Daniel Taylor</h5>
                                    <p className="notification-text"><small className="truncate">Like
                                    your post: "Everything you know about Bootstrap is
                                        wrong".</small></p>
                                  </div>
                                </div>
                              </a>
                              <a className="list-group-item" >
                                <div className="notification">
                                  <div className="notification-media">
                                    <img className="circle" width="40" height="40" src="img/0872116906.jpg" alt="Emma Lewis"></img>
                                  </div>
                                  <div className="notification-content">
                                    <small className="notification-timestamp">8 hr</small>
                                    <h5 className="notification-heading">Emma Lewis</h5>
                                    <p className="notification-text"><small className="truncate">Like
                                    your post: "Everything you know about Bootstrap is
                                        wrong".</small></p>
                                  </div>
                                </div>
                              </a>
                              <a className="list-group-item" >
                                <div className="notification">
                                  <div className="notification-media">
                                    <img className="circle" width="40" height="40" src="img/0601274412.jpg" alt="Sophia Evans"></img>
                                  </div>
                                  <div className="notification-content">
                                    <small className="notification-timestamp">8 hr</small>
                                    <h5 className="notification-heading">Sophia Evans</h5>
                                    <p className="notification-text"><small className="truncate">Like
                                    your post: "Everything you know about Bootstrap is
                                        wrong".</small></p>
                                  </div>
                                </div>
                              </a>
                              <a className="list-group-item" >
                                <div className="notification">
                                  <div className="notification-media">

                                  </div>
                                  <div className="notification-content">
                                    <small className="notification-timestamp">9 hr</small>
                                    <h5 className="notification-heading">Ricardo Silva</h5>
                                    <p className="notification-text"><small className="truncate">Published a new post: "Everything
                                        you know about Bootstrap is wrong".</small></p>
                                  </div>
                                </div>
                              </a> */}
                            </div>
                            <div className="custom-scrollbar-gripper">
                            </div>
                            <div className="custom-scrollbar-track">
                            </div>
                          </div>
                        </div>
                        <div className="dropdown-footer">
                          {/* <a className="dropdown-btn" >See All</a> */}
                        </div>
                      </div>
                    </li>
                    <li className="dropdown hidden-xs">
                      <div className="navbar-account-btn" data-toggle="dropdown" aria-haspopup="true" >
                        {/* <img className="circle" width="36" height="36" src="https://avatars0.githubusercontent.com/u/7415055?s=400&u=487dcd056cb1abf42a476fd3cf504d1aeb2d1ca5&v=4" alt="Teddy Wilson"></img> */}
                        {this.state.user} | <button onClick={this.onLogout} >Salir</button>
                        <span className="caret"></span>
                      </div>
                      <ul className="dropdown-menu dropdown-menu-right">
                        <li>
                          {/* <a ui-sref="signup-1.step-two">
                            <h5 className="navbar-upgrade-heading">
                              Upgrade Now
                              <small className="navbar-upgrade-notification">You have 15 days left in your
                                trial.</small>
                            </h5>
                          </a> */}
                        </li>
                        <li className="divider"></li>
                        <li className="navbar-upgrade-version">Version: 1.0.0</li>
                        <li className="divider"></li>
                        {/* <li><a ui-sref="root.contacts" >Contacts</a></li>
                        <li><a ui-sref="root.profile" >Profile</a></li>
                        <li><a ui-sref="login-1" >Sign out</a></li> */}
                      </ul>
                    </li>
                    <li className="visible-xs-block">
                      {/* <a ui-sref="root.contacts" >
                        <span className="icon icon-users icon-lg icon-fw"></span>
                        Contacts
                      </a> */}
                    </li>
                    <li className="visible-xs-block">
                      {/* <a ui-sref="root.profile" >
                        <span className="icon icon-user icon-lg icon-fw"></span>
                        Profile
                      </a> */}
                    </li>
                    <li className="visible-xs-block">
                      {/* <a ui-sref="login-1" >
                        <span className="icon icon-power-off icon-lg icon-fw"></span>
                        Sign out
                      </a> */}
                    </li>
                  </ul>
                  <div className="title-bar">
                    <h1 className="title-bar-title">
                      <span className="d-ib">Dashboard</span>
                    </h1>
                    <p className="title-bar-description">
                      <small>Bienvenido a tu panel.</small>
                    </p>
                  </div>
                </nav>
              </div>
            </div>
          </div>

          <div className="layout-sidebar">
            <div className="layout-sidebar-backdrop"></div>
            <div className="layout-sidebar-body">
              <div className="custom-scrollable-area">
                <div className="custom-scrollbar" custom-scrollbar="" color="#fff" opacity="0.15">
                  <nav className="sidenav-collapse collapse" uib-collapse="app.sidebar.xs.isCollapsed"
                    aria-hidden="true">
                    <ul className="sidenav level-1" side-navigation="">
                      <li className="sidenav-item active" ui-sref-active="open active">
                        {/* <a ui-sref="root.page-layouts" >
                          <span className="sidenav-icon icon icon-works">G</span>
                          <span className="sidenav-label">Dashboard</span>
                        </a> */}
                      </li>
                    </ul>
                  </nav>
                </div>
                <div className="custom-scrollbar-gripper">
                </div>
                <div className="custom-scrollbar-track">
                </div>
              </div>
            </div>
          </div>

          <div className="layout-content" ui-view="" id="page-container" style={{ marginTop: "60px" }} >
            <div className="layout-content-body" >
              <Component onChangeUser={this.onChangeUser} {...this.props} ></Component>
            </div>
          </div>

          <div className="layout-footer">
            <div className="layout-footer-body">
              <small className="version">Version 1.4.0</small>
              {/* <small className="copyright">2018 © Elephant <a>Made by Tilde</a></small> */}
            </div>
          </div>
        </div>)
    }
  }
}
