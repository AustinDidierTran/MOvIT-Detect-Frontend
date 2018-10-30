/**
 * @author Gabriel Boucher
 * @author Anne-Marie Desloges
 * @author Austin-Didier Tran
 * @author Benjamin Roy
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { T } from '../utilities/translator';

class SumbitButtons extends Component {
  static propTypes = {
    language: PropTypes.string.isRequired,
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
  };

  render() {
    return (
      <div className="col-10 offset-1 offset-md-0 text-right py-3">
        <button id="cancelButton" onClick={() => this.props.onCancel()} className="btn btn-lg mb-2 mb-sm-0">
          {T.translate(`cancel.${this.props.language}`)}
        </button>
        &nbsp;
        <button id="saveButton" onClick={() => this.props.onSave()} className="btn btn-lg mb-2 mb-sm-0">
          {T.translate(`save.${this.props.language}`)}
        </button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    language: state.applicationReducer.language,
  };
}
export default connect(mapStateToProps)(SumbitButtons);
