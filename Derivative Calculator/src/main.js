"use strict";
// Links
var $, jQuery;
$ = jQuery = require("jquery");
var React = require("react");
var ReactDOM = require("react-dom");
var hashHistory = require("react-router").hashHistory;
//components
var Router = require("react-router").Router;
var App = require("./components/app")

ReactDOM.render(
	<App />
	, document.getElementById("app"));