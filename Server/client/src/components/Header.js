import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from '../actions';

class Header extends Component {
  componentWillMount() {
    this.setState({ auth: this.props.auth });
  }

  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return (
          <li>
            <a href="/auth/google">Login with Google </a>
          </li>
        );
      default:
        if (this.props.auth.admin) {
          this.props.getAllClasses();
          return [
            <li key="1">
              <a href="/admin/classes">Classes</a>
            </li>,
            <li key="2">
              <a href="/dashboard">Dashboard</a>
            </li>,
            <li key="3">
              <a href="/api/logout">Logout</a>
            </li>
          ];
        }
        return [
          <li key="2">
            <a href="/dashboard">Dashboard</a>
          </li>,
          <li key="3">
            <a href="/api/logout">Logout</a>
          </li>
        ];
    }
  }

  render() {
    var href = "/";
    if (this.props.auth) {
      href = "/dashboard";
    }
    return (
      <nav className="red lighten-2">
        <div className="nav-wrapper">
          <a href={href} className="left brand-logo">
            Sanskriti School of Dance
          </a>
          <ul className="right">{this.renderContent()}</ul>
        </div>
      </nav>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps, actions)(Header);
