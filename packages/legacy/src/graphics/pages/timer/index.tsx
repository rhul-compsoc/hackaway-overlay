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
  }

  componentDidMount() {
    this.animationFrame = requestAnimationFrame(this.updateTimer);

    timerEndReplicant.on("change", (value) => {
      this.setState({
        end: value,
      });
    });

    timerRunningReplicant.on("change", (value) => {
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
      <div className="absolute right-0 px-5 h-24 text-white inline-flex items-center">
        <div className="flex flex-col w-20 text-center">
          <span className="text-4xl font-bold">{hours}</span>
          <span className="text-white font-semibold">
            hour{hours === 1 ? "" : "s"}
          </span>
        </div>
        <div className="flex flex-col w-20 text-center">
          <span className="text-4xl font-bold">{minutes}</span>
          <span className="text-white font-semibold">
            minute{minutes === 1 ? "" : "s"}
          </span>
        </div>
        <div className="flex flex-col w-20 text-center">
          <span className="text-4xl font-bold">{seconds}</span>
          <span className="text-white font-semibold">
            second{seconds === 1 ? "" : "s"}
          </span>
        </div>
      </div>
    );
  }
}

export { TimerPage };
