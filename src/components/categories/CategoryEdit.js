import React from 'react';
import { fetchCategory, updateCategory } from '../../actions/categoryActions';
import { connect } from 'react-redux';
import CategoryForm from './CategoryForm';

class CategoryEdit extends React.Component {

  componentDidMount() {
    this.props.fetchCategory(this.props.match.params.id);
  }

  onSubmit = formValues => {
    this.props.updateCategory(this.props.match.params.id, formValues);
  }

  render() {
    if(!this.props.category) {
      return <div>Loading...</div>
    }

    return (
      <div className="ui segment">
        <h3>Edit category</h3>
        <CategoryForm
          category={this.props.category}
          onSubmit={this.onSubmit}
          forced={false}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  category: state.categories[ownProps.match.params.id]
});

const mapDispatchToProps = {
  fetchCategory,
  updateCategory
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryEdit);