import { NextApiRequest, NextApiResponse } from 'next'
import { tweetUserData } from '../../../../utils/sample-data'
import Twitter from 'twit';
import lorca from 'lorca-nlp';
import config from '../../../../scripts/config';

const client = new Twitter(config);

const handler = (_req: NextApiRequest, res: NextApiResponse) => {
  const params = {
    screen_name: 'kikeonline',
    count: 5,
  };
  try {
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
      if (!error) {
        const twitsiment = tweets.map(tweet => {
          const { id, create_at, text, lang } = tweet;
          const doc = lorca(text);
          const score = doc.sentiment();

          return { id, create_at, text, score, lang };
        })
        res.status(200).json(twitsiment)
      }
    });
  } catch (err: any) {
    res.status(500).json({ statusCode: 500, message: err.message })
  }
}

export default handler
