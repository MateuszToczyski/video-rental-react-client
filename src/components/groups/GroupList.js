import React from 'react';
import { connect } from 'react-redux';
import { fetchGroups } from '../../actions/groupActions';
import { Link } from 'react-router-dom';

class GroupList extends React.Component {

  state = {
    searchTerm: ''
  }

  componentDidMount() {
    this.props.fetchGroups();
  }

  renderList() {
    const { searchTerm } = this.state;
    return this.props.groups
      .filter(group => group.name.toLowerCase().includes(searchTerm.toLowerCase()))
      .map(group => {
        return (
          <Link to={`/groups/edit/${group.id}`} className="item" key={group.id}>
            <div className="content">
              <div className="header">
                {group.name}
              </div>
              <div className="description">
                Discount: {group.discount * 100 + '%'}
              </div>
            </div>
          </Link>
        );
    });
  }

  renderCreateButton() {
    return (
      <div style={{ textAlign: 'right' }}>
        <Link to="/groups/new" className="ui button primary">
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
    groups: Object.values(state.groups)
})

export default connect(mapStateToProps, { fetchGroups })(GroupList);