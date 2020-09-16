import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

const Modal = props => {
  if(props.error) {
    props.onDismiss();
    return null;
  }
  
  return ReactDOM.createPortal(
    <div onClick={props.onDismiss} className="ui dimmer modals visible active">
      <div onClick={e => e.stopPropagation()} className="ui standard modal visible active">
        <div className="header">
          {props.title}
        </div>
        <div className="content">
          {props.content}
        </div>
        <div className="actions">
          {props.actions}
        </div>
      </div>
    </div>,
    document.querySelector('#modal')
  );
};

const mapStateToProps = state => ({
  error: state.error
});

export default connect(mapStateToProps)(Modal);