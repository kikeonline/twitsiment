import { NextApiRequest, NextApiResponse } from 'next'
import { tweetUserData } from '../../../utils/sample-data'
import Twitter from 'twit';
import config from '../../../scripts/config'

const client = new Twitter(config);

const handler = (_req: NextApiRequest, res: NextApiResponse) => {

  const params = {screen_name: 'kikeonline'};
  try {
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
      if (!error) {
        console.log(tweets);
        res.status(200).json(tweets)
      }
    });
  } catch (err: any) {
    res.status(500).json({ statusCode: 500, message: err.message })
  }
}

export default handler
