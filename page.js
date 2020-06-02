var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function Chart(props) {
  console.log(props);
  return React.createElement(
    Recharts.ResponsiveContainer,
    null,
    React.createElement(
      Recharts.LineChart,
      { data: props.data,
        margin: { top: 5, right: 30, left: 20, bottom: 5 } },
      React.createElement(Recharts.CartesianGrid, { strokeDasharray: "3 3" }),
      React.createElement(Recharts.XAxis, { dataKey: "name" }),
      React.createElement(Recharts.YAxis, null),
      React.createElement(Recharts.Tooltip, null),
      React.createElement(Recharts.Legend, null),
      React.createElement(Recharts.Line, { type: "monotone", dataKey: "pv", stroke: "#8884d8" }),
      React.createElement(Recharts.Line, { type: "monotone", dataKey: "uv", stroke: "#82ca9d" })
    )
  );
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
          console.log(result.metric.data[metric]);
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
    console.log("llelgaaa", props);
    _this.loadData();
    return _this;
  }

  _createClass(ChartContainer, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        { "class": "col-xs-12 col-md-6" },
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
                this.state.name
              )
            ),
            React.createElement(
              "div",
              { className: "pull-right", "data-toggle": "buttons" },
              React.createElement(
                "label",
                { className: "btn btn-outline-primary btn-xs btn-pill active" },
                React.createElement("input", { type: "radio", name: "options", id: "option1" }),
                " Past 24hr"
              ),
              React.createElement(
                "label",
                { className: "btn btn-outline-primary btn-xs btn-pill" },
                React.createElement("input", { type: "radio", name: "options", id: "option2" }),
                " Past 7 days"
              ),
              React.createElement(
                "label",
                { className: "btn btn-outline-primary btn-xs btn-pill" },
                React.createElement("input", { type: "radio", name: "options", id: "option3" }),
                " Past 30 days"
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
                React.createElement(Chart, { data: this.state.data })
              )
            )
          )
        )
      );
    }
  }]);

  return ChartContainer;
}(React.Component);

function Layout(props) {

  return React.createElement(
    "div",
    null,
    React.createElement(ChartContainer, { metricId: "6cedc79c" }),
    React.createElement(ChartContainer, { metricId: "67424534" }),
    React.createElement(ChartContainer, { metricId: "7d384f6a" }),
    React.createElement(ChartContainer, { metricId: "bf9c3de0" }),
    React.createElement(ChartContainer, { metricId: "f0e2a10e" })
  );
}

var root = document.getElementById("page-container");
ReactDOM.render(React.createElement(Layout, null), root);