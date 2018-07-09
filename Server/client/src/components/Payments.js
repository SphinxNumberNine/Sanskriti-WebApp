import React, { Component } from "react";
import StripeCheckout from "react-stripe-checkout";
import { connect } from "react-redux";
import * as actions from "../actions";

class Payments extends Component {
  render() {
    return (
      <StripeCheckout
        amount={8000}
        name="Sanskriti School of Dance"
        description="Pay fees for this month."
        token={token => this.props.handleToken(token)}
        stripeKey={process.env.REACT_APP_STRIPE_KEY}
      >
        <button className="btn red lighten-3"> Pay Fees </button>
      </StripeCheckout>
    );
  }
}

export default connect(
  null,
  actions
)(Payments);
