import classNames from "classnames";
import React from "react";

enum TweetAuthMode {
  UNDECIDED,
  BAD,
  GOOD,
}

const HASHTAG = "7COILISASTUPIDFUCK";

const ENDPOINT = "http://localhost:8000/api/since_id";

const fetchTweetsSince = async (since_id?: number) => {
  const endpoint_with_params = new URL(ENDPOINT);

  endpoint_with_params.searchParams.append("hash", HASHTAG);
  since_id &&
    endpoint_with_params.searchParams.append("id", since_id.toString());

  const req = await fetch(endpoint_with_params.toString(), {
    method: "get",
    mode: "cors",
  });

  console.log(req.body);
};

const handleRefresh = async () => {
  fetchTweetsSince();
};

const Twitter: React.FC = () => {
  const [mode, setMode] = React.useState<TweetAuthMode>(
    TweetAuthMode.UNDECIDED
  );

  return (
    <div className="p-2">
      <div className="py-2">
        <p className="text-xl mb-2">Twitter Timeline</p>
      </div>
      <div className="p-2">
        <div className="flex items-center justify-center flex-col mb-3 gap-y-5">
          <button
            onClick={handleRefresh}
            className="px-4 py-2 font-semibold text-sm bg-cyan-500 text-white rounded-full shadow-sm"
          >
            Refresh Database
          </button>
          <Selector
            options={[
              {
                name: "To Be Decided",
                type: TweetAuthMode.UNDECIDED,
                style: "bg-blue-600",
              },
              {
                name: "Good",
                type: TweetAuthMode.GOOD,
                style: "bg-green-500",
              },
              {
                name: "Bad",
                type: TweetAuthMode.BAD,
                style: "bg-red-500",
              },
            ]}
            currentOption={mode}
            setOption={setMode}
          />
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

interface SelectorProps {
  options: { name: string; type: any; style: string }[];
  currentOption: any;
  setOption: (arg0: any) => void;
}

const Selector: React.FC<SelectorProps> = ({
  currentOption,
  options,
  setOption,
}) => {
  return (
    <div className="btn-group" role="group">
      {options.map(({ name, type, style }, i) => {
        console.log(currentOption, type, currentOption === type);
        return (
          <button
            key={i}
            type="button"
            className={classNames(
              { "rounded-l-lg": i == 0 },
              { "rounded-r-lg": i == options.length - 1 },
              "inline-block",
              "px-6 py-2.5",
              { "bg-white/50": currentOption !== type },
              "text-black",
              "font-semibold",
              "text-sm",
              "leading-tight",
              "uppercase",
              "hover:bg-white",
              "hover:text-black",
              "focus:outline-none",
              "focus:ring-0 ",
              "transition ",
              "ease-in-out",
              "text-white",
              { [style]: currentOption === type }
            )}
            onClick={() => setOption(type)}
          >
            {name}
          </button>
        );
      })}
    </div>
  );
};

export default Twitter;
