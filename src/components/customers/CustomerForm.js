import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { fetchGroups } from '../../actions/groupActions';
import { Link } from 'react-router-dom';

class CustomerForm extends React.Component {

  state = !this.props.customer
          ? { name: '', address: '', group: null }
          : _.pick(this.props.customer, 'name', 'address', 'group');

  fields = [
    {
      name: 'name',
      label: 'Name'
    },
    {
      name: 'address',
      label: 'Address'
    }
  ];

  componentDidMount = async() => {
    await this.props.fetchGroups();
    if(!this.state.group) {
      this.setState({ group: this.props.groups[0] })
    }
  }

  onInputChange = (key, value) => {
    this.setState({ [key]: value })
  }

  onGroupSelectChange = e => {
    const group = this.props.groups.find(g => g.id == e.target.value);
    this.setState({ group });
  }

  onSubmit = e => {
    e.preventDefault();
    this.setState({ submissionAttempted: true })
    const { name, address, group } = this.state;
    const request = { name, address, groupId: group.id }
    for(const field in request) {
      if(!request[field]) {
        return;
      }
    }
    this.props.onSubmit(request);
  }

  getGroupId = () => {
    if(this.state.group) {
      return this.state.group.id;
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
    return this.props.groups.map(group => {
      return (
        <option key={group.id} value={group.id}>
          {group.name}
        </option>
      );
    })
  }

  renderDeleteButton() {
    if(this.props.customer) {
      return(
        <Link
            to={`/customers/delete/${this.props.customer.id}`}
            className="ui button negative"
        >
          Delete
        </Link>
      )
    }
  }

  render() {
    if(this.props.groups.length === 0) {
      return (
        <Link to='/groups/new/forced' className="text">
          <h4> First click here to create a group!</h4>
        </Link>
      )
    }
    return (
      <form onSubmit={this.onSubmit} className="ui form">
        {this.renderFields()}
        <div className="field">
          <label>Group</label>
          <select
              className="ui fluid dropdown"
              value={this.getGroupId()}
              onChange={this.onGroupSelectChange}
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
  groups: Object.values(state.groups)
});

const mapDispatchToProps = {
  fetchGroups
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomerForm);