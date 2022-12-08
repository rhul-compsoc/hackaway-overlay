import React, { Component } from "react";
import SpotifyWebApi from "spotify-web-api-node";

type SpotifyUser = null | Awaited<ReturnType<SpotifyWebApi["getMe"]>>["body"];
type SpotifyPlayer =
  | null
  | Awaited<ReturnType<SpotifyWebApi["getMyCurrentPlayingTrack"]>>["body"];

interface SpotifyPageState {
  user: SpotifyUser;
  player: SpotifyPlayer;
}

const spotifyUserReplicant = nodecg.Replicant<SpotifyUser>("spotifyUser");
const spotifyPlayerReplicant = nodecg.Replicant<SpotifyPlayer>("spotifyPlayer");

class SpotifyPage extends Component<{}, SpotifyPageState> {
  constructor(props: any) {
    super(props);

    this.state = {
      user: null,
      player: null,
    };
  }

  componentDidMount() {
    spotifyUserReplicant.on("change", (value) => {
      this.setState({
        user: value,
      });
    });
    spotifyPlayerReplicant.on("change", (value) => {
      this.setState({
        player: value,
      });
    });
  }

  render(): React.ReactNode {
    const { user, player } = this.state;
    const cover =
      player?.item?.album?.images[1]?.url ||
      player?.item?.album?.images[0]?.url;

    return (
      <div className="p-2">
        <div className="py-2">
          <p className="text-xl mb-2">Setup</p>
          <a
            className="p-2 rounded text-center bg-blue-500"
            href="/bundles/royalhackaway-overlay/spotify/"
            target="_blank"
          >
            Link {user && "Another"} Spotify Account
          </a>
        </div>
        <div className="py-2">
          <p className="text-xl mb-2">User Information</p>
          <table className="table-auto">
            <thead>
              <tr>
                <th className="p-1">Field</th>
                <th className="p-1">Value</th>
              </tr>
            </thead>
            <tbody>
              <tr className="divide-y">
                <td className="p-1">Name</td>
                <td className="p-1">{user?.display_name}</td>
              </tr>
              <tr className="divide-y">
                <td className="p-1">Email</td>
                <td className="p-1">{user?.email}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="py-2 flex gap-3">
          {cover && <img className="w-3/6" src={cover}></img>}
          <div className="w-3/6">
            <p className="text-xl">
              {player?.is_playing ? "▶️ Now Playing" : "⏸️ Paused"}
            </p>
            <p>{player?.item?.name}</p>
            <p>{player?.item?.album?.name}</p>
          </div>
        </div>
      </div>
    );
  }
}

export { SpotifyPage };
