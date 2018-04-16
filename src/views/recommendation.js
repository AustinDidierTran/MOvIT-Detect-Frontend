import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Checkbox } from 'primereact/components/checkbox/Checkbox';
import axios from 'axios';
import { RecommendationActions } from '../redux/recommendationReducer';
import { T } from '../utilities/translator';
import AngleRecommendation from '../components/angleRecommendation';
import TextRecommendation from '../components/textRecommendation';
import OtherRecommendation from '../components/otherRecommendation';
import SubmitButtons from '../components/submitButtons';
import TiltSliders from '../components/tiltSliders';
import { URL } from '../redux/applicationReducer';

class Recommendation extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
    language: PropTypes.string.isRequired,
    header: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    swellingRecommendation: PropTypes.string,
    painRecommendation: PropTypes.string,
    restRecommendation: PropTypes.string,
    transferRecommendation: PropTypes.string,
    comfortRecommendation: PropTypes.string,
    otherRecommendations: PropTypes.string,
    maxAngle: PropTypes.number,
    reduceWeight: PropTypes.bool,
    tiltFrequencyWeight: PropTypes.number.isRequired,
    tiltLengthWeight: PropTypes.number.isRequired,
    tiltAngleWeight: PropTypes.number.isRequired,
    reduceSlidingMoving: PropTypes.bool.isRequired,
    tiltAngleMoving: PropTypes.number.isRequired,
    tiltAngleRest: PropTypes.number.isRequired,
    allowRest: PropTypes.bool.isRequired,
    easeTransfers: PropTypes.bool.isRequired,
    improveComfort: PropTypes.bool.isRequired,
    other: PropTypes.bool.isRequired,
    otherRecommendationsTitle: PropTypes.string,
    reduceSlidingRest: PropTypes.bool.isRequired,
    reduceSwelling: PropTypes.bool.isRequired,
    reducePain: PropTypes.bool.isRequired,
    changeReduceWeight: PropTypes.func.isRequired,
    changeReduceSlidingMoving: PropTypes.func.isRequired,
    changeTiltAngleMoving: PropTypes.func.isRequired,
    changeReduceSlidingRest: PropTypes.func.isRequired,
    changeTiltAngleRest: PropTypes.func.isRequired,
    changeReduceSwelling: PropTypes.func.isRequired,
    otherRecommendationTitle: PropTypes.func,
    reduceSwellingRecommendation: PropTypes.func,
    changeImproveComfort: PropTypes.func,
    improveComfortRecommendation: PropTypes.func,
    changeReducePain: PropTypes.func,
    otherRecommendation: PropTypes.func,
    reducePainRecommendation: PropTypes.func,
    changeOther: PropTypes.func,
    easeTransfersRecommendation: PropTypes.func,
    changeEaseTransfers: PropTypes.func,
    changeAllowRest: PropTypes.func,
    allowRestRecommendation: PropTypes.func,
    changeTiltFrequencyWeight: PropTypes.func,
    changeTiltLengthWeight: PropTypes.func,
    changeTiltAngleWeight: PropTypes.func,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      maxSliderAngle: 90,
    };

    this.setMaxAngle();
  }

  setMaxAngle() {
    if (this.props.maxAngle) {
      this.state.maxSliderAngle = this.props.maxAngle;
    }
  }
  save() {
    const data = {
      reduceWeight: {
        tiltFrequecy: this.props.tiltFrequencyWeight,
        tiltLength: this.props.tiltLengthWeight,
        tiltAngle: this.props.tiltAngleWeight,
      },
      reduceSlidingMoving: this.props.tiltAngleMoving,
      reduceSlidingRest: this.props.tiltAngleRest,
      reduceSwelling: this.props.swellingRecommendation,
      reducePain: this.props.painRecommendation,
      allowRest: this.props.restRecommendation,
      easeTransfers: this.props.transferRecommendation,
      improveComfort: this.props.comfortRecommendation,
      other: {
        title: this.props.otherRecommendationsTitle,
        value: this.props.otherRecommendations,
      },
    };
    axios.post(`${URL}recommandation`, data, this.props.header)
      .then(() => this.props.history.push('/goals'))
      .catch(error => console.log(error));
  }
  cancel() {
    console.log('clear all fields');
  }

  render() {
    return (
      <div>
        <div className="container">
          <center><h2>{T.translate(`recommendations.${this.props.language}`)}</h2></center>
          <legend className="text-center header"><h4>{T.translate(`recommendations.recommendationsText.${this.props.language}`)}</h4></legend>
          <div className="col-sm-12">
            <div className="col-sm-12">
              <Checkbox
                inputId="reduceWeightCheck"
                label="Reduce weight"
                onChange={this.props.changeReduceWeight}
                checked={this.props.reduceWeight}
              />
              <label htmlFor="reduceWeightCheck">{T.translate(`recommendations.reduceWeight.${this.props.language}`)}</label>
            </div>
            {this.props.reduceWeight
            ?
              <TiltSliders
                tiltFrequecy={this.props.tiltFrequencyWeight}
                tiltLength={this.props.tiltLengthWeight}
                tiltAngle={this.props.tiltAngleWeight}
                maxAngle={this.state.maxSliderAngle}
                onFrequencyChange={this.props.changeTiltFrequencyWeight.bind(this)}
                onLengthChange={this.props.changeTiltLengthWeight.bind(this)}
                onAngleChange={this.props.changeTiltAngleWeight.bind(this)}
              />
            : null}
            <AngleRecommendation
              recActive={this.props.reduceSlidingMoving}
              title={T.translate(`recommendations.slidingMoving.${this.props.language}`)}
              maxAngle={this.state.maxSliderAngle}
              value={this.props.tiltAngleMoving}
              onChangeActive={this.props.changeReduceSlidingMoving}
              onChangeValue={this.props.changeTiltAngleMoving}
            />
            <AngleRecommendation
              recActive={this.props.reduceSlidingRest}
              title={T.translate(`recommendations.slidingRest.${this.props.language}`)}
              maxAngle={this.state.maxSliderAngle}
              value={this.props.tiltAngleRest}
              onChangeActive={this.props.changeReduceSlidingRest}
              onChangeValue={this.props.changeTiltAngleRest}
            />
            <TextRecommendation
              onChangeActive={this.props.changeReduceSwelling}
              recActive={this.props.reduceSwelling}
              title={T.translate(`recommendations.reduceSwelling.${this.props.language}`)}
              value={this.props.swellingRecommendation}
              onChangeValue={this.props.reduceSwellingRecommendation}
            />
            <TextRecommendation
              onChangeActive={this.props.changeReducePain}
              recActive={this.props.reducePain}
              title={T.translate(`recommendations.pain.${this.props.language}`)}
              value={this.props.painRecommendation}
              onChangeValue={this.props.reducePainRecommendation}
            />
            <TextRecommendation
              onChangeActive={this.props.changeAllowRest}
              recActive={this.props.allowRest}
              title={T.translate(`recommendations.rest.${this.props.language}`)}
              value={this.props.restRecommendation}
              onChangeValue={this.props.allowRestRecommendation}
            />
            <TextRecommendation
              onChangeActive={this.props.changeEaseTransfers}
              recActive={this.props.easeTransfers}
              title={T.translate(`recommendations.transfer.${this.props.language}`)}
              value={this.props.transferRecommendation}
              onChangeValue={this.props.easeTransfersRecommendation}
            />
            <TextRecommendation
              onChangeActive={this.props.changeImproveComfort}
              recActive={this.props.improveComfort}
              title={T.translate(`recommendations.comfort.${this.props.language}`)}
              value={this.props.comfortRecommendation}
              onChangeValue={this.props.improveComfortRecommendation}
            />
            <OtherRecommendation
              onChangeActive={this.props.changeOther}
              recActive={this.props.other}
              title={T.translate(`recommendations.other.${this.props.language}`)}
              redTitle={this.props.otherRecommendationsTitle}
              value={this.props.otherRecommendations}
              onChangeValue={this.props.otherRecommendation}
              onChangeRecTitle={this.props.otherRecommendationTitle}
            />
          </div>
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
    reduceWeight: state.recommendationReducer.reduceWeight,
    reduceSwelling: state.recommendationReducer.reduceSwelling,
    reduceSlidingMoving: state.recommendationReducer.reduceSlidingMoving,
    reduceSlidingRest: state.recommendationReducer.reduceSlidingRest,
    reducePain: state.recommendationReducer.reducePain,
    allowRest: state.recommendationReducer.allowRest,
    easeTransfers: state.recommendationReducer.easeTransfers,
    improveComfort: state.recommendationReducer.improveComfort,
    other: state.recommendationReducer.other,
    tiltFrequencyWeight: state.recommendationReducer.tiltFrequencyWeight,
    tiltLengthWeight: state.recommendationReducer.tiltLengthWeight,
    tiltAngleWeight: state.recommendationReducer.tiltAngleWeight,
    tiltAngleMoving: state.recommendationReducer.tiltAngleMoving,
    tiltAngleRest: state.recommendationReducer.tiltAngleRest,
    painRecommendation: state.recommendationReducer.painRecommendation,
    swellingRecommendation: state.recommendationReducer.swellingRecommendation,
    restRecommendation: state.recommendationReducer.restRecommendation,
    transferRecommendation: state.recommendationReducer.transferRecommendation,
    comfortRecommendation: state.recommendationReducer.comfortRecommendation,
    otherRecommendations: state.recommendationReducer.otherRecommendations,
    otherRecommendationsTitle: state.recommendationReducer.otherRecommendationsTitle,
    maxAngle: state.configurationReducer.maxAngle,
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    changeReduceWeight: RecommendationActions.changeReduceWeight,
    changeReduceSwelling: RecommendationActions.changeReduceSwelling,
    changeReduceSlidingMoving: RecommendationActions.changeReduceSlidingMoving,
    changeReduceSlidingRest: RecommendationActions.changeReduceSlidingRest,
    changeReducePain: RecommendationActions.changeReducePain,
    changeAllowRest: RecommendationActions.changeAllowRest,
    changeEaseTransfers: RecommendationActions.changeEaseTransfers,
    changeImproveComfort: RecommendationActions.changeImproveComfort,
    changeOther: RecommendationActions.changeOther,
    changeTiltFrequencyWeight: RecommendationActions.changeTiltFrequencyWeight,
    changeTiltLengthWeight: RecommendationActions.changeTiltLengthWeight,
    changeTiltAngleWeight: RecommendationActions.changeTiltAngleWeight,
    changeTiltAngleMoving: RecommendationActions.changeTiltAngleMoving,
    changeTiltAngleRest: RecommendationActions.changeTiltAngleRest,
    reducePainRecommendation: RecommendationActions.reducePainRecommendation,
    reduceSwellingRecommendation: RecommendationActions.reduceSwellingRecommendation,
    allowRestRecommendation: RecommendationActions.allowRestRecommendation,
    easeTransfersRecommendation: RecommendationActions.easeTransfersRecommendation,
    improveComfortRecommendation: RecommendationActions.improveComfortRecommendation,
    otherRecommendation: RecommendationActions.otherRecommendation,
    otherRecommendationTitle: RecommendationActions.otherRecommendationTitle,
  }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(Recommendation);