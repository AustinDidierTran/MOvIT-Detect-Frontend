/**
 * @author Gabriel Boucher
 * @author Anne-Marie Desloges
 * @author Austin Didier Tran
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { ParameterActions } from '../redux/parameterReducer';
import { T } from '../utilities/translator';
import PreventPermission from '../components/preventPermission';
import SubmitButtons from '../components/submitButtons';

class Parameters extends Component {
  static propTypes = {
    language: PropTypes.string.isRequired,
    history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
    header: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    changeDataAgreement: PropTypes.func,
    dataAgreement: PropTypes.bool,
    dataDisagreePeriod: PropTypes.string,
    changeLightAgreement: PropTypes.func,
    lightAgreement: PropTypes.bool,
    lightDisagreePeriod: PropTypes.string,
    changeDataDisagreePeriod: PropTypes.func,
    changeLightDisagreePeriod: PropTypes.func,
    changeNotificationDisagreePeriod: PropTypes.func,
    changeNotificationAgreement: PropTypes.func,
    notificationAgreement: PropTypes.bool,
    notificationDisagreePeriod: PropTypes.string,
  };

  save() {
    const data = {
      dataAgreement: this.props.dataAgreement,
      dataDisagreePeriod: this.props.dataDisagreePeriod,
      lightAgreement: this.props.lightAgreement,
      lightDisagreePeriod: this.props.lightDisagreePeriod,
      notificationAgreement: this.props.notificationAgreement,
      notificationDisagreePeriod: this.props.notificationDisagreePeriod,
    };
    axios.post(`${URL}configuration`, data, this.props.header)
      .then(() => this.props.history.push('/goals'))
      .catch(error => console.log(error));
  }

  cancel() {
    console.log('clear all');
  }

  render() {
    const style = {
      height: '80vh',
      content: {
        textAlign: 'center',
      },
      spaceTop: {
        marginTop: '2em',
      },
    };

    return (
      <div style={style}>
        <legend className="text-center header"><h2>{T.translate(`parameters.${this.props.language}`)}</h2></legend>
        <div className="col-sm-2" />
        <div className="col-sm-8">
          <PreventPermission
            permission={this.props.dataAgreement}
            permissionTitle={T.translate(`parameters.dataAgreement.${this.props.language}`)}
            period={this.props.dataDisagreePeriod}
            onPermissionChange={this.props.changeDataAgreement}
            onPeriodChange={this.props.changeDataDisagreePeriod}
          />
          <PreventPermission
            permission={this.props.lightAgreement}
            permissionTitle={T.translate(`parameters.lightAgreement.${this.props.language}`)}
            period={this.props.lightDisagreePeriod}
            onPermissionChange={this.props.changeLightAgreement}
            onPeriodChange={this.props.changeLightDisagreePeriod}
          />
          <PreventPermission
            permission={this.props.notificationAgreement}
            permissionTitle={T.translate(`parameters.notificationAgreement.${this.props.language}`)}
            period={this.props.notificationDisagreePeriod}
            onPermissionChange={this.props.changeNotificationAgreement}
            onPeriodChange={this.props.changeNotificationDisagreePeriod}
          />
        </div>
        <SubmitButtons
          onSave={this.save.bind(this)}
          onCancel={this.cancel}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    language: state.applicationReducer.language,
    header: state.applicationReducer.header,
    dataAgreement: state.parameterReducer.dataAgreement,
    lightAgreement: state.parameterReducer.lightAgreement,
    notificationAgreement: state.parameterReducer.notificationAgreement,
    dataDisagreePeriod: state.parameterReducer.dataDisagreePeriod,
    lightDisagreePeriod: state.parameterReducer.lightDisagreePeriod,
    notificationDisagreePeriod: state.parameterReducer.notificationDisagreePeriod,

  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    changeDataAgreement: ParameterActions.changeDataAgreement,
    changeLightAgreement: ParameterActions.changeLightAgreement,
    changeNotificationAgreement: ParameterActions.changeNotificationAgreement,
    changeDataDisagreePeriod: ParameterActions.changeDataDisagreePeriod,
    changeLightDisagreePeriod: ParameterActions.changeLightDisagreePeriod,
    changeNotificationDisagreePeriod: ParameterActions.changeNotificationDisagreePeriod,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Parameters);
