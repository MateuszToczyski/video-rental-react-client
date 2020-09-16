import React from 'react';
import { fetchVideo, updateVideo } from '../../actions/videoActions';
import { connect } from 'react-redux';
import VideoForm from './VideoForm';

class VideoEdit extends React.Component {

  componentDidMount() {
    this.props.fetchVideo(this.props.match.params.id);
  }

  onSubmit = formValues => {
    this.props.updateVideo(this.props.match.params.id, formValues);
  }

  render() {
    if(!this.props.video) {
      return <div>Loading...</div>
    }

    return (
      <div className="ui segment">
        <h3>Edit video</h3>
        <VideoForm
          type="edit"
          video={this.props.video}
          onSubmit={this.onSubmit} />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  video: state.videos[ownProps.match.params.id]
});

const mapDispatchToProps = {
  fetchVideo,
  updateVideo
};

export default connect(mapStateToProps, mapDispatchToProps)(VideoEdit);