import React from 'react';
import { fetchCustomer, updateCustomer } from '../../actions/customerActions';
import { connect } from 'react-redux';
import CustomerForm from './CustomerForm';

class CustomerEdit extends React.Component {

  componentDidMount() {
    this.props.fetchCustomer(this.props.match.params.id);
  }

  onSubmit = formValues => {
    this.props.updateCustomer(this.props.match.params.id, formValues);
  }

  render() {
    if(!this.props.customer) {
      return <div>Loading...</div>
    }

    return (
      <div className="ui segment">
        <h3>Edit customer</h3>
        <CustomerForm
          customer={this.props.customer}
          onSubmit={this.onSubmit} />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  customer: state.customers[ownProps.match.params.id]
});

const mapDispatchToProps = {
  fetchCustomer,
  updateCustomer
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomerEdit);