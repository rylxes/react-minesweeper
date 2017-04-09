import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import TimeElapsed from '../../components/TimeElapsed';

import { updateStopwatch } from '../../actions/stopwatch';
import { STOPWATCH_INITIAL_VALUE }  from '../../constants';


class Stopwacht extends Component {
  constructor(props) {
    super(props);
    this.seconds = this.props.seconds;
    this.minutes = this.props.minutes;
    this.hours = this.props.hours;
    this.timer();
  }

  componentWillReceiveProps() {
    if (this.props.text === STOPWATCH_INITIAL_VALUE) {
      this.seconds = 0;
      this.minutes = 0;
      this.hours = 0;
    }
  }

  timer() {
    setTimeout( ()=> {
      this.add();
    }, 1000)
  }

  add() {
    const {
      updateStopwatch
    } = this.props;
    this.seconds++;
    if (this.seconds >= 60) {
      this.seconds = 0;
      this.minutes++;
      if (this.minutes >= 60) {
        this.minutes = 0;
        this.hours++;
      }
    }
    const text = (this.hours ? (this.hours > 9 ? this.hours : "0" + this.hours) : "00") + ":" + (this.minutes ? (this.minutes > 9 ? this.minutes : "0" + this.minutes) : "00") + ":" + (this.seconds > 9 ? this.seconds : "0" + this.seconds);
    updateStopwatch(text, this.hours, this.minutes, this.seconds);
    this.timer();
  }

  render() {
    const {
      text
    } = this.props;
    return (
      <div className="stopwacht-container">
        <TimeElapsed
          elapsed={`${text}`}
        />
      </div>
    );
  }
}

Stopwacht.propTypes = {
  text: React.PropTypes.string.isRequired,
  hours: React.PropTypes.number.isRequired,
  minutes: React.PropTypes.number.isRequired,
  seconds: React.PropTypes.number.isRequired
}

function mapDispatchToProps(dispatch) {
  return {
    updateStopwatch: bindActionCreators(updateStopwatch, dispatch)
  };
}

const mapStateToProps = (state) => {
  return {
    text: state.stopwatch.text,
    hours: state.stopwatch.hours,
    minutes: state.stopwatch.minutes,
    seconds: state.stopwatch.seconds,
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(Stopwacht);