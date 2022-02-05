import React from "react";
import classNames from "classnames";

enum TweetAuthMode {
  NEW = "NEW",
  BAD = "BAD",
  GOOD = "GOOD",
}

const Twitter: React.FC = () => {
  const [mode, setMode] = React.useState<TweetAuthMode>(TweetAuthMode.NEW);

  return (
    <div className="p-2">
      <div className="py-2">
        <p className="text-xl mb-2">Twitter Timeline</p>
      </div>
      <div className="p-2">
        <p>
          To manage the data base{" "}
          <a href="https://twitter.djpiper28.co.uk/">click here</a>
        </p>
        <div className="flex items-center justify-center flex-col mb-3 gap-y-5">
          <Selector
            options={[
              {
                name: "To Be Decided",
                type: TweetAuthMode.NEW,
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

const API_URL = "http://localhost:8000/api/fetch_by/";

interface TWEET {
  AUTHORIZED: 0 | 1 | 2;
  GIF_URL?: string;
  HAS_GI?: 0 | 1;
  TWEET_AUTHOR_NAME: string;
  TWEET_AUTHOR_PF_LINK: string;
  TWEET_AUTHOR_USERNAME: string;
  TWEET_ID: string;
  TWEET_TEXT: string;
  TWEET_TIME: 1644014924;
}

const TweetList: React.FC<{ mode: TweetAuthMode }> = ({ mode }) => {
  const [tweets, setTweets] = React.useState<TWEET[]>([]);

  React.useEffect(() => {
    fetch(new URL(mode, API_URL).toString())
      .then((req) => req.json())
      .then((res) => setTweets(res));
  }, [mode]);

  return (
    <div className="bg-[#272B34] p-9 rounded-lg max-h-40 overflow-y-auto">
      {tweets.map((t, i) => (
        <div key={i} className="flex">
          <p className="mr-4">{t.TWEET_AUTHOR_USERNAME}</p>
          <p>{t.TWEET_TEXT}</p>
        </div>
      ))}
    </div>
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
      {options.map(({ name, type, style }, i) => (
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
            "focus:ring-0",
            "transition",
            "ease-in-out",
            "text-white",
            { [style]: currentOption === type }
          )}
          onClick={() => setOption(type)}
        >
          {name}
        </button>
      ))}
    </div>
  );
};

export default Twitter;
