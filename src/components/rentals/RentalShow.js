import React from 'react';
import { connect } from 'react-redux';
import { fetchRental, returnVideo, settleRental } from '../../actions/customerActions';

class RentalShow extends React.Component {

  componentDidMount() {
    this.props.fetchRental(this.props.match.params.rentalId);
  }

  renderReturnButton() {
    const { rental } = this.props;

    if(rental.returnDate) {
      return null;
    }

    return (
      <button
          className="ui button primary"
          onClick={() => this.props.returnVideo(rental.customerId, rental.id)}
      >
        Return
      </button>
    ) 
  }

  renderSettleButton() {
    const { rental } = this.props;

    if(rental.settled || !rental.returnDate) {
      return;
    }

    return (
      <button
          className="ui button primary"
          onClick={() => this.props.settleRental(rental.customerId, rental.id)}
      >
        Settle
      </button>
    ) 
  }

  renderRentalStatus() {
    const { rental } = this.props;
    if(rental.returnDate && rental.settled) {
      return 'CLOSED';
    } else {
      return 'ACTIVE';
    }
  }

  render() {
    const { rental } = this.props;

    if(!rental) {
      return <div>Loading...</div>
    }

    return (
      <div className="ui segment">
        <div className="ui form">
          <div className="field">
            <div className="ui header">
              Rental ID: {rental.id} ({this.renderRentalStatus()})
            </div>
          </div>
          <div className="field">
            {this.renderReturnButton()}
            {this.renderSettleButton()}
          </div>
          <div className="field">
            <div>Returned: {rental.returnDate || 'NO'}</div>
            <div>Settled: {rental.settled ? 'YES' : 'NO'}</div>
            <div>Video: {rental.copy.video.title}</div>
            <div>Copy ID: {rental.copy.id}</div>
            <div>Fee: ${rental.baseFee}</div>
            <div>Penalty: {rental.penalty ? '$' + rental.penalty : 'none'} </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  rental: state.rental
});

const mapDispatchToProps = {
  fetchRental,
  returnVideo,
  settleRental
}

export default connect(mapStateToProps, mapDispatchToProps)(RentalShow);