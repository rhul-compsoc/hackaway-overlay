import React from "react";

enum TweetAuthMode {
  UNDECIDED,
  BAD,
  GOOD,
}

const HASHTAG = "#my_name_jeff";
const twitter_bearer_token = process.env.TWITTER_BEARER_TOKEN;

const Twitter: React.FC = () => {
  const [mode, setMode] = React.useState<TweetAuthMode>(
    TweetAuthMode.UNDECIDED
  );

  const TBDref = React.useRef<HTMLButtonElement>(null);
  const BADref = React.useRef<HTMLButtonElement>(null);
  const GOODref = React.useRef<HTMLButtonElement>(null);

  const refMap = {
    [TweetAuthMode.UNDECIDED]: TBDref,
    [TweetAuthMode.BAD]: BADref,
    [TweetAuthMode.GOOD]: GOODref,
  };

  React.useEffect(() => {
    refMap[mode].current?.focus();
  }, [mode]);

  return (
    <div className="p-2">
      <div className="py-2">
        <p className="text-xl mb-2">Twitter Timeline</p>
      </div>
      <div className="p-2">
        <div className="flex items-center justify-center flex-col mb-3 gap-y-5">
          <button className="px-4 py-2 font-semibold text-sm bg-cyan-500 text-white rounded-full shadow-sm">
            Refresh Database
          </button>
          <div className="btn-group" role="group">
            <button
              type="button"
              className={
                "rounded-l-lg inline-block px-6 py-2.5 bg-white/50 text-black font-semibold text-sm leading-tight uppercase hover:bg-white hover:text-black focus:outline-none focus:ring-0  transition duration-150 ease-in-out" +
                (mode == TweetAuthMode.UNDECIDED
                  ? " bg-blue-600 text-white"
                  : "")
              }
              onClick={() => setMode(TweetAuthMode.UNDECIDED)}
              ref={TBDref}
            >
              To Be Decided
            </button>
            <button
              type="button"
              className={
                "inline-block px-6 py-2.5 bg-white/50 text-black font-semibold text-sm leading-tight uppercase hover:bg-white hover:text-black focus:outline-none focus:ring-0 transition duration-150 ease-in-out" +
                (mode == TweetAuthMode.GOOD ? " bg-green-500 text-white" : "")
              }
              onClick={() => setMode(TweetAuthMode.GOOD)}
              ref={GOODref}
            >
              Good
            </button>
            <button
              type="button"
              className={
                "rounded-r-lg inline-block px-6 py-2.5 bg-white/50 text-black font-semibold text-sm leading-tight uppercase hover:bg-white focus:outline-none focus:ring-0 transition duration-150 ease-in-out" +
                (mode == TweetAuthMode.BAD ? " bg-red-500" : "")
              }
              onClick={() => setMode(TweetAuthMode.BAD)}
              ref={BADref}
            >
              Bad
            </button>
          </div>
        </div>
      </div>
      <TweetList mode={mode} />
    </div>
  );
};

interface TwitterReplicantEntry {
  id: number;
  text: string;
  author_username: string;
  author_name: string;
  author_pf_link: string;
  time: string;
  authorized: TweetAuthMode;
}

const TwitterReplicant = nodecg.Replicant<TwitterReplicantEntry[]>("tweets");

const TweetList: React.FC<{ mode: TweetAuthMode }> = ({ mode }) => {
  const [tweets, setTweets] = React.useState<TwitterReplicantEntry[]>([]);

  React.useEffect(() => {
    console.log(tweets);

    TwitterReplicant.addListener("change", (v) => {
      setTweets(v);
    });
  }, []);

  return (
    <>
      {tweets?.length &&
        tweets
          .filter((t) => t?.authorized === mode)
          .map((t, i) => <div key={i}>tweet</div>)}
    </>
  );
};

export default Twitter;
