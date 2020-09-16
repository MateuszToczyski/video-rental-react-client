import React from 'react';
import { connect } from 'react-redux';
import { calculateRental, rentVideo } from '../../actions/customerActions';
import Modal from '../Modal';

class RentalConfirm extends React.Component {

  componentDidMount() {
    const customerId = this.props.customer.id;
    const copyId = this.findFirstAvailableCopy().id;
    this.props.calculateRental(customerId, copyId);
  }

  findFirstAvailableCopy() {
    const availableCopies = this.props.video.copies.filter(
      copy => copy.available === true
    );
    return availableCopies[0];
  }

  renderRentalDetails = () => {
    const { rental, customer, video } = this.props;

    const items = [
      { title: 'Customer', value: customer.name },
      { title: 'Video', value: video.title },
      { title: 'Fee', value: '$' + rental.baseFee },
      { title: 'Due', value: rental.dueDate }
    ]

    return items.map(item => {
      return (
        <div className="item" key={item.title}>
          <div className="content">
            <h4 className="ui header">{item.title}</h4>
            <div>{item.value}</div>
          </div>
        </div>
      )
    })
  }

  renderContent() {
    return (
      <div className="ui items">
        {this.renderRentalDetails()}
      </div>
    )
  }

  renderActions() {
    const customerId = this.props.customer.id;
    const copyId = this.findFirstAvailableCopy().id;

    return (
      <React.Fragment>
        <button
            onClick={() => this.props.rentVideo(customerId, copyId)}
            className="ui button primary"
        >
          Rent
        </button>
        <button
            onClick={() => this.props.onVideoSelect(null)}
            className="ui button"
        >
          Cancel
        </button>
      </React.Fragment>
    )
  }

  render() {
    if(!this.props.rental) {
      return <div>Loading...</div>
    }

    return (
      <Modal
        title="Confirm rental"
        content={this.renderContent()}
        actions={this.renderActions()}
        onDismiss={() => this.props.onVideoSelect(null)}
      />
    )
  }
}

const mapStateToProps = state => ({
  rental: state.rental
});

const mapDispatchToProps = {
  calculateRental,
  rentVideo
}

export default connect(mapStateToProps, mapDispatchToProps)(RentalConfirm);