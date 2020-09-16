import React from 'react';
import { connect } from 'react-redux';
import { fetchCustomer } from '../../actions/customerActions';
import { Link } from 'react-router-dom';

class CustomerShow extends React.Component {

  componentDidMount() {
    this.props.fetchCustomer(this.props.match.params.id);
  }

  renderRentalList() {
    if(!this.props.customer) {
      return null;
    }

    const { customer } = this.props;

    return customer.rentals.map(rental => {
      return (
        <Link to={`/customers/${customer.id}/rentals/${rental.id}`} className="item" key={rental.id}>
          <div className="content">
            <div className="header">
              {rental.copy.video.title} {!rental.returnDate || !rental.settled ? '(ACTIVE)' : ''}
            </div>
            <div className="description">
              {rental.startDate} - {rental.returnDate || rental.dueDate}
            </div>
            <div className="description">
              fee: ${rental.baseFee}, 
              penalty: {rental.penalty ? '$' + rental.penalty : 'none'}
            </div>
          </div>
        </Link>
      )
    })
  }

  render() {
    if(!this.props.customer) {
      return <div>Loading...</div>
    }

    const { id, name, group } = this.props.customer;

    return (
      <div className="ui segments">
        <div className="ui segment">
          <h2 className="ui header">
            <div className="content">
              {name + ' '}
              <Link to={`/customers/edit/${id}`}>
                <i className="small edit icon"></i>
              </Link>
            </div>
            <div className="sub header">
              ID: {id}, Group: {group.name}
            </div>
          </h2>
        </div>
        <div className="ui segment">
          <div className="ui header">
            Rental history
          </div>
          <div className="ui selection list">
            {this.renderRentalList()}
          </div>
          <Link to={`/customers/${id}/rentals/new`} className="ui button primary">
            Rent a video
          </Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
    customer: state.customers[ownProps.match.params.id]
});

const mapDispatchToProps = {
  fetchCustomer
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomerShow);