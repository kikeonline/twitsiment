import React from 'react'
import Link from 'next/link'

import { tweet } from '../interfaces'

type Props = {
  data: tweet
}

const ListItem = ({ data }: Props) => (
  <Link href="/tweet/[id]" as={`/tweet/${data.id}`}>
    <>
      <p>{data.id}</p>
      <p>{data.text}</p>
    </>
  </Link>
)

export default ListItem
