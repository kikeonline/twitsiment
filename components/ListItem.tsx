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
      <p>Tweet: {data.text}</p>
      <p>Score: {data.score}</p>
      <p>Comparative: {data.comparative}</p>
    </>
  </Link>
)

export default ListItem
