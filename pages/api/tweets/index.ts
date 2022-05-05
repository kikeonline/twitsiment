import { NextApiRequest, NextApiResponse } from 'next'
import { tweetUserData } from '../../../utils/sample-data'
import Twitter from 'twit';
import Sentiment from 'sentiment';
import lorca from 'lorca-nlp';
import config from '../../../scripts/config';

const sentiment = new Sentiment();
const client = new Twitter(config);

const getSentimentScore = (text: string, lang: string) => {
  if (lang === 'es') {
    const doc = lorca(text);
    const score = doc.sentiment();
    return score;
  } else {
    const result = sentiment.analyze(text);
    const { score } = result;
    return score;
  }
}

const handler = (_req: NextApiRequest, res: NextApiResponse) => {
  const params = {
    screen_name: 'kikeonline',
    include_rts: false,
    count: 1500,
  };
  try {
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
      if (!error) {
        const twitsiment = tweets.map(tweet => {
          const { id, created_at, text, lang } = tweet;
          const score = getSentimentScore(text, lang);
          return { id, created_at, tweet: text, sentiment_score: score, lang };
        });
        res.status(200).json(twitsiment)
      }
    });
  } catch (err: any) {
    res.status(500).json({ statusCode: 500, message: err.message })
  }
}

export default handler
