var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function LineChart(props) {
  return React.createElement(
    Recharts.ResponsiveContainer,
    null,
    React.createElement(
      Recharts.LineChart,
      { data: props.data,
        margin: { top: 5, right: 30, left: 20, bottom: 5 } },
      React.createElement(Recharts.CartesianGrid, { stroke: "#101822", strokeDasharray: "3 3" }),
      React.createElement(Recharts.XAxis, { dataKey: "name" }),
      React.createElement(Recharts.YAxis, null),
      React.createElement(Recharts.Tooltip, null),
      React.createElement(Recharts.Legend, null),
      React.createElement(Recharts.Line, { type: "linear", dataKey: "uv", stroke: props.color })
    )
  );
}

function AreaChart(props) {
  return React.createElement(
    Recharts.ResponsiveContainer,
    null,
    React.createElement(
      Recharts.AreaChart,
      { data: props.data,
        margin: { top: 5, right: 30, left: 20, bottom: 5 } },
      React.createElement(Recharts.CartesianGrid, { stroke: "#101822", strokeDasharray: "3 3" }),
      React.createElement(Recharts.XAxis, { dataKey: "name" }),
      React.createElement(Recharts.YAxis, null),
      React.createElement(Recharts.Tooltip, null),
      React.createElement(Recharts.Area, { type: "linear", dataKey: "uv", stroke: props.color, fill: props.color, fillOpacity: 1 })
    )
  );
}

function BarChart(props) {
  return React.createElement(
    Recharts.ResponsiveContainer,
    null,
    React.createElement(
      Recharts.BarChart,
      {
        width: 500,
        height: 300,
        data: props.data,
        margin: {
          top: 20, right: 30, left: 20, bottom: 5
        }
      },
      React.createElement(Recharts.CartesianGrid, { stroke: "#101822", strokeDasharray: "3 3" }),
      React.createElement(Recharts.XAxis, { dataKey: "name" }),
      React.createElement(Recharts.YAxis, null),
      React.createElement(Recharts.Tooltip, null),
      React.createElement(Recharts.Legend, null),
      React.createElement(Recharts.Bar, { dataKey: "uv", stackId: "a", fill: props.color, fillOpacity: 1 })
    )
  );
}

function Chart(props) {
  if (props.chartType == "Area") return React.createElement(AreaChart, { color: props.color, data: props.data });else if (props.chartType == "Line") return React.createElement(LineChart, { color: props.color, data: props.data });else if (props.chartType == "Bar") return React.createElement(BarChart, { color: props.color, data: props.data });
}

var ChartContainer = function (_React$Component) {
  _inherits(ChartContainer, _React$Component);

  function ChartContainer(props) {
    _classCallCheck(this, ChartContainer);

    var _this = _possibleConstructorReturn(this, (ChartContainer.__proto__ || Object.getPrototypeOf(ChartContainer)).call(this, props));

    _this.loadData = function () {
      fetch("https://api.citylink.cl/metrics/" + _this.props.metricId).then(function (res) {
        return res.json();
      }).then(function (result) {
        var data = [];
        var name = result.metric.name.replace("_", " ");
        for (var metric in result.metric.data) {
          data.push({
            "name": result.metric.data[metric].creation_date,
            "uv": result.metric.data[metric].value
          });
        }
        _this.setState({
          data: data,
          name: name
        });

        setTimeout(_this.loadData, 1000);
      });
    };

    _this.state = {
      data: [],
      name: "---"
    };
    _this.loadData();
    return _this;
  }

  _createClass(ChartContainer, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        { className: "col-xs-12 col-md-6" },
        React.createElement(
          "div",
          { className: "card" },
          React.createElement(
            "div",
            { className: "card-body" },
            React.createElement(
              "div",
              { className: "pull-left" },
              React.createElement(
                "h4",
                { className: "card-title" },
                this.state.name[0].toUpperCase() + this.state.name.slice(1)
              )
            ),
            React.createElement(
              "div",
              { className: "pull-right", "data-toggle": "buttons" },
              React.createElement(
                "label",
                { className: "btn btn-outline-primary btn-xs btn-pill active" },
                React.createElement("input", { type: "radio", name: "options", id: "option1" }),
                " \xDAltimas 24hr"
              ),
              React.createElement(
                "label",
                { className: "btn btn-outline-primary btn-xs btn-pill" },
                React.createElement("input", { type: "radio", name: "options", id: "option2" }),
                " \xDAltimos 7 d\xEDas"
              ),
              React.createElement(
                "label",
                { className: "btn btn-outline-primary btn-xs btn-pill" },
                React.createElement("input", { type: "radio", name: "options", id: "option3" }),
                " \xDAltimos 30 d\xEDas"
              )
            )
          ),
          React.createElement(
            "div",
            { className: "card-body" },
            React.createElement(
              "div",
              { className: "card-chart", id: "page-container", style: { height: "200px" } },
              React.createElement(
                "div",
                { className: "row body" },
                React.createElement(Chart, { color: this.props.color, chartType: this.props.chartType, data: this.state.data })
              )
            )
          )
        )
      );
    }
  }]);

  return ChartContainer;
}(React.Component);

function IOControl(props) {
  return React.createElement(
    "div",
    { className: "col-xs-6 col-md-3" },
    React.createElement(
      "div",
      { className: "card" },
      React.createElement(
        "div",
        { className: "card-values" },
        React.createElement(
          "div",
          { className: "p-x" },
          React.createElement(
            "small",
            null,
            props.name[0].toUpperCase() + props.name.slice(1)
          )
        )
      ),
      React.createElement(
        "div",
        { className: "card-chart" },
        React.createElement(
          "button",
          { onClick: props.onChange, className: "btn btn-sm btn-block " + (props.value ? "btn-primary" : "btn-outline-danger") },
          props.value ? "Encendido" : "Apagado"
        )
      )
    )
  );
}

var IOControlContainer = function (_React$Component2) {
  _inherits(IOControlContainer, _React$Component2);

  function IOControlContainer(props) {
    _classCallCheck(this, IOControlContainer);

    var _this2 = _possibleConstructorReturn(this, (IOControlContainer.__proto__ || Object.getPrototypeOf(IOControlContainer)).call(this, props));

    _this2.loadCurrentState = function () {
      fetch("https://api.citylink.cl/controls/" + _this2.props.controlId).then(function (res) {
        return res.json();
      }).then(function (result) {
        _this2.setState({
          value: result.control.data[0].value,
          name: result.control.name
        });
      });
    };

    _this2.onChange = function () {
      // hit api
      console.log("value=" + (_this2.state.value ? "false" : "true"));
      fetch("https://api.citylink.cl/controls/" + _this2.props.controlId, {
        method: 'POST',
        body: "value=" + (_this2.state.value ? "false" : "true"),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(function (res) {
        return res.json();
      }).then(function (result) {
        console.log(result);
        // load current status
        _this2.loadCurrentState();
      });

      // change status
      _this2.setState({
        value: !_this2.state.value
      });
    };

    _this2.render = function () {
      return React.createElement(IOControl, Object.assign({}, _this2.state, { onChange: _this2.onChange }));
    };

    _this2.state = {
      name: "-",
      value: "-"
    };

    _this2.loadCurrentState();
    return _this2;
  }

  return IOControlContainer;
}(React.Component);

function Layout(props) {

  return React.createElement(
    "div",
    { className: "layout-content-body" },
    React.createElement(
      "div",
      { className: "row gutter-xs" },
      React.createElement(IOControlContainer, { controlId: "ad804cb8" }),
      React.createElement(IOControlContainer, { controlId: "b0a5f4e2" }),
      React.createElement(IOControlContainer, { controlId: "b5747c6e" }),
      React.createElement(IOControlContainer, { controlId: "b31bb41e" })
    ),
    React.createElement(
      "div",
      { className: "row gutter-xs" },
      React.createElement(ChartContainer, { color: "#7c55fb", chartType: "Area", metricId: "6cedc79c" }),
      React.createElement(ChartContainer, { color: "#63d9ad", chartType: "Area", metricId: "bf9c3de0" }),
      React.createElement(ChartContainer, { color: "#63d9ad", chartType: "Area", metricId: "7d384f6a" }),
      React.createElement(ChartContainer, { color: "#63d9ad", chartType: "Bar", metricId: "f0e2a10e" })
    )
  );
}

var root = document.getElementById("page-container");
ReactDOM.render(React.createElement(Layout, null), root);