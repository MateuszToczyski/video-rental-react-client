import React from 'react';
import { connect } from 'react-redux';
import { fetchVideos } from '../../actions/videoActions';
import { Link } from 'react-router-dom';

class VideoList extends React.Component {

  state = {
    searchTerm: ''
  }

  componentDidMount() {
    this.props.fetchVideos();
  }

  renderList() {
    const { searchTerm } = this.state;
    return this.props.videos
      .filter(video => video.title.toLowerCase().includes(searchTerm.toLowerCase()))
      .map(video => {
        return (
          <Link to={`/videos/${video.id}`} className="item" key={video.id}>
            <div className="content">
              <div className="header">
                {video.title}
              </div>
              <div className="description">
                Category: {video.category.name}
              </div>
            </div>
          </Link>
        );
    });
  }

  renderCreateButton() {
    return (
      <div style={{ textAlign: 'right' }}>
        <Link to="/videos/new" className="ui button primary">
          New
        </Link>
      </div>
    );
  }

  render() {
    return (
      <div>
        <div className="ui fluid icon input">
          <input
              value={this.state.searchTerm}
              placeholder="Search..."
              onChange={e => this.setState({ searchTerm: e.target.value })}
          />
          <i className="search icon"></i>
        </div>
        <div className="ui selection list">
          {this.renderList()}
        </div>
        {this.renderCreateButton()}
      </div>
    );
  }
}

const mapStateToProps = state => ({
    videos: Object.values(state.videos)
});

export default connect(mapStateToProps, { fetchVideos })(VideoList);