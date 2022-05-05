import React from 'react'
import Link from 'next/link'

import { tweet } from '../interfaces'

type Props = {
  data: tweet
}

const ListItem = ({ data }: Props) => (
  <Link href="/tweet/[id]" as={`/tweet/${data.id}`}>
    <>
      <p>ID: {data.id}</p>
      <p>Date: {data.created_at}</p>
      <p>Tweet: {data.tweet}</p>
      <p>Score: {data.sentiment_score}</p>
      <p>Lang: {data.lang}</p>
    </>
  </Link>
)

export default ListItem
