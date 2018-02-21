import React, { Component } from 'react';
import Slider from 'react-rangeslider'

export default class Goal extends Component {

    constructor (props, context) {
        super(props, context)
        this.state = {
            frequence: 20,
            bascule: 30,
            angle:60
        }
    }

    handleFrequenceChange = value => {
        this.setState({
            frequence: value
        })
    };

    handleBasculeChange = value => {
        this.setState({
            bascule: value
        })
    };

    handleAngleChange = value => {
        this.setState({
            angle: value
        })
    };

    render() {
        let style = {
            content: {
                textAlign: 'center',
                width: '85%',
                paddingLeft: '7%'
            },
            bar: {
                paddingLeft: '5%',
                paddingRight: '5%'
            }
        }
        var anglePercent = Math.round(this.state.angle * 100 / 180) + '%';
        var angleStyle = {
            width: anglePercent
         };
         var angleClass = "progress-bar progress-bar-info";
         if(Math.round(this.state.angle * 100 / 180) < 40){
            angleClass = "progress-bar progress-bar-danger";
         }else if (Math.round(this.state.angle * 100 / 180) >= 80){
            angleClass = "progress-bar progress-bar-success";
         }
        return (
            <div style={style.content}>
                <h1>Goals</h1>
                <div className="row">
                    <div className="col-sm-4" style={style.bar}>
                        <label>Frequency</label>
                        <Slider
                        min={0}
                        max={180}
                        step={5}
                        value={this.state.frequence}
                        onChange={this.handleFrequenceChange}
                        />
                    </div>
                    <div className="col-sm-4" style={style.bar}>
                        <label>Bascule</label>
                        <Slider
                        min={0}
                        max={180}
                        step={5}
                        value={this.state.bascule}
                        onChange={this.handleBasculeChange}
                        />
                    </div>
                    <div className="col-sm-4" style={style.bar}>
                        <label>Angle</label>
                        <Slider
                        min={0}
                        max={180}
                        step={5}
                        value={this.state.angle}
                        onChange={this.handleAngleChange}
                        />
                    </div>
                </div>
                <h1>Progress</h1>
                <div className="row">
                    <div className="col-sm-4" style={style.bar}>
                    <label>Frequence</label>
                        <div className="progress">
                            <div className="progress-bar progress-bar-info" role="progressbar"
                            aria-valuenow="60"
                            aria-valuemin="0"
                            aria-valuemax="100"
                            style={{width: '60%'}}>
                                <span className="sr-only">60% Complete</span>
                            </div>
                        </div>
                    </div>

                    <div className="col-sm-4" style={style.bar}>
                    <label>Bascule</label>
                        <div className="progress">
                            <div className="progress-bar  progress-bar-danger" role="progressbar"
                            aria-valuenow="20"
                            aria-valuemin="0"
                            aria-valuemax="100"
                            style={{width: '20%'}}>
                                <span className="sr-only">40% Complete</span>
                            </div>
                        </div>
                    </div>

                    <div className="col-sm-4" style={style.bar}>
                    <label>Angle</label>
                        <div className="progress">
                            <div className={angleClass} role="progressbar"
                            aria-valuenow={this.state.angle}
                            aria-valuemin="0"
                            aria-valuemax="180"
                            style={angleStyle}>
                                {anglePercent}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}