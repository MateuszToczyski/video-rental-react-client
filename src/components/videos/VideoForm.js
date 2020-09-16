import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { fetchCategories } from '../../actions/categoryActions';
import { Link } from 'react-router-dom';

class VideoForm extends React.Component {

  state = !this.props.video
          ? { title: '', year: '', director: '', category: null }
          : _.pick(this.props.video, 'title', 'year', 'director', 'category');

  fields = [
    {
      name: 'title',
      label: 'Title'
    },
    {
      name: 'year',
      label: 'Year'
    },
    {
      name: 'director',
      label: 'Director'
    }
  ];

  videoDetails = this.props.video;
  userControl = false;

  componentDidMount = async() => {
    await this.props.fetchCategories();
    if(!this.state.category) {
      this.setState({ category: this.props.categories[0] })
    }
  }

  componentDidUpdate() {
    const { video } = this.props;
    if(this.userControl || !video || this.videoDetails === video) {
      return;
    }
    this.videoDetails = video;
    for(const field in video) {
      if(this.state[field] !== video[field]) {
        this.setState({ [field]: video[field] })
      }
    }
  }

  toggleUserControl() {
    this.userControl = true;
    if(this.props.type === 'create') {
      this.props.onUserControlToggle();
    }
  }

  onInputChange = (key, value) => {
    this.toggleUserControl();
    this.setState({ [key]: value })
  }

  onCategorySelectChange = e => {
    this.toggleUserControl();
    const category = this.props.categories.find(g => g.id == e.target.value);
    this.setState({ category });
  }

  onSubmit = e => {
    e.preventDefault();
    this.setState({ submissionAttempted: true })
    const { title, year, director, category } = this.state;
    const request = {
      title,
      year,
      director,
      categoryId: category.id
    }
    for(const field in request) {
      if(!request[field]) {
        return;
      }
    }
    this.props.onSubmit(request);
  }

  getCategoryId = () => {
    if(this.state.category) {
      return this.state.category.id;
    } else {
      return '';
    }
  }

  renderFields() {
    return this.fields.map(field => {
      const value = this.state[field.name];
      const { submissionAttempted } = this.state;
      const error = !value && submissionAttempted ? 'error' : '';
      return (
        <div className={`field ${error}`} key={field.name}>
          <label>{field.label}</label>
          <input
              type="text"
              autoComplete="off"
              value={this.state[field.name]}
              onChange={e => this.onInputChange(field.name, e.target.value)}
          />
        </div>
      );
    });
  }

  renderOptions() {
    return this.props.categories.map(category => {
      return (
        <option key={category.id} value={category.id}>
          {category.name}
        </option>
      );
    })
  }

  renderDeleteButton() {
    if(this.props.video && this.props.type !== 'create') {
      return(
        <Link
            to={`/videos/delete/${this.props.video.id}`}
            className="ui button negative"
        >
          Delete
        </Link>
      )
    }
  }

  render() {
    if(this.props.categories.length === 0) {
      return (
        <Link to='/categories/new/forced' className="text">
          <h4> First click here to create a category!</h4>
        </Link>
      )
    }
    return (
      <form onSubmit={this.onSubmit} className="ui form">
        {this.renderFields()}
        <div className="field">
          <label>Category</label>
          <select
              className="ui fluid dropdown"
              value={this.getCategoryId()}
              onChange={this.onCategorySelectChange}
          >
            {this.renderOptions()}
          </select>
        </div>
        <div className="field">
          <button className="ui button primary">Submit</button>
          {this.renderDeleteButton()}
        </div>
      </form>
    );
  } 
}

const mapStateToProps = state => ({
  categories: Object.values(state.categories)
});

const mapDispatchToProps = {
  fetchCategories
}

export default connect(mapStateToProps, mapDispatchToProps)(VideoForm);