import React from 'react';
import { connect } from 'react-redux';
import { fetchVideo, createCopy } from '../../actions/videoActions';
import { Link } from 'react-router-dom';

class VideoShow extends React.Component {

  componentDidMount() {
    this.props.fetchVideo(this.props.match.params.id);
  }

  renderCopyList() {
    if(!this.props.video || !this.props.video.copies) {
      return null;
    }
    return this.props.video.copies.map(copy => {
      return (
        <Link
            to={`/videos/${this.props.video.id}/copies/${copy.id}`}
            className="item"
            key={copy.id}
        >
          <div className="content">
            <div className="header">
              ID: {copy.id}
            </div>
            <div className="description">
              {copy.available ? 'AVAILABLE' : 'RENTED'}
            </div>
          </div>
        </Link>
      )
    })
  }

  render() {
    if(!this.props.video) {
      return <div>Loading...</div>
    }

    const { id, title, year, director, category } = this.props.video;

    return (
      <div className="ui segments">
        <div className="ui segment">
          <h2 className="ui header">
            <div className="content">
              {title + ' '}
              <Link to={`/videos/edit/${id}`}>
                <i className="small edit icon"></i>
              </Link>
            </div>
            <div className="sub header">
              {year}, {director}, {category.name}
            </div>
          </h2>
        </div>
        <div className="ui segment">
          <div className="ui header">
            Copies
          </div>
          <div className="ui selection list">
            {this.renderCopyList()}
          </div>
          <button
              onClick={() => this.props.createCopy(this.props.video.id)}
              className="ui button primary"
          >
            New
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
    video: state.videos[ownProps.match.params.id]
});

const mapDispatchToProps = {
  fetchVideo,
  createCopy
}

export default connect(mapStateToProps, mapDispatchToProps)(VideoShow);