import React from 'react';
import { connect } from 'react-redux';
import { finishCurrentTimebox } from '../timeboxesActions';
import { getMinutesAndSecondsFromDurationInSeconds } from '../lib/time';
import { getCurrentTimebox } from '../reducers';
import Clock from './Clock';
import ProgressBar from './ProgressBar';

class CurrentTimebox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isRunning: false,
      isPaused: false,
      isFinished: false,
      pausesCount: 0,
      elapsedTimeInSeconds: 0,
    };
    this.handleStart = this.handleStart.bind(this);
    this.handleStop = this.handleStop.bind(this);
    this.togglePause = this.togglePause.bind(this);
    this.intervalId = null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (!prevState.isFinished && this.state.isFinished) {
      this.props.onFinish();
    }
  }

  componentWillUnmount() {
    this.stopTimer();
  }

  handleStart(event) {
    this.setState({
      isRunning: true,
    });
    this.startTimer();
  }
  handleStop(event) {
    this.setState({
      isRunning: false,
      isPaused: false,
      pausesCount: 0,
      elapsedTimeInSeconds: 0,
    });
    this.stopTimer();
  }
  startTimer() {
    if (this.intervalId === null) {
      this.intervalId = window.setInterval(() => {
        this.setState((prevState) => {
          const { totalTimeInMinutes } = this.props;
          const totalTimeInSeconds = totalTimeInMinutes * 60;
          const elapsedTimeInSeconds = Math.min(
            prevState.elapsedTimeInSeconds + 0.1,
            totalTimeInSeconds
          );
          const isFinished =
            prevState.isFinished || elapsedTimeInSeconds >= totalTimeInSeconds;
          if (isFinished) {
            this.stopTimer();
          }
          const isRunning = prevState.isRunning && !isFinished;
          const isPaused = prevState.isPaused && !isFinished;

          return {
            elapsedTimeInSeconds,
            isFinished,
            isRunning,
            isPaused,
          };
        });
      }, 100);
    }
  }
  stopTimer() {
    window.clearInterval(this.intervalId);
    this.intervalId = null;
  }
  togglePause() {
    this.setState(function (prevState) {
      const isPaused = !prevState.isPaused;
      if (isPaused) {
        this.stopTimer();
      } else {
        this.startTimer();
      }
      return {
        isPaused,
        pausesCount: isPaused
          ? prevState.pausesCount + 1
          : prevState.pausesCount,
      };
    });
  }
  render() {
    const {
      isPaused,
      isFinished,
      isRunning,
      pausesCount,
      elapsedTimeInSeconds,
    } = this.state;
    const { title, totalTimeInMinutes } = this.props;
    const totalTimeInSeconds = totalTimeInMinutes * 60;
    const timeLeftInSeconds = totalTimeInSeconds - elapsedTimeInSeconds;
    const [minutesLeft, secondsLeft] =
      getMinutesAndSecondsFromDurationInSeconds(timeLeftInSeconds);
    const progressInPercent =
      (elapsedTimeInSeconds / totalTimeInSeconds) * 100.0;
    return (
      <div className="CurrentTimebox">
        <h1>{title}</h1>
        <Clock
          minutes={minutesLeft}
          seconds={secondsLeft}
          className={isPaused ? 'inactive' : ''}
        />
        <ProgressBar
          percent={progressInPercent}
          className={isPaused ? 'inactive' : ''}
          color="red"
          big
        />
        <button onClick={this.handleStart} disabled={isRunning || isFinished}>
          Start
        </button>
        <button onClick={this.handleStop} disabled={!isRunning}>
          Stop
        </button>
        <button onClick={this.togglePause} disabled={!isRunning}>
          {isPaused ? 'Wznów' : 'Pauzuj'}
        </button>
        Liczba przerw: {pausesCount}
      </div>
    );
  }
}

const CurrentTimeboxOrNothing = ({ currentTimebox, onFinish }) => {
  if (currentTimebox) {
    const { title, totalTimeInMinutes } = currentTimebox;
    return (
      <CurrentTimebox
        onFinish={onFinish}
        title={title}
        totalTimeInMinutes={totalTimeInMinutes}
      />
    );
  } else {
    return null;
  }
};

const mapStateToProps = (state) => {
  const currentTimebox = getCurrentTimebox(state);
  return {
    currentTimebox,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onFinish: () => dispatch(finishCurrentTimebox()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CurrentTimeboxOrNothing);
