# Royal Hackaway Overlay

This is the Royal Hackaway overlay bundle, which includes includes both controls and the frontend graphics visible on stream.

See it in action in our [Best Bits](https://www.youtube.com/watch?v=-4O3grBFW0s) video on YouTube.

## Running

To run this project:

1. Install the dependencies for the bundle
   - Run `yarn` in the root folder
2. Build the NodeCG bundle
   - `yarn build`
3. Install the dependencies for NodeCG
   - Go into the `nodecg` directory
   - Run `npm i`
4. You may now start the project
   - Return to the root folder
   - `yarn start`
   - `yarn dev` (for live reload!)

## Updating NodeCG

NodeCG is included as a submodule to keep things stable.
Update NodeCG by bringing the submodule up to date with `master`.

# Contributing

- Please check Notion, open issues and PRs before working on anything or opening a new one!
- Please ensure you have run `yarn format` before pushing new code.
