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
import ConfirmationPopup from '../popups/confirmationPopup';

class Notification extends Component {
  static propTypes = {
    language: PropTypes.string.isRequired,
    header: PropTypes.object,
  }

  constructor(props) {
    super(props);
    this.state = {
      showCountdownMat: false,
      showCountdownIMU: false,
    };
    this.matCalibrationCompleted = this.matCalibrationCompleted.bind(this);
    this.IMUCalibrationCompleted = this.IMUCalibrationCompleted.bind(this);
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
    this.setState({ ...this.state, showCountdownMat: true });
  }

  async calibrateIMU() {
    await get(`${URL}calibrateIMU`);
    this.setState({ ...this.state, showCountdownIMU: true });
  }

  matCalibrationCompleted() {
    this.setState({ ...this.state, showCountdownMat: false });
  }

  IMUCalibrationCompleted() {
    this.setState({ ...this.state, showCountdownIMU: false });
  }

  openModal() {
    this.setState({ isPopupOpened: true });
  }

  closeModal() {
    this.setState({ isPopupOpened: false });
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
          <div className="mr-3 mb-2">
            <Button
              id="calibrateIMU-button"
              type="button"
              onClick={() => this.openModal()}
              className="btn btn-lg"
              label={T.translate(`calibrateIMU.${this.props.language}`)}
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
          {this.state.showCountdownMat
          && (
            <Countdown
              time={10}
              title={T.translate(`calibrating.${this.props.language}`)}
              onComplete={this.matCalibrationCompleted}
            />
          )}
          {this.state.showCountdownIMU
          && (
            <Countdown
              time={120}
              title={T.translate(`calibrating.${this.props.language}`)}
              onComplete={this.IMUCalibrationCompleted}
            />
          )}
          <ConfirmationPopup
            title={T.translate(`calibrateIMU.title.${this.props.language}`)}
            body={T.translate(`calibrateIMU.confirmation.${this.props.language}`)}
            show={this.state.isPopupOpened}
            onConfirm={() => this.calibrateIMU()}
            onClose={() => this.closeModal()}
          />
        </div>
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
