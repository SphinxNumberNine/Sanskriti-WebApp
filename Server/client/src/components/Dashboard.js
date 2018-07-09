import React, { Component } from "react";
import { connect } from "react-redux";
//import * as actions from "../actions";
import axios from "axios";

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {};
  }

  async getStudents() {
    var parentUser;
    var students;
    if (this.props.auth) {
      parentUser = this.props.auth._id;
    }
    if (parentUser) {
      const res = await axios.post("/api/students", { parentId: parentUser });
      this.students = res.data.students;
      return students;
    }

    return students;
  }

  componentWillReceiveProps(nextProps) {
    var parentUser;
    //var students;
    let rows = [];
    console.log(nextProps);
    if (nextProps.auth) {
      parentUser = nextProps.auth._id;
      console.log(parentUser);
    }
    if (parentUser) {
      axios.post("/api/students", { parentId: parentUser }).then(res => {
        this.students = res.data.students;
        if (this.students) {
          //let rows = [];
          for (var i = 0; i < this.students.length; i++) {
            var student = this.students[i];
            let rowID = `row${i}`;
            let cell = [];
            let cellkey = `cell${i}`;
            cell.push(<td key={cellkey + "1"}>{student.name}</td>);
            cell.push(<td key={cellkey + "2"}>{student.email}</td>);
            cell.push(<td key={cellkey + "3"}>{student.phoneNumber}</td>);
            var classes = "";
            for (var x = 0; x < student.classes.length; x++) {
              if (!(x === student.classes.length - 1)) {
                classes += student.classes[x] + ", ";
              } else {
                classes += student.classes[x];
              }
            }
            cell.push(<td key={cellkey + "4"}>{classes}</td>);
            rows.push(
              <tr key={i} id={rowID}>
                {cell}
              </tr>
            );
          }
        }

        console.log(rows);

        this.setState({
          rows: rows,
          promiseResolved: true
        });

        console.log(this.state);
      });
    }
  }

  render() {
    if (!this.state.promiseResolved) {
      return (
        <div style={{ textAlign: "center" }}>
          Please login to see students dashboard
        </div>
      );
    } else {
      console.log("HERE2");
      return (
        <div>
          <div style={{ textAlign: "center",  }}>
            <h4>Welcome, {this.props.auth.name}! Here is your students dashboard.</h4>
          </div>
          <Table rows={this.state.rows} />
        </div>
      );
    }
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

function Table(props) {
  const rows = props.rows;
  return (
    <div className="container">
      <div className="row">
        <div className="col s12 board">
          <table id="simple-board">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Classes</th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
            {console.log("I am here")}
          </table>
        </div>
      </div>
    </div>
  );
}

export default connect(mapStateToProps)(Dashboard);
