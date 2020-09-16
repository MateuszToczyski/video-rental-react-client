import React from 'react';
import { fetchGroup, updateGroup } from '../../actions/groupActions';
import { connect } from 'react-redux';
import GroupForm from './GroupForm';

class GroupEdit extends React.Component {

  componentDidMount() {
    this.props.fetchGroup(this.props.match.params.id);
  }

  onSubmit = formValues => {
    this.props.updateGroup(this.props.match.params.id, formValues);
  }

  render() {
    if(!this.props.group) {
      return <div>Loading...</div>
    }

    return (
      <div className="ui segment">
        <h3>Edit group</h3>
        <GroupForm
          group={this.props.group}
          onSubmit={this.onSubmit}
          forced={false}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  group: state.groups[ownProps.match.params.id]
});

const mapDispatchToProps = {
  fetchGroup,
  updateGroup
};

export default connect(mapStateToProps, mapDispatchToProps)(GroupEdit);