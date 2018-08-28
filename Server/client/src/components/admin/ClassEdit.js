import React, { Component } from "react";
import { connect } from "react-redux";

class ClassEdit extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.danceClass) {
      var danceClass = nextProps.danceClass.danceClass;
      this.setState(danceClass);
    }
  }

  renderDayButton(button, checked) {
    var firstLetter = button.charAt(0);
    const labelText = firstLetter.toUpperCase() + button.substring(1);
    return (
      <p key={button}>
        <input
          className="with-gap"
          name="group1"
          type="radio"
          id={labelText}
          checked={checked}
          onChange={this.handleDayOfWeekChange.bind(this)}
        />
        <label htmlFor={labelText}>{labelText}</label>
      </p>
    );
  }

  renderDaysOfWeekButtons() {
    const days = [
      "sunday",
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday"
    ];
    var buttons = [];
    for (var x = 0; x < days.length; x++) {
      if (days[x].toUpperCase() === this.state.dayOfWeek.toUpperCase()) {
        buttons.push(this.renderDayButton(days[x], true));
      } else {
        buttons.push(this.renderDayButton(days[x], false));
      }
    }

    return buttons;
  }

  renderForm() {
    var timeFormatted = "";
    if (this.props.danceClass) {
      if (this.state.time) {
        timeFormatted = this.state.time;
        timeFormatted = timeFormatted.replace(" PM", "");
        timeFormatted = timeFormatted.replace(" AM", "");
        if (timeFormatted.length === 4) {
          timeFormatted = "0" + timeFormatted;
        }
      }
      return (
        <div>
          <div className="row">
            <div className="input-field col s4">
              <input
                value={this.state.name || ""}
                id="first_name"
                type="text"
                className="validate"
                onChange={this.handleNameChange.bind(this)}
              />
              <label className="active" htmlFor="first_name">
                Name:
              </label>
            </div>
            <div className="input-field col s4">
              <input
                value={this.formatFeeString(this.state.fee) || ""}
                id="first_name"
                type="number"
                className="validate"
                onChange={this.handleFeeChange.bind(this)}
              />
              <label className="active" htmlFor="first_name">
                Fee:
              </label>
            </div>
            <div className="input-field col s4">
              <input
                id="time_picker"
                type="time"
                className="timepicker"
                value={timeFormatted || ""}
                onChange={this.handleTimeChange.bind(this)}
              />
              <label className="active" htmlFor="time_picker">
                Time:
              </label>
            </div>
          </div>
          <div className="row">
            <div className="col s3">
              <label>Day of Week:</label>
              {this.renderDaysOfWeekButtons()}
            </div>
          </div>
          <div className="row">
            <div style={{ textAlign: "right" }}>
              <input
                className="btn red lighten-3"
                type="button"
                id="delete_button"
                value="Delete Class"
              />
            </div>
          </div>
          <div className="row">
            <div style={{ textAlign: "right" }}>
              <input
                className="btn red lighten-3"
                type="button"
                id="submit_button"
                value="Submit Changes"
              />
            </div>
          </div>
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        <div style={{ textAlign: "center" }}>
          <h5>Class Edit</h5>
        </div>
        {this.renderForm()}
      </div>
    );
  }

  handleNameChange(e) {
    this.setState({ name: e.target.value });
  }

  handleFeeChange(e) {
    this.setState({ fee: "$" + e.target.value });
  }

  handleDayOfWeekChange(e) {
    if (e.target.checked) {
      this.setState({ dayOfWeek: e.target.id });
    }
  }

  handleTimeChange(e) {
    this.setState({ time: e.target.value });
  }

  formatFeeString(feeString) {
    return feeString.replace("$", "");
  }
}

function mapStateToProps(state) {
  return {
    danceClass: state.requestedFetch
  };
}

export default connect(mapStateToProps)(ClassEdit);
