import React from 'react';
import { Link } from 'react-router-dom';

class GroupForm extends React.Component {

  constructor(props) {
    super(props);
    if(!props.group) {
      this.state = { name: '', discount: '0%' }
    } else {
      const { name, discount } = props.group;
      this.state = { name, discount: discount * 100 + '%' }
    }
  }

  fields = [
    {
      name: 'name',
      label: 'Name'
    },
    {
      name: 'discount',
      label: 'Discount'
    }
  ];

  discountRequestFormat(discount) {
    if(discount.toString().charAt(discount.length - 1) === '%') {
      discount = discount.replace('%', '') / 100;
    }
    return discount;
  }

  onInputChange = (key, value) => {
    this.setState({ [key]: value })
  }

  onSubmit = e => {
    e.preventDefault();
    this.setState({ submissionAttempted: true })
    const request = {
      name: this.state.name,
      discount: this.discountRequestFormat(this.state.discount)
    }
    for(const field in request) {
      if(request[field] === undefined || request[field].toString() === '') {
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
    if(this.props.group) {
      return(
        <Link
            to={`/groups/delete/${this.props.group.id}`}
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

export default GroupForm;