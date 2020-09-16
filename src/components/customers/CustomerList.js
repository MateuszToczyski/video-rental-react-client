import React from 'react';
import { connect } from 'react-redux';
import { fetchCustomers } from '../../actions/customerActions';
import { Link } from 'react-router-dom';

class CustomerList extends React.Component {

  state = {
    searchTerm: ''
  }

  componentDidMount() {
    this.props.fetchCustomers();
  }

  renderList() {
    const { searchTerm } = this.state;
    return this.props.customers
      .filter(customer => customer.name.toLowerCase().includes(searchTerm.toLowerCase()))
      .map(customer => {
        return (
          <Link to={`/customers/${customer.id}`} className="item" key={customer.id}>
            <div className="content">
              <div className="header">
                {customer.name}
              </div>
              <div className="description">
                ID: {customer.id}, {customer.group.name}
              </div>
            </div>
          </Link>
        );
    });
  }

  renderCreateButton() {
    return (
      <div style={{ textAlign: 'right' }}>
        <Link to="/customers/new" className="ui button primary">
          New
        </Link>
      </div>
    );
  }

  render() {
    return (
      <div>
        <div className="ui fluid icon input">
          <input
              value={this.state.searchTerm}
              placeholder="Search..."
              onChange={e => this.setState({ searchTerm: e.target.value })}
          />
          <i className="search icon"></i>
        </div>
        <div className="ui selection list">
          {this.renderList()}
        </div>
        {this.renderCreateButton()}
      </div>
    );
  }
}

const mapStateToProps = state => ({
    customers: Object.values(state.customers)
})

export default connect(mapStateToProps, { fetchCustomers })(CustomerList);