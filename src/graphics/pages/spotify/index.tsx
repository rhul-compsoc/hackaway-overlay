import React, { Component } from "react";
import SpotifyWebApi from "spotify-web-api-node";

type SpotifyPlayer =
  | null
  | Awaited<ReturnType<SpotifyWebApi["getMyCurrentPlayingTrack"]>>["body"];

interface SpotifyPageState {
  players: SpotifyPlayer[];
}

const spotifyPlayerReplicant = nodecg.Replicant<SpotifyPlayer>("spotifyPlayer");

class SpotifyPage extends Component<{}, SpotifyPageState> {
  constructor(props: any) {
    super(props);

    this.state = {
      players: [],
    };
  }

  getPlayerAlbumArt(player: SpotifyPlayer) {
    return (
      player?.item?.album?.images[1]?.url || player?.item?.album?.images[0]?.url
    );
  }

  componentDidMount() {
    spotifyPlayerReplicant.on("change", (value) => {
      this.setState((oldState) => {
        const players = oldState.players.slice(0, 5);

        const currentSong = oldState.players[0];

        let shouldPush = false;
        if (currentSong) {
          if (currentSong.is_playing !== value.is_playing) shouldPush = true;
          if (currentSong?.item?.id !== value?.item?.id) shouldPush = true;
        } else {
          shouldPush = true;
        }

        if (shouldPush) players.unshift(value);

        return {
          players,
        };
      });
    });
  }

  render(): React.ReactNode {
    const { players } = this.state;

    return (
      <div className="h-bottom w-80 bg-hackaway-grey">
        {players
          .slice()
          .reverse()
          .map((player: SpotifyPlayer) => (
            <div
              key={player.timestamp}
              className="h-bottom w-80 bg-hackaway-grey fixed animate-slide"
            >
              {player.is_playing ? (
                <div className="flex">
                  <img
                    className="h-bottom object-contain"
                    src={this.getPlayerAlbumArt(player)}
                  ></img>
                  <div className="flex flex-col justify-center pl-4 text-white">
                    <p className="text-xl font-bold">{player?.item?.name}</p>
                    <p className="italic">{player?.item?.album?.name}</p>
                  </div>
                </div>
              ) : (
                <div className="p-2">
                  <p>Not playing</p>
                </div>
              )}
            </div>
          ))}
      </div>
    );
  }
}

export { SpotifyPage };
