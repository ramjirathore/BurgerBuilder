import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import axios from '../../axios-orders';
import CheckoutSummary from '../../components/Orders/CheckoutSummary /CheckoutSummary';
import ContactData from './ContactData/ContactData';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Checkout extends Component {
	CheckoutCancelledHandler = () => {
		this.props.history.goBack('/checkout');
	};

	CheckoutContinuedHandler = () => {
		this.props.history.replace('/checkout/contact-data');
	};
	render() {
		let summary = <Redirect to="/" />;
		if (this.props.ings) {
			const purchasedRedirect = this.props.purchased ? (
				<Redirect to="/" />
			) : null;
			summary = (
				<div>
					{purchasedRedirect}
					<CheckoutSummary
						ingredients={this.props.ings}
						CheckoutCancelled={this.CheckoutCancelledHandler}
						CheckoutContinued={this.CheckoutContinuedHandler}
					/>
					<Route
						path={this.props.match.path + '/contact-data'}
						component={ContactData}
					/>
				</div>
			);
		}
		return summary;
	}
}

const mapStateToProps = (state) => {
	return {
		ings: state.burgerBuilder.ingredients,
		purchased: state.order.purchased
	};
};

export default connect(mapStateToProps)(withErrorHandler(Checkout, axios));
