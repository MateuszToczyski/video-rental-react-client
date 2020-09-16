import React from 'react';
import { fetchCopy, deleteCopy } from '../../actions/videoActions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class CopyEdit extends React.Component {

  componentDidMount() {
    const { videoId, copyId } = this.props.match.params;
    this.props.fetchCopy(videoId, copyId);
  }

  render() {
    if(!this.props.copy) {
      return <div>Loading...</div>
    }

    const { id, video } = this.props.copy;

    return (
      <div className="ui segment">
        <h3 className="ui header">
          <div className="content">Edit copy: {id}</div>
          <div className="sub header">Copy of: {video.title}</div>
        </h3>
        <Link
            to={`/videos/${video.id}/copies/${id}/delete`}
            className="ui button negative"
        >
          Delete
        </Link>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  copy: state.copy
});

const mapDispatchToProps = {
  fetchCopy,
  deleteCopy
};

export default connect(mapStateToProps, mapDispatchToProps)(CopyEdit);