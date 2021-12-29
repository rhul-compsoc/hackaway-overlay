import SpotifyWebApi from "spotify-web-api-node";
import { NodeCG } from "../../../nodecg/types/server";

const SPOTIFY_SCOPES = [
  "user-read-private",
  "user-read-email",
  "user-read-currently-playing",
  "user-read-playback-state",
];

const REDIRECT =
  "http://127.0.0.1:9090/bundles/royalhackaway-overlay/spotify/callback";
const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;

const spotify = async (nodecg: NodeCG) => {
  const logger = new nodecg.Logger("Track Track Go!");

  const spotifyRefreshReplicant = nodecg.Replicant<null | string>(
    "spotifyRefresh"
  );
  const spotifyUserReplicant = nodecg.Replicant<
    null | Awaited<ReturnType<SpotifyWebApi["getMe"]>>["body"]
  >("spotifyUser", {
    defaultValue: null,
  });
  const spotifyPlayerReplicant = nodecg.Replicant<
    | null
    | Awaited<ReturnType<SpotifyWebApi["getMyCurrentPlayingTrack"]>>["body"]
  >("spotifyPlayer", {
    defaultValue: null,
  });

  const spotify = new SpotifyWebApi({
    redirectUri: REDIRECT,
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
  });

  const url = spotify.createAuthorizeURL(SPOTIFY_SCOPES, "", true);

  let updateTokenLoop: NodeJS.Timeout;
  let updatePlayerLoop: NodeJS.Timeout;

  const updatePlayer = async () => {
    // Refresh every 10 seconds
    let timeoutLength = 10 * 1000;

    // If an existing timeout to update the loop exists, stop it.
    if (updatePlayerLoop) clearTimeout(updatePlayerLoop);

    // If unauthenticated, stop!
    if (!spotify.getAccessToken()) {
      logger.error("Cannot update Spotify player, not logged in!");
      return;
    }

    try {
      // Get what's currently playing every 10 seconds
      const playData = await spotify.getMyCurrentPlayingTrack();
      spotifyPlayerReplicant.value = playData.body;

      if (playData.body.is_playing) {
        const data = playData.body;

        // ...unless we're running out of time.
        // Check a second after the song ends.
        const remainingTime = data.item.duration_ms - data.progress_ms;
        if (remainingTime < timeoutLength) {
          // Add an extra second (just in case!)
          timeoutLength = remainingTime + 1000;
        }

        logger.info(
          `Currently playing: ${data.item.name}, with ${
            remainingTime / 1000
          }s to go.`
        );
      } else {
        logger.info(`Currently not playing.`);
      }
    } catch (e: any) {
      let ratelimit = e["Retry-After"];
      if (e.statusCode === 429 && ratelimit) {
        logger.warn(`Rate limited by Spotify.`);
        timeoutLength = ratelimit * 1000;
      }
    }

    logger.info(`Refreshing in ${timeoutLength / 1000}s`);

    // Wait 30 seconds before checking again!
    updatePlayerLoop = setTimeout(updatePlayer, timeoutLength);
  };

  const updateUser = async (codeGrant?: string) => {
    let authData: Awaited<
      ReturnType<
        | typeof spotify.refreshAccessToken
        | typeof spotify.authorizationCodeGrant
      >
    >;

    // If an existing timeout to update the loop exists, stop it.
    if (updateTokenLoop) clearTimeout(updateTokenLoop);

    // If a code grant was passed, use the code grant to update the user.
    // Otherwise, check for a refresh token. If it doesn't exist, get it to go away.
    // If it does exist, use that to refresh the access token.
    if (codeGrant) {
      logger.info(`Updating Spotify user based off code grant: ${codeGrant}`);
      authData = await spotify.authorizationCodeGrant(codeGrant);
    } else {
      logger.info("Updating Spotify user based off existing refresh token");
      if (!spotify.getRefreshToken()) return;
      authData = await spotify.refreshAccessToken();
    }

    // Pass the new access token to itself
    spotify.setAccessToken(authData.body.access_token);

    if (authData.body.refresh_token) {
      // New refresh token? Use that!
      spotify.setRefreshToken(authData.body.refresh_token);
      spotifyRefreshReplicant.value = authData.body.refresh_token;
    }

    // Grab the user information, for funsies.
    const user = await spotify.getMe();
    spotifyUserReplicant.value = user.body;

    // Remove 10 minutes from the refreshTime
    const refreshTime = authData.body.expires_in - 10 * 60;
    logger.info(
      `Logging complete, refreshing in ${refreshTime} seconds (${
        refreshTime / 60
      } minutes)`
    );

    // Make sure to check up in however long it asks for
    updateTokenLoop = setTimeout(updateUser, refreshTime * 1000);
  };

  // Re-setup the Spotify API with the refresh token, if it exists.
  if (spotifyRefreshReplicant.value) {
    spotify.setRefreshToken(spotifyRefreshReplicant.value);

    try {
      // Start listening for user/player updates
      await updateUser();
      await updatePlayer();
    } catch (e) {
      logger.error(e);
    }
  }

  const router = nodecg.Router();
  router
    .get("/", (req, res) => {
      res.redirect(url);
    })
    .get("/callback", async (req, res) => {
      if (!req.query.code)
        return res.status(400).json({
          ok: false,
          message: "An authorisation code was not provided.",
        });

      try {
        // Start listening for user/player updates
        await updateUser(req.query.code);
        await updatePlayer();

        res.json({
          ok: true,
          message: "It's ok to close this window.",
        });
      } catch (e) {
        logger.error(e);

        res.json({
          ok: false,
          message: e,
        });
      }
    });

  nodecg.mount("/bundles/royalhackaway-overlay/spotify", router);
};

export { spotify };
