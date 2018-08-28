import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from '../../actions'
import axios from "axios";

class Classes extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    this.getClasses();
  }

  componentWillMount() {
    this.setState({ auth: this.props.auth });
  }

  onRowClick(id) {
    this.props.fetchClass(id);
    this.props.history.push("/admin/class-edit");
  }

  async getClasses() {
    let rows = [];
    await axios.get("/api/classes").then(res => {
      var classes = res.data.classes;
      if (classes) {
        for (var i = 0; i < classes.length; i++) {
          var danceClass = classes[i];
          let rowID = danceClass._id;
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
          rows.push(
            <tr key={i} id={rowID} onClick={() => this.onRowClick(rowID)}>
              {cell}
            </tr>
          );
        }

        this.setState({
          auth: this.props.auth,
          rows: rows,
          promiseResolved: true
        });

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
      );
    } else {
      return (
        <div>
          <div style={{ textAlign: "center" }}>
            <h4>
              Welcome, {this.props.auth.name}. Here is the Sanskriti classes
              dashboard.
            </h4>
            <h6>Click on a class to edit it.</h6>
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
          <table
            id="simple-board"
            className="highlight responsive-table bordered"
          >
            <thead>
              <tr>
                <th>Name</th>
                <th>Day</th>
                <th>Time</th>
                <th>Students</th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default connect(mapStateToProps, actions)(Classes);
