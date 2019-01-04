import * as React from "react";
import * as ReactDOM from "react-dom";
import "./init.scss";
import <%= project %>Pages from "../Component/<%= project %>Pages";
import <%= project %>Flux from "../Component/<%= project %>Flux";

let <%= projectLower %>Component1 = document.getElementById('<%= projectLower %>-component1');
if (<%= projectLower %>Component1) {
    ReactDOM.render(<<%= project %>Pages listName="Pages" /> , <%= projectLower %>Component1);
}

let <%= projectLower %>Component2 = document.getElementById('<%= projectLower %>-component2');
if (<%= projectLower %>Component2) {
    ReactDOM.render(<<%= project %>Flux /> , <%= projectLower %>Component2);
}
