import React from 'react';
import { Link } from 'react-router-dom';
import Modal from '../Modal';
import history from '../../history';
import { connect } from 'react-redux';
import { fetchVideo, deleteVideo } from '../../actions/videoActions';

class VideoDelete extends React.Component {

  componentDidMount() {
    this.props.fetchVideo(this.props.match.params.id);
  }

  renderActions() {
    const { id } = this.props.match.params;
    return (
      <React.Fragment>
        <button onClick={() => this.props.deleteVideo(id)} className="ui button negative">Delete</button>
        <Link to={`/videos/edit/${this.props.video.id}`} className="ui button">Cancel</Link>
      </React.Fragment>
    );
  }

  renderContent() {
    if(!this.props.video) {
      return 'Are you sure you want to delete this video?'
    } else {
      return `Are you sure you want to delete video: ${this.props.video.title}?`
    }
  }

  render() {
    if(!this.props.video) {
      return <div>Loading...</div>
    }

    return (
      <Modal
        title="Delete video"
        content={this.renderContent()}
        actions={this.renderActions()}
        onDismiss={() => history.push(`/videos/edit/${this.props.video.id}`)}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
    video: state.videos[ownProps.match.params.id]
});

const mapDispatchToProps = {
  fetchVideo,
  deleteVideo
}

export default connect(mapStateToProps, mapDispatchToProps)(VideoDelete);