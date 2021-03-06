/**
 * @author Gabriel Boucher
 * @author Anne-Marie Desloges
 * @author Austin-Didier Tran
 * @author Benjamin Roy
 */

import React, { Component } from 'react';

import { ProgressBar } from 'primereact/components/progressbar/ProgressBar';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { T } from '../../../../utilities/translator';
import CustomCard from '../../../shared/card';

class RecGoalProgress extends Component {
  static propTypes = {
    language: PropTypes.string.isRequired,
    condition: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    goalValue: PropTypes.number,
    recValue: PropTypes.number,
  };

  render() {
    const style = {
      center: {
        textAlign: 'center',
      },
    };

    const header = (
      <div>
        <h2 style={style.center}>{this.props.title}</h2>
      </div>
    );

    const element = (
      <div>
        <h4>{T.translate(`dailyResults.personal.${this.props.language}`)}</h4>
        <ProgressBar value={this.props.goalValue} />
        <p style={style.center}>
          {T.translate(`dailyResults.personal.description.${this.props.language}`,
            { percent: Math.round(this.props.goalValue) })}
        </p>
        <h4>{T.translate(`dailyResults.recommended.${this.props.language}`)}</h4>
        <ProgressBar value={this.props.recValue} />
        <p style={style.center}>
          {T.translate(`dailyResults.recommended.description.${this.props.language}`,
            { percent: Math.round(this.props.recValue) })}
        </p>
      </div>
    );

    return (
      <div>
        {this.props.condition
          && (
            <div>
              <CustomCard
                header={header}
                element={element}
              />
            </div>
          )
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    language: state.applicationReducer.language,
  };
}

export default connect(mapStateToProps)(RecGoalProgress);
