import React from 'react';
import { connect } from 'react-redux';
import { createCustomer } from '../../actions/customerActions';
import CustomerForm from './CustomerForm';

class CustomerCreate extends React.Component {

  onSubmit = formValues => {
    this.props.createCustomer(formValues);
  }

  render() {
    return (
      <div className="ui segment">
        <h3>New customer</h3>
        <CustomerForm onSubmit={this.onSubmit} />
      </div>
    );
  } 
}

export default connect(null, { createCustomer })(CustomerCreate);