import React from 'react';
import { connect } from 'react-redux';
import { fetchCustomer } from '../../actions/customerActions';
import VideoSelect from './VideoSelect';
import RentalConfirm from './RentalConfirm';

class RentalCreate extends React.Component {

  state = { selectedVideo: null }

  componentDidMount() {
    this.props.fetchCustomer(this.props.match.params.id);
  }

  onVideoSelect = selectedVideo => {
    this.setState({ selectedVideo });
  }

  render() {
    if(!this.props.customer) {
      return <div>Loading...</div>
    }

    if(this.state.selectedVideo) {
      return (
        <RentalConfirm
            video={this.state.selectedVideo}
            customer={this.props.customer}
            onVideoSelect={this.onVideoSelect}
        />
      )
    } else {
      return <VideoSelect onVideoSelect={this.onVideoSelect} />
    }
  }
}

const mapStateToProps = (state, ownProps) => ({
  customer: state.customers[ownProps.match.params.id]
});

const mapDispatchToProps = {
  fetchCustomer
}

export default connect(mapStateToProps, mapDispatchToProps)(RentalCreate);