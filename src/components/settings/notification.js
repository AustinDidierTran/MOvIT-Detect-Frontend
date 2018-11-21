/**
 * @author Gabriel Boucher
 * @author Anne-Marie Desloges
 * @author Austin-Didier Tran
 * @author Benjamin Roy
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from 'primereact/components/button/Button';
import { URL } from '../../redux/applicationReducer';
import { T } from '../../utilities/translator';
import { get } from '../../utilities/secureHTTP';
import Countdown from '../popups/countdown';

class Notification extends Component {
  static propTypes = {
    language: PropTypes.string.isRequired,
    header: PropTypes.object,
  }

  constructor(props) {
    super(props);
    this.state = {
      showCountdown: false,
    };
    this.calibrationCompleted = this.calibrationCompleted.bind(this);
  }

  async turnOnNotification() {
    const response = await get(`${URL}alert?State=on`);
    console.log(response);
  }

  async turnOffNotification() {
    const response = await get(`${URL}alert?State=off`);
    console.log(response);
  }

  async calibrate() {
    await get(`${URL}calibrate`);
    this.setState({ ...this.state, showCountdown: true });
    console.log(this);
  }

  calibrationCompleted() {
    this.setState({ ...this.state, showCountdown: false });
  }

  render() {
    return (
      <div className="row ml-2 mt-5">
        <div className="mb-2 mr-3">
          <Button
            id="calibrate-button"
            type="button"
            onClick={() => this.calibrate()}
            className="p-button-secondary"
            label={T.translate(`calibrate.${this.props.language}`)}
          />
        </div>
        <div className="mr-3 mb-2">
          <Button
            id="turn-on-button"
            type="button"
            onClick={() => this.turnOnNotification()}
            className="p-button-secondary"
            label={T.translate(`alert.on.${this.props.language}`)}
          />
        </div>
        <div className="mr-3 mb-2">
          <Button
            id="turn-off-button"
            type="button"
            onClick={() => this.turnOffNotification()}
            className="p-button-secondary"
            label={T.translate(`alert.off.${this.props.language}`)}
          />
        </div>
        {this.state.showCountdown
          && (
          <Countdown
            time={10}
            title={T.translate(`calibrating.${this.props.language}`)}
            onComplete={this.calibrationCompleted}
          />
          )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    language: state.applicationReducer.language,
    header: state.applicationReducer.header,
  };
}

export default connect(mapStateToProps)(Notification);
