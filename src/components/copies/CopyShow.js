import React from 'react';
import { connect } from 'react-redux';
import { fetchCopy } from '../../actions/videoActions';
import { Link } from 'react-router-dom';

class CopyShow extends React.Component {

  componentDidMount() {
    const { videoId, copyId } = this.props.match.params;
    this.props.fetchCopy(videoId, copyId);
  }

  renderRentalList() {
    if(!this.props.copy || !this.props.copy.rentals) {
      return null;
    }
    return this.props.copy.rentals.map(rental => {
      return (
        <Link to={`/customers/${rental.customerId}`} className="item" key={rental.id}>
          <div className="content">
            <div className="header">
              Customer ID: {rental.customerId}{!rental.returnDate ? ' (ACTIVE)' : ''}
            </div>
            <div className="description">
              {rental.startDate} - {rental.returnDate || rental.dueDate + ' (due)'}
            </div>
          </div>
        </Link>
      )
    })
  }

  render() {
    if(!this.props.copy) {
      return <div>Loading...</div>
    }

    const { id, video } = this.props.copy;

    return (
      <div className="ui segments">
        <div className="ui segment">
          <h2 className="ui header">
            <div className="content">
              Copy: {id + ' '}
              <Link to={`/videos/${video.id}/copies/${id}/edit`}>
                <i className="small edit icon"></i>
              </Link>
            </div>
            <div className="sub header">
              {video.title}, {video.year}
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
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
    copy: state.copy
});

const mapDispatchToProps = {
  fetchCopy
}

export default connect(mapStateToProps, mapDispatchToProps)(CopyShow);