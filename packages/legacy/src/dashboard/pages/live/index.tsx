import React, { ChangeEvent, Component, EventHandler } from "react";

interface LivePageState {
  locations: string[];
  saved: boolean;
}

const liveLocationsReplicant = nodecg.Replicant<string[]>("live.locations", {
  defaultValue: [],
});

class LivePage extends Component<{}, LivePageState> {
  constructor(props: any) {
    super(props);

    this.state = {
      locations: [],
      saved: true,
    };

    this.setLocations = this.setLocations.bind(this);
    this.saveLocations = this.saveLocations.bind(this);
  }
  componentDidMount() {
    liveLocationsReplicant.on("change", (value) => {
      this.setState({
        locations: value,
        saved: true,
      });
    });
  }
  componentWillUnmount() {
    liveLocationsReplicant.removeAllListeners();
  }
  setLocations(e: ChangeEvent<HTMLTextAreaElement>) {
    this.setState({
      locations: e.target.value?.split("\n") || [],
      saved: false,
    });
  }
  showLocation(location: string) {
    nodecg.sendMessage("live.location", location);
  }
  saveLocations() {
    liveLocationsReplicant.value = this.state.locations;
  }
  render() {
    return (
      <div className="p-2">
        <div>
          <span className="text-xl">Location Manager</span>
          <textarea
            className="text-black w-full"
            value={this.state.locations.join("\n")}
            onChange={this.setLocations}
          ></textarea>
          <button
            className={`p-2 rounded text-center ${
              this.state.saved ? "bg-blue-900" : "bg-blue-500"
            }`}
            onClick={this.saveLocations}
          >
            Save Changes
          </button>
        </div>
        <div>
          <span className="text-xl">Show Location</span>
          <div className="flex flex-col gap-1">
            {this.state.locations
              .filter((location) => location)
              .map((location, index) => (
                <button
                  className="p-2 rounded text-center bg-blue-500"
                  key={index}
                  onClick={() => this.showLocation(location)}
                >
                  {location}
                </button>
              ))}
          </div>
        </div>
      </div>
    );
  }
}

export { LivePage };
