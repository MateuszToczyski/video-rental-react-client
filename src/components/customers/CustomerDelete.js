import React from 'react';
import { Link } from 'react-router-dom';
import Modal from '../Modal';
import history from '../../history';
import { connect } from 'react-redux';
import { fetchCustomer, deleteCustomer } from '../../actions/customerActions';

class CustomerDelete extends React.Component {

  componentDidMount() {
    this.props.fetchCustomer(this.props.match.params.id);
  }

  renderActions() {
    const { id } = this.props.match.params;
    return (
      <React.Fragment>
        <button onClick={() => this.props.deleteCustomer(id)} className="ui button negative">Delete</button>
        <Link to={`/customers/edit/${this.props.customer.id}`} className="ui button">Cancel</Link>
      </React.Fragment>
    );
  }

  renderContent() {
    if(!this.props.customer) {
      return 'Are you sure you want to delete this customer?'
    } else {
      return `Are you sure you want to delete customer: ${this.props.customer.name}?`
    }
  }

  render() {
    if(!this.props.customer) {
      return <div>Loading...</div>
    }

    return (
      <Modal
        title="Delete customer"
        content={this.renderContent()}
        actions={this.renderActions()}
        onDismiss={() => history.push(`/customers/edit/${this.props.customer.id}`)}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
    customer: state.customers[ownProps.match.params.id]
});

const mapDispatchToProps = {
  fetchCustomer,
  deleteCustomer
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomerDelete);