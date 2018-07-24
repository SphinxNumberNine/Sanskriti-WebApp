import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";

class Classes extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
  }

  componentDidMount() {
    this.getClasses();
  }

  async getClasses() {
    let rows = [];
    await axios.get("/api/classes").then(res => {
      var classes = res.data.classes;
      console.log(classes);
      if (classes) {
        for (var i = 0; i < classes.length; i++) {
          var danceClass = classes[i];
          console.log(danceClass);
          let rowID = `row${i}`;
          let cell = [];
          let cellKey = `cell${i}`;
          cell.push(<td key={cellKey + "1"}>{danceClass.name}</td>);
          cell.push(<td key={cellKey + "2"}>{danceClass.dayOfWeek}</td>);
          cell.push(<td key={cellKey + "3"}>{danceClass.time}</td>);
          var students = "";
          if (danceClass.students) {
            for (var x = 0; x < danceClass.students.length; x++) {
              if (!(x === danceClass.students.length - 1)) {
                students += danceClass.students[x] + ", ";
              } else {
                students += danceClass.students[x];
              }
            }
          }
          cell.push(<td key={cellKey + "4"}>{students}</td>);
          console.log(cell);
          rows.push(
            <tr key={i} id={rowID}>
              {cell}
            </tr>
          );
        }
        console.log(rows);

        this.setState({
          rows: rows,
          promiseResolved: true
        });

        console.log(this.state);

        return rows;
      }
    });

    return null;
  }

  renderClasses() {
    if (!this.state.promiseResolved) {
      return (
        <div style={{ textAlign: "center" }}>
          Please login as admin to see classes dashboard
        </div>
      )
    } else {
      return (
        <div>
          <div style={{ textAlign: "center" }}>
            <h4>
              Welcome, {this.props.auth.name}. Here is the Sanskriti classes
              dashboard.
            </h4>
          </div>
          <Table rows={this.state.rows} />
        </div>
      );
    }
  }

  renderPermissionsError() {
    return (
      <div style={{ textAlign: "center" }}>
        <h6>Sorry, you do not have the permissions to see this page.</h6>
      </div>
    );
  }

  render() {
    switch (this.props.auth) {
      case null:
        return <div>ERROR</div>;
      case false:
        return <div>ERROR</div>;
      default:
        console.log(this.props.auth.admin);
        switch (this.props.auth.admin) {
          case true:
            return this.renderClasses();
          default:
            return this.renderPermissionsError();
        }
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
                <th>Day</th>
                <th>Time</th>
                <th>Students</th>
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

export default connect(mapStateToProps)(Classes);
