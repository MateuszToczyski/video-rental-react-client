import React from 'react';
import { Link } from 'react-router-dom';
import Modal from '../Modal';
import history from '../../history';
import { connect } from 'react-redux';
import { fetchCopy, deleteCopy } from '../../actions/videoActions';

class CopyDelete extends React.Component {

  componentDidMount() {
    const { videoId, copyId } = this.props.match.params;
    this.props.fetchCopy(videoId, copyId);
  }

  renderActions() {
    const { id: copyId, video } = this.props.copy;
    return (
      <React.Fragment>
        <button onClick={() => this.props.deleteCopy(video.id, copyId)} className="ui button negative">Delete</button>
        <Link to={`/videos/${video.id}/copies/${copyId}/edit`} className="ui button">Cancel</Link>
      </React.Fragment>
    );
  }

  renderContent() {
    if(!this.props.copy) {
      return 'Are you sure you want to delete this copy?'
    } else {
      return `Are you sure you want to delete copy: ${this.props.copy.id}?`
    }
  }

  render() {
    if(!this.props.copy) {
      return <div>Loading...</div>
    }

    const { id: copyId, video } = this.props.copy;

    return (
      <Modal
        title="Delete copy"
        content={this.renderContent()}
        actions={this.renderActions()}
        onDismiss={() => history.push(`/videos/${video.id}/copies/${copyId}/edit`)}
      />
    );
  }
}

const mapStateToProps = state => ({
    copy: state.copy
});

const mapDispatchToProps = {
  fetchCopy,
  deleteCopy
}

export default connect(mapStateToProps, mapDispatchToProps)(CopyDelete);