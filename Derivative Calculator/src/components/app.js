var React = require("react");

var App = React.createClass({
	getInitialState: function() {
		return {
			variable: "",
		}
	},
	answer: function() {
		string = $("#input").val()
		var count = 0;
		var variable = "";
		for (var i = 0; i < string.length; i++) {
			if (string.length == 1) {
				this.setState({
					variable: 1
				})
			}
			if (isNaN(string[i]) && string[i] != "+") {
				count += 1;
				variable = string[i]
			}
			if (count == 2) {
				this.setState({
					variable: "error"
				})
				return
			}
			if (i == string.length - 1 && count == 1) {
				this.setState({
					variable: variable
				})
			}
			else if (!isNaN(string[i]) && i == string.length - 1){
				this.setState({
					variable: variable
				})
			}
		}
	},
	render: function() {
		return (
			<div>
				<input id="input" type="text" />
				<button onClick={this.answer}>answer</button>
				<div>{this.state.variable}</div>
			</div>
		)
	}
})

module.exports = App;