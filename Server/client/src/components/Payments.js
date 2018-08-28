import React, { Component } from "react";
import StripeCheckout from "react-stripe-checkout";
import { connect } from "react-redux";
import * as actions from "../actions";

class Payments extends Component {
  render() {
    var total = this.props.totalFees || 10000
    return (
      <StripeCheckout
        amount={total}
        name="Sanskriti School of Dance"
        description="Pay fees for this month."
        token={token => this.props.handleToken(token, total)}
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
