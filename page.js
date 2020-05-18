var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var d = [{
  "name": "A",
  "uv": 4000
}, {
  "name": "B",
  "uv": 3000
}, {
  "name": "C",
  "uv": 2000
}, {
  "name": "D",
  "uv": 2780
}, {
  "name": "E",
  "uv": 1890
}, {
  "name": "F",
  "uv": 2390
}, {
  "name": "G",
  "uv": 3490
}];

function Chart(props) {
  return React.createElement(
    Recharts.LineChart,
    { width: 730, height: 250, data: props.data,
      margin: { top: 5, right: 30, left: 20, bottom: 5 } },
    React.createElement(Recharts.CartesianGrid, { strokeDasharray: "3 3" }),
    React.createElement(Recharts.XAxis, { dataKey: "name" }),
    React.createElement(Recharts.YAxis, null),
    React.createElement(Recharts.Tooltip, null),
    React.createElement(Recharts.Legend, null),
    React.createElement(Recharts.Line, { type: "monotone", dataKey: "pv", stroke: "#8884d8" }),
    React.createElement(Recharts.Line, { type: "monotone", dataKey: "uv", stroke: "#82ca9d" })
  );
}

function Layout(props) {

  return React.createElement(
    "div",
    null,
    React.createElement(
      "div",
      { className: "row header" },
      React.createElement(
        "h2",
        null,
        "Graficos."
      )
    ),
    React.createElement(
      "div",
      { className: "row body" },
      React.createElement(Chart, { data: props.data })
    )
  );
}

var LayoutContainer = function (_React$Component) {
  _inherits(LayoutContainer, _React$Component);

  function LayoutContainer(props) {
    _classCallCheck(this, LayoutContainer);

    var _this = _possibleConstructorReturn(this, (LayoutContainer.__proto__ || Object.getPrototypeOf(LayoutContainer)).call(this, props));

    _this.loadData = function (metric_id) {
      fetch("https://api-2753bae4zq-uc.a.run.app/metrics/6cedc79c").then(function (res) {
        return res.json();
      }).then(function (result) {
        var data = [];
        for (var metric in result.metric.data) {
          console.log(result.metric.data[metric]);
          data.push({
            "name": result.metric.data[metric].creation_date,
            "uv": result.metric.data[metric].value
          });
        }
        _this.setState({
          data: data
        });

        setTimeout(_this.loadData, 1000);
      });
    };

    _this.state = {
      data: []
    };
    _this.loadData();
    return _this;
  }

  _createClass(LayoutContainer, [{
    key: "render",
    value: function render() {
      return React.createElement(Layout, { data: this.state.data });
    }
  }]);

  return LayoutContainer;
}(React.Component);

var root = document.getElementById("page-container");
ReactDOM.render(React.createElement(LayoutContainer, null), root);