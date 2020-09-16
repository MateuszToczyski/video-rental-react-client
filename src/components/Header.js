import React from 'react';
import { Link } from 'react-router-dom';

class Header extends React.Component {

  state = {
    activeItem: window.location.pathname.split('/')[1] || 'customers'
  }

  links = [
    {
      to: '/',
      name: 'customers',
      text: 'Customers'
    },
    {
      to: '/groups',
      name: 'groups',
      text: 'Groups'
    },
    {
      to: '/videos',
      name: 'videos',
      text: 'Videos'
    },
    {
      to: '/categories',
      name: 'categories',
      text: 'Categories'
    }
  ];

  headerItemClass(item) {
    if(item === this.state.activeItem) {
      return 'item active';
    } else {
      return 'item';
    }
  }

  renderLinks() {
    return this.links.map(link => {
      return (
        <Link
            key={link.name}
            to={link.to}
            className={this.headerItemClass(link.name)}
            onClick={() => this.setState({ activeItem: link.name })}
        >
          {link.text}
        </Link>
      );
    })
  }

  render() {
    return (
      <div className="ui secondary pointing menu">
        <a href="/" className="item">
          <i className="video icon"></i>
          VideoRental
        </a>
        {this.renderLinks()}
      </div>
    )
  }
}

export default Header;