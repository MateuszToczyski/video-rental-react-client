import React from 'react';
import { Link } from 'react-router-dom';
import Modal from '../Modal';
import history from '../../history';
import { connect } from 'react-redux';
import { fetchCategory, deleteCategory } from '../../actions/categoryActions';

class CategoryDelete extends React.Component {

  componentDidMount() {
    this.props.fetchCategory(this.props.match.params.id);
  }

  renderActions() {
    const { id } = this.props.match.params;
    return (
      <React.Fragment>
        <button onClick={() => this.props.deleteCategory(id)} className="ui button negative">Delete</button>
        <Link to={`/categories/edit/${this.props.category.id}`} className="ui button">Cancel</Link>
      </React.Fragment>
    );
  }

  renderContent() {
    if(!this.props.category) {
      return 'Are you sure you want to delete this category?'
    } else {
      return `Are you sure you want to delete category: ${this.props.category.name}?`
    }
  }

  render() {
    if(!this.props.category) {
      return <div>Loading...</div>
    }

    return (
      <Modal
        title="Delete category"
        content={this.renderContent()}
        actions={this.renderActions()}
        onDismiss={() => history.push(`/categories/edit/${this.props.category.id}`)}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
    category: state.categories[ownProps.match.params.id]
});

const mapDispatchToProps = {
  fetchCategory,
  deleteCategory
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryDelete);