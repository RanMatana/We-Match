import React from "react";
import Navigate from "./Navigate";
import {  NavigateProvider } from "./NavigateContext";

export default class CoverNavigate extends React.Component {
  render() {
    return (
      <NavigateProvider>
        <Navigate />
      </NavigateProvider>
    );
  }
}
