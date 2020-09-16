import React from 'react';
import { connect } from 'react-redux';
import { fetchVideos } from '../../actions/videoActions';

class VideoSelect extends React.Component {

  state = {
    searchTerm: ''
  }

  componentDidMount() {
    this.props.fetchVideos();
  }

  availableCopiesCount = video => {
    if(!video) {
      return;
    }
    const availableCopies = video.copies.filter(copy => copy.available === true);
    return availableCopies.length;
  }

  renderList() {
    const { searchTerm } = this.state;

    const availableVideos = this.props.videos
      .filter(video => video.title.toLowerCase().includes(searchTerm.toLowerCase()))
      .filter(video => this.availableCopiesCount(video) > 0);

    if(availableVideos.length === 0) {
      return <div className="ui message">
        No available copies! (to add a new copy, go to: Videos -&gt; [Select video] -&gt; New)
      </div>
    }

    return availableVideos.map(video => {
        return (
          <div
              onClick={() => this.props.onVideoSelect(video)}
              className="item"
              key={video.id}
          >
            <div className="content">
              <div className="header">
                {video.title}
              </div>
              <div className="description">
                Available copies: {this.availableCopiesCount(video)}
              </div>
            </div>
          </div>
        );
    });
  }

  render() {
    return (
      <div className="ui segment">
        <h3 className="ui header">Select a video</h3>
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
      </div>
    );
  }
}

const mapStateToProps = state => ({
    videos: Object.values(state.videos)
});

export default connect(mapStateToProps, { fetchVideos })(VideoSelect);