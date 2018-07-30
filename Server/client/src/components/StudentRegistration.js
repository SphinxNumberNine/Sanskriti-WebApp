import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";

class StudentRegistration extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentWillMount() {
    this.selectedCheckboxes = new Set();
  }

  handleInputChange() {}

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

    const classCheckboxes = document.getElementsByName("class");
    let userSignedUpClasses = [];
    let userSignedUpIds = [];
    for (var x = 0; x < classCheckboxes.length; x++) {
      const checkbox = classCheckboxes[x];
      if (checkbox.checked) {
        const label = document.getElementById(checkbox.id + "_label");
        const text = label.innerText;
        console.log(text);
        userSignedUpIds.push(checkbox.id);
        userSignedUpClasses.push(text);
      }
    }

    var totalFees = 0;
    var totalFeeString = "0";

    for (var i = 0; i < this.state.classes.length; i++) {
      const danceClass = this.state.classes[i];
      if (userSignedUpIds.includes(danceClass._id)) {
        var classFee = danceClass.fee;
        classFee = classFee.replace(/\$|,/g, "");
        var feeInt = parseInt(classFee, 10);
        totalFees += feeInt;
        totalFeeString = "$" + totalFees;
      }
    }

    //TODO: Check if fields are valid

    if (!this.validateEmail(email)) {
      return;
    }

    if (!this.validateName(name)) {
      return;
    }

    axios
      .post("/register/student", {
        name: name,
        email: email,
        phoneNumber: phone,
        parentUser: this.state.parentUser,
        classes: userSignedUpClasses,
        classesIds: userSignedUpIds,
        totalFees: totalFeeString,
        paid: false
      })
      .then(res => {
        // Update classes, adding new student and (potentially) new user

        for (var y = 0; y < this.state.classes.length; y++) {
          if (userSignedUpIds.includes(this.state.classes[y]._id)) {
            const danceClass = this.state.classes[y];
            var users = danceClass.users;
            var students = danceClass.students;

            if (!users.includes(this.state.parentUser)) {
              users.push(this.state.parentUser);
            }

            students.push(res.data.student._id);

            axios.post("/update/class", {
              id: danceClass._id,
              name: danceClass.name,
              dayOfWeek: danceClass.dayOfWeek,
              time: danceClass.time,
              students: students,
              users: users,
              fee: danceClass.fee
            });
          }
        }

        //Update user, adding new student

        var currentUserStudents = this.state.auth.students;
        currentUserStudents.push(res.data.student._id);

        axios.post("/update/user", {
          id: this.state.parentUser,
          name: this.state.auth.name,
          email: this.state.auth.email,
          students: currentUserStudents,
          admin: this.state.auth.admin,
          googleId: this.state.auth.googleId
        });

        this.props.history.push("/student-registration/success");
      });
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
        console.log(this.state.classes);
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
        var danceClassId = danceClass._id;
        var boxKey = `box${x}`;
        classCheckBoxes.push(
          <li key={boxKey}>
            <input
              type="checkbox"
              name="class"
              value={danceClass.name}
              onChange={this.handleInputChange.bind(this)}
              id={danceClassId}
            />
            <label htmlFor={danceClassId} id={danceClassId + "_label"}>
              {danceClassText}
            </label>
          </li>
        );
      }
      return classCheckBoxes;
    }
    return null;
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
        <input type="number" name="phone" id="phone_id" />
        <br />
        <h6>Classes: </h6>
        <ul>{this.renderClasses()}</ul>
        <div style={{ textAlign: "right" }}>
          <input
            type="button"
            name="submit"
            onClick={this.submit}
            value="Submit"
            className="btn red lighten-3"
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

  validateEmail(email) {
    const regex = /\S+@\S+\.\S+/;
    return regex.test(email);
  }

  validateName(name) {
    if (name.length > 70 || name.length < 7) {
      return false;
    }

    return true;
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(StudentRegistration);
