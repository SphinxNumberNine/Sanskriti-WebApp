import React, { Component } from "react";
import { connect } from "react-redux";
import Checkbox from './Checkbox';
import axios from "axios";

class StudentRegistration extends Component {

  constructor() {
    super()
    this.state = {};
  }

  handleInputChange() {

  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    if (nextProps.auth) {
      this.setState({ auth: nextProps.auth, parentUser: nextProps.auth._id });
    }
    this.setClassesInState();
  }

  submit(e) {
    const name = document.getElementById("name_id").value;
    const email = document.getElementById("email_id").value;
    const phone = document.getElementById("phone_id").value;
    console.log(name);
    console.log(email);
    console.log(phone);
  }

  setClassesInState() {
    axios.get("/api/classes").then(res => {
      var classes = res.data.classes;
      console.log(classes);
      if (classes) {
        this.setState({
          auth: this.state.auth,
          parentUser: this.state.parentUser,
          classes: classes
        });
      }
    });
  }

  renderClasses() {
    var classes = this.state.classes;
    console.log(classes);
    if (classes) {
      let classCheckBoxes = [];
      for (var x = 0; x < classes.length; x++) {
        var danceClass = classes[x];
        var danceClassText =
          danceClass.name + ": " + danceClass.dayOfWeek + " " + danceClass.time;
        var boxKey = `box${x}`;
        classCheckBoxes.push(
          <li key={boxKey}>
            <label>
              {danceClassText}
              <input type="checkbox" name="class" value={danceClass.name} onChange={this.handleInputChange} checked={false}/>
            </label>
          </li>
        );
      }
      console.log(classCheckBoxes);
      return classCheckBoxes;
    }
    return [];
  }

  renderForm() {
    this.submit = this.submit.bind(this);
    return (
      <form>
        <h6>Name: </h6>
        <input type="text" name="name" id="name_id" />
        <br />
        <h6>Email: </h6>
        <input type="text" name="email" id="email_id" />
        <br />
        <h6>Phone: </h6>
        <input type="text" name="phone" id="phone_id" />
        <br />
        <h6>Classes: </h6>
        <ul>{this.renderClasses()}</ul>
        <div style={{ textAlign: "right" }}>
          <input
            type="button"
            name="submit"
            onClick={this.submit}
            value="Submit"
          />
          <br />
        </div>
      </form>
    );
  }

  render() {
    return (
      <div style={{ textAlign: "left", anchor: "bottom" }}>
        {this.renderForm()}
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(StudentRegistration);
