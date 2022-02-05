import React from "react";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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

const Twitter: React.FC = () => {
  const [tweets, setTweets] = React.useState<TWEET[]>([]);

  const fetchGood = async (): Promise<TWEET[]> => {
    const req = await fetch(
      new URL("GOOD", "http://localhost:8000/api/fetch_by/").toString()
    );

    return await req.json();
  };

  const getMore = () => {
    fetchGood().then((res) => {
      setTweets((oldTweets) => {
        let newRes = res.slice(oldTweets.length);
        console.log(res, newRes, oldTweets.length);
        return [...oldTweets, ...newRes];
      });
    });
  };

  React.useEffect(() => {
    fetchGood().then((res) => setTweets(res));
    const more = setInterval(getMore, 15 * 1000);
    () => clearInterval(more);
  }, []);

  return (
    <div className="bg-hackaway-grey max-h-[84px] overflow-hidden">
      <div className="max-w-full">
        <Slider
          {...{
            dots: false,
            infinite: true,
            autoplay: true,
            autoplaySpeed: 20000,
            speed: 20000,
            variableWidth: true,
            slidesPerRow: 1,
            slidesToScroll: tweets.length,
            pauseOnHover: false,
            arrows: false,
            vertical: false,
            cssEase: "linear",
          }}
        >
          {tweets.map((t, i) => (
            <div className="h-full p-2" key={i}>
              <div className="mx-[10px] bg-hackaway-dark-grey p-2 rounded-md shadow-sm flex items-center">
                <img
                  src={t.TWEET_AUTHOR_PF_LINK}
                  className="h-[25px] w-[25px] mr-2 rounded-full"
                />
                <p className="font-semibold text-white/80 mr-2">
                  {t.TWEET_AUTHOR_USERNAME}
                </p>
                <div>
                  <h3 className="text-white/80 font-semibold">
                    {t.TWEET_AUTHOR_NAME}
                  </h3>
                  <h4 className="text-white/80 font-semibold">
                    {t.TWEET_TEXT}
                  </h4>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Twitter;
