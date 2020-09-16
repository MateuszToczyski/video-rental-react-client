import React from 'react';
import { connect } from 'react-redux';
import { createCategory } from '../../actions/categoryActions';
import CategoryForm from './CategoryForm';

class CategoryCreate extends React.Component {

  onSubmit = (formValues, forced) => {
    this.props.createCategory(formValues, forced);
  }

  render() {
    return (
      <div className="ui segment">
        <h3>New category</h3>
        <CategoryForm onSubmit={this.onSubmit} forced={this.props.forced} />
      </div>
    );
  } 
}

export default connect(null, { createCategory })(CategoryCreate);