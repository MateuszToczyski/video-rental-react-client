import React from 'react';
import { dismissError } from '../actions/errorActions';
import { connect } from 'react-redux';

class ErrorNotifier extends React.Component {

  render() {
    if(!this.props.error) {
      return null;
    }

    return (
      <div className="ui red message">
        <i onClick={this.props.dismissError} className="close icon"></i>
        {this.props.error}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  error: state.error
});

const mapDispatchToProps = {
  dismissError
}

export default connect(mapStateToProps, mapDispatchToProps)(ErrorNotifier);