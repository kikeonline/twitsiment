import { NextApiRequest, NextApiResponse } from 'next'
import { tweetUserData } from '../../../utils/sample-data'

const handler = (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (!Array.isArray(tweetUserData)) {
      throw new Error('Cannot find user data')
    }

    res.status(200).json(tweetUserData)
  } catch (err: any) {
    res.status(500).json({ statusCode: 500, message: err.message })
  }
}

export default handler
