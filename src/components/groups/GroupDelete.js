import React from 'react';
import { Link } from 'react-router-dom';
import Modal from '../Modal';
import history from '../../history';
import { connect } from 'react-redux';
import { fetchGroup, deleteGroup } from '../../actions/groupActions';

class GroupDelete extends React.Component {

  componentDidMount() {
    this.props.fetchGroup(this.props.match.params.id);
  }

  renderActions() {
    const { id } = this.props.match.params;
    return (
      <React.Fragment>
        <button onClick={() => this.props.deleteGroup(id)} className="ui button negative">Delete</button>
        <Link to={`/groups/edit/${this.props.group.id}`} className="ui button">Cancel</Link>
      </React.Fragment>
    );
  }

  renderContent() {
    if(!this.props.group) {
      return 'Are you sure you want to delete this group?'
    } else {
      return `Are you sure you want to delete group: ${this.props.group.name}?`
    }
  }

  render() {
    if(!this.props.group) {
      return <div>Loading...</div>
    }

    return (
      <Modal
        title="Delete group"
        content={this.renderContent()}
        actions={this.renderActions()}
        onDismiss={() => history.push(`/groups/edit/${this.props.group.id}`)}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
    group: state.groups[ownProps.match.params.id]
})

const mapDispatchToProps = {
  fetchGroup,
  deleteGroup
}

export default connect(mapStateToProps, mapDispatchToProps)(GroupDelete);