import React from 'react';
import _ from 'lodash';
import { Link } from 'react-router-dom';

class CategoryForm extends React.Component {

  state = !this.props.category
          ? { name: '', rentalPeriod: '', rentalFee: '', dailyPenalty: '' }
          : _.pick(this.props.category, 'name', 'rentalPeriod', 'rentalFee', 'dailyPenalty');

  fields = [
    {
      name: 'name',
      label: 'Name'
    },
    {
      name: 'rentalPeriod',
      label: 'Rental period (days)'
    },
    {
      name: 'rentalFee',
      label: 'Rental fee'
    },
    {
      name: 'dailyPenalty',
      label: 'Daily penalty'
    }
  ];

  onInputChange = (key, value) => {
    this.setState({ [key]: value })
  }

  onSubmit = e => {
    e.preventDefault();
    this.setState({ submissionAttempted: true })
    const { name, rentalPeriod, rentalFee, dailyPenalty } = this.state;
    const request = { name, rentalPeriod, rentalFee, dailyPenalty };
    for(const field in request) {
      if(!request[field]) {
        return;
      }
    }
    this.props.onSubmit(request, this.props.forced);
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

  renderDeleteButton() {
    if(this.props.category) {
      return(
        <Link
            to={`/categories/delete/${this.props.category.id}`}
            className="ui button negative"
        >
          Delete
        </Link>
      )
    }
  }

  render() {
    return (
      <form onSubmit={this.onSubmit} className="ui form">
        {this.renderFields()}
        <div className="field">
          <button className="ui button primary">Submit</button>
          {this.renderDeleteButton()}
        </div>
      </form>
    );
  } 
}

export default CategoryForm;