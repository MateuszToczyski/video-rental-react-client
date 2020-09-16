import React from 'react';
import { connect } from 'react-redux';
import { fetchCategories } from '../../actions/categoryActions';
import { Link } from 'react-router-dom';

class CategoryList extends React.Component {

  state = {
    searchTerm: ''
  }

  componentDidMount() {
    this.props.fetchCategories();
  }

  renderList() {
    const { searchTerm } = this.state;
    return this.props.categories
      .filter(category => category.name.toLowerCase().includes(searchTerm.toLowerCase()))
      .map(category => {
        return (
          <Link to={`/categories/edit/${category.id}`} className="item" key={category.id}>
            <div className="content">
              <div className="header">
                {category.name}
              </div>
              <div className="description">
                Fee: ${category.rentalFee}, Rental period: {category.rentalPeriod} day(s)
              </div>
            </div>
          </Link>
        );
    });
  }

  renderCreateButton() {
    return (
      <div style={{ textAlign: 'right' }}>
        <Link to="/categories/new" className="ui button primary">
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
    categories: Object.values(state.categories)
});

export default connect(mapStateToProps, { fetchCategories })(CategoryList);