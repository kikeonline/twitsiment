import { NextApiRequest, NextApiResponse } from 'next'
import { tweetUserData } from '../../../utils/sample-data'
import Twitter from 'twit';
import Sentiment from 'sentiment';
import config from '../../../scripts/config'

const sentiment = new Sentiment();
const client = new Twitter(config);

const handler = (_req: NextApiRequest, res: NextApiResponse) => {
  const params = {
    screen_name: 'kikeonline',
    count: 5,
  };
  try {
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
      if (!error) {
        console.log(tweets);
        const twitsiment = tweets.map(tweet => {
          const { id, create_at, text } = tweet;
          const result = sentiment.analyze(text);
          const { score, comparative } = result;
          console.log({ id, create_at, text, score, comparative });
          return { id, create_at, text, score, comparative };
        })
        console.log(twitsiment)
        res.status(200).json(twitsiment)
      }
    });
  } catch (err: any) {
    res.status(500).json({ statusCode: 500, message: err.message })
  }
}

export default handler
