import React, { ChangeEvent, Component } from "react";

interface TimerPageState {
  end: number;
  duration: number;
  running: boolean;
}

const timerDurationReplicant = nodecg.Replicant<number>("timerDuration");
const timerEndReplicant = nodecg.Replicant<number>("timerEnd");
const timerRunningReplicant = nodecg.Replicant<boolean>("timerRunning");

class TimerPage extends Component<{}, TimerPageState> {
  animationFrame: number;

  constructor(props: any) {
    super(props);

    this.state = {
      end: 0,
      duration: 0,
      running: false,
    };

    this.animationFrame = 0;
    this.updateTimer = this.updateTimer.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.pauseTimer = this.pauseTimer.bind(this);
    this.setTimer = this.setTimer.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
    this.animationFrame = requestAnimationFrame(this.updateTimer);

    timerEndReplicant.on("change", (value) => {
      this.setState({
        end: value,
      });
    });

    timerRunningReplicant.on("change", (value = false) => {
      this.setState({
        running: value,
      });
    });

    timerDurationReplicant.on("change", (value = 0) => {
      this.setState({
        duration: value,
      });
    });
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.animationFrame);
  }

  handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const name = event.target.name;
    const value = parseInt(event.target.value, 10);

    let duration = this.state.duration;
    let secondsRemaining = duration / 1000;

    let seconds = Math.floor(secondsRemaining) % 60;
    let minutes = Math.floor(secondsRemaining / 60) % 60;
    let hours = Math.floor(secondsRemaining / 3600);

    switch (name) {
      case "hours":
        hours = value;
        break;
      case "minutes":
        minutes = value;
        break;
      case "seconds":
        seconds = value;
        break;
    }

    if (seconds < 0) seconds = 0;
    if (minutes < 0) minutes = 0;
    if (hours < 0) hours = 0;

    duration = 1000 * (seconds + 60 * (minutes + 60 * hours));

    this.setState({
      duration,
    });
  }

  startTimer() {
    let end = Date.now() + this.state.duration;

    this.setState({
      running: true,
      end,
    });

    timerEndReplicant.value = end;
    timerRunningReplicant.value = true;
  }

  pauseTimer() {
    timerRunningReplicant.value = false;
    let duration = this.state.end - Date.now();
    if (duration > 0) {
      timerDurationReplicant.value = duration;
    } else {
      timerDurationReplicant.value = 0;
    }
  }

  setTimer() {
    timerDurationReplicant.value = this.state.duration;
  }

  updateTimer() {
    if (this.state.running) {
      let duration = this.state.end - Date.now();
      let secondsRemaining = duration / 1000;

      if (secondsRemaining < 0) {
        this.setState({
          duration: 0,
        });
      } else {
        this.setState({
          duration,
        });
      }
    }

    this.animationFrame = requestAnimationFrame(this.updateTimer);
  }

  render() {
    let duration = this.state.duration;
    let secondsRemaining = duration / 1000;

    let seconds = Math.floor(secondsRemaining) % 60;
    let minutes = Math.floor(secondsRemaining / 60) % 60;
    let hours = Math.floor(secondsRemaining / 3600);

    return (
      <div className="p-2">
        <h2>Count with duration</h2>
        <input
          onChange={this.handleInputChange}
          className="text-black"
          type="number"
          value={hours}
          placeholder="hours"
          name="hours"
          disabled={this.state.running}
        ></input>
        <input
          onChange={this.handleInputChange}
          className="text-black"
          type="number"
          value={minutes}
          placeholder="minutes"
          name="minutes"
          disabled={this.state.running}
        ></input>
        <input
          onChange={this.handleInputChange}
          className="text-black"
          type="number"
          value={seconds}
          placeholder="seconds"
          name="seconds"
          disabled={this.state.running}
        ></input>

        <div className="pt-2 space-x-2">
          <button
            className={`p-2 rounded text-center ${
              this.state.running ? "bg-blue-900" : "bg-blue-500"
            }`}
            onClick={this.setTimer}
            disabled={this.state.running}
          >
            Set
          </button>
          <button
            className={`p-2 rounded text-center ${
              this.state.running ? "bg-blue-900" : "bg-blue-500"
            }`}
            onClick={this.startTimer}
            disabled={this.state.running}
          >
            Start
          </button>
          <button
            className={`p-2 rounded text-center ${
              !this.state.running ? "bg-blue-900" : "bg-blue-500"
            }`}
            onClick={this.pauseTimer}
            disabled={!this.state.running}
          >
            Pause
          </button>
        </div>
      </div>
    );
  }
}

export { TimerPage };
