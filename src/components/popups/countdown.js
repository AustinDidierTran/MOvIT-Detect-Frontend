/**
 * @author Gabriel Boucher
 * @author Anne-Marie Desloges
 * @author Austin-Didier Tran
 * @author Benjamin Roy
 */

import React, { Component } from 'react';

import { Dialog } from 'primereact/components/dialog/Dialog';
import PropTypes from 'prop-types';

export default class Countdown extends Component {
  static propTypes = {
    time: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    onComplete: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      show: true,
      timer: props.time,
    };
  }

  componentDidMount() {
    this.countdown();
  }

  countdown() {
    const countdown = window.setInterval(() => {
      this.setState({ ...this.state, timer: this.state.timer - 1 });
      if (this.state.timer === 0) {
        window.clearInterval(countdown);
        this.setState({ show: false });
        this.props.onComplete();
      }
    }, 1000);
  }

  render() {
    const style = {
      timer: {
        fontSize: '30',
        textAlign: 'center',
        width: '100%',
      },
      timerHeader: {
        fontSize: '20',
        textAlign: 'center',
        width: '100%',
      },
    };
    return (
      <Dialog
        visible={this.state.show}
        width="300px"
        height="100px"
        showHeader={false}
        closeOnEscape={false}
        modal
        onHide={() => this.setState({ show: false })}
      >
        <div style={style.timerHeader}>{this.props.title}</div>
        <div style={style.timer}>{this.state.timer}</div>
      </Dialog>
    );
  }
}
