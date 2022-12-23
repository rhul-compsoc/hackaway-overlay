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

  getPlayerArtists(player: SpotifyPlayer) {
    return player?.item?.artists?.map((artist: any) => artist.name).join(", ");
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
      <div className="absolute bottom-0 h-48 bg-hackaway-dark-grey">
        {players.slice().map((player: SpotifyPlayer, index) => (
          <div
            key={player.timestamp}
            className={`h-48 w-full fixed transition-opacity opacity-100 ${
              index !== 0 ? "opacity-0" : ""
            }`}
          >
            {player.is_playing ? (
              <div className="flex">
                <img
                  className="h-48 w-48 object-contain"
                  src={this.getPlayerAlbumArt(player)}
                ></img>
                <div className="flex flex-col justify-center pl-4 text-white">
                  <p className="text-4xl font-bold">{player?.item?.name}</p>
                  <p className="text-2xl">{player?.item?.album?.name}</p>
                  <p className="text-2xl italic">
                    {this.getPlayerArtists(player)}
                  </p>
                </div>
              </div>
            ) : null
            // <div className="h-48 flex justify-center items-center p-2 text-gray-500">
            //   <p className="text-xl font-bold">Nothing playing...</p>
            // </div>
            }
          </div>
        ))}
      </div>
    );
  }
}

export { SpotifyPage };
