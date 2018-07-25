import React, { Component } from "react";
import CheckBoxList from "./CheckBoxList";

class Landing extends Component {
  test() {
    const testObjectArray = [
      {
        value: "TEST1",
        label: "Test 1"
      },
      {
        value: "TEST2",
        label: "Test 2"
      }
    ];

    return(
        <CheckBoxList ref="chkboxList" defaultData={testObjectArray} onChange={null} />
    )
  }

  render() {
    return (
      <div style={{ textAlign: "center" }}>
        <h1> Sanskriti School of Dance</h1>
        Welcome to the webpage of the Sanskriti School of Dance, based in South
        Brunswick, New Jersey.
        <br />
      </div>
    );
  }
}

export default Landing;
