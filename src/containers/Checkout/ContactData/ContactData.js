import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import Input from '../../../components/UI/Input/Input';
import { connect } from 'react-redux';

import * as actions from '../../../store/actions/index';
import Spinner from '../../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../../axios-orders';

import classes from './ContactData.css';

class ContactData extends Component {
	state = {
		orderForm: {
			name: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Your Name'
				},
				value: '',
				validation: {
					required: true
				},
				valid: false,
				touched: false
			},
			street: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Street'
				},
				value: '',
				validation: {
					required: true
				},
				valid: false,
				touched: false
			},
			zipCode: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'ZIP Code'
				},
				value: '',
				validation: {
					required: true,
					minLength: 6,
					maxLength: 6
				},
				valid: false,
				touched: false
			},
			country: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Country'
				},
				value: '',
				validation: {
					required: true
				},
				valid: false,
				touched: false
			},
			email: {
				elementType: 'input',
				elementConfig: {
					type: 'email',
					placeholder: 'Your E-Mail'
				},
				value: '',
				validation: {
					required: true
				},
				valid: false,
				touched: false
			},
			deliveryMethod: {
				elementType: 'select',
				elementConfig: {
					options: [
						{ value: 'fastest', displayValue: 'Fastest' },
						{ value: 'cheapest', displayValue: 'Cheapest' }
					]
				},
				formIsValid: false,
				value: 'fastest',
				validation: {},
				valid: true
			}
		},
		loading: false
	};

	checkValidity = (value, rules) => {
		let isValid = true;
		if (rules.required) {
			isValid = value.trim() !== '' && isValid; // trim() removes whitespaces here
		}

		if (rules.minLength) {
			isValid = value.length >= rules.minLength && isValid;
		}

		if (rules.maxLength) {
			isValid = value.length <= rules.maxLength && isValid;
		}
		return isValid;
	};

	orderHandler = (event) => {
		event.preventDefault();
		this.setState({ loading: true });
		const formData = {};
		for (let formElementIdentifier in this.state.orderForm) {
			formData[formElementIdentifier] = this.state.orderForm[
				formElementIdentifier
			].value;
		}
		const order = {
			ingredients: this.props.ings,
			price: this.props.price,
			orderData: formData,
			userId: this.props.userId
		};
		this.props.onOrderBurger(order, this.props.token);
	};

	inputChangedHandler = (event, inputIdentifier) => {
		const upadatedOrderForm = {
			...this.state.orderForm
		}; // Since there is still object inside so this still points to state
		const updatedFormElement = {
			// now it is copied
			...upadatedOrderForm[inputIdentifier]
		};
		updatedFormElement.value = event.target.value;
		updatedFormElement.valid = this.checkValidity(
			updatedFormElement.value,
			updatedFormElement.validation
		);
		updatedFormElement.touched = true;

		let formIsValid = true;
		for (let inputIdentifier in upadatedOrderForm) {
			formIsValid = upadatedOrderForm[inputIdentifier].valid && formIsValid;
		}

		upadatedOrderForm[inputIdentifier] = updatedFormElement;
		this.setState({ orderForm: upadatedOrderForm, formIsValid });
	};

	render() {
		const formElementsArray = [];
		for (let key in this.state.orderForm) {
			formElementsArray.push({
				id: key,
				config: this.state.orderForm[key]
			});
		}
		let form = (
			<form onSubmit={this.orderHandler}>
				{formElementsArray.map((formElement) => (
					<Input
						key={formElement.id}
						elementType={formElement.config.elementType}
						elementConfig={formElement.config.elementConfig}
						value={formElement.config.value}
						valueType={formElement.id}
						invalid={!formElement.config.valid}
						shouldValidate={formElement.config.validation}
						touched={formElement.config.touched}
						changed={(event) => this.inputChangedHandler(event, formElement.id)}
					/>
				))}
				<Button btnType="Success" disabled={!this.state.formIsValid}>
					ORDER
				</Button>
			</form>
		);
		if (this.props.loading) {
			form = <Spinner />;
		}

		return (
			<div className={classes.ContactData}>
				<h4>Enter your Contact Data</h4>
				{form}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		ings: state.burgerBuilder.ingredients,
		price: state.burgerBuilder.totalPrice,
		loading: state.order.loading,
		token: state.auth.token,
		userId: state.auth.userId
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onOrderBurger: (orderData, token) =>
			dispatch(actions.purchaseBurger(orderData, token))
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withErrorHandler(ContactData, axios));

// since we didn't had history so we can pass it
// by wrapping ContactData withRouter HOC
// -> export default withRouter(ContactData)
