import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { createVideo, fetchImdbVideo } from '../../actions/videoActions';
import { fetchCategories } from '../../actions/categoryActions';
import VideoForm from './VideoForm';

class VideoCreate extends React.Component {

  state = { searchTerm: '', userControl: false }

  componentDidMount() {
    this.props.fetchCategories();
  }

  onSubmit = formValues => {
    this.props.createVideo(formValues);
  }

  submitSearch = e => {
    e.preventDefault();
    if(this.state.searchTerm) {
      this.props.fetchImdbVideo(this.state.searchTerm);
    }
  }

  onUserControlToggle = () => {
    this.setState({ userControl: true })
  }

  renderImdbSearch() {
    if(this.state.userControl || this.props.categories.length === 0) {
      return null;
    }

    return (
      <div className="ui segment">
        <form className="ui form" onSubmit={this.submitSearch}>
          <div className="inline field">
            <input
                placeholder="Title"
                value={this.state.searchTerm}
                onChange={e => this.setState({ searchTerm: e.target.value })}
            ></input>
            <button className="ui button basic primary">
              Search IMDB
            </button>
          </div>
        </form>
      </div>
    )
  }

  renderForm() {
    let video = null;
    const { imdbVideo } = this.props;
    if(imdbVideo && imdbVideo.title) {
      video = _.pick(imdbVideo, 'title', 'year', 'director')
    }
    return (
      <div className="ui segment">
        <VideoForm
            onSubmit={this.onSubmit}
            onUserControlToggle={this.onUserControlToggle}
            video={video}
            type="create"
        />
      </div>
    )
  }

  render() {
    return (
      <div className="ui segments">
        <div className="ui segment">
          <h3>New video</h3>
        </div>
        {this.renderImdbSearch()}
        {this.renderForm()}
      </div>
    );
  } 
}

const mapStateToProps = state => ({
  imdbVideo: state.imdbVideo,
  categories: Object.values(state.categories)
});

const mapDispatchToProps = {
  createVideo,
  fetchImdbVideo,
  fetchCategories
}

export default connect(mapStateToProps, mapDispatchToProps)(VideoCreate);