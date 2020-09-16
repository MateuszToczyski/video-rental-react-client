import React from 'react';
import { connect } from 'react-redux';
import { createGroup } from '../../actions/groupActions';
import GroupForm from './GroupForm';

class GroupCreate extends React.Component {

  onSubmit = (formValues, forced) => {
    this.props.createGroup(formValues, forced);
  }

  render() {
    return (
      <div className="ui segment">
        <h3>New group</h3>
        <GroupForm onSubmit={this.onSubmit} forced={this.props.forced} />
      </div>
    );
  } 
}

export default connect(null, { createGroup })(GroupCreate);