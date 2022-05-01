import * as React from 'react'

import { tweet } from '../interfaces'

type ListDetailProps = {
  item: tweet
}

const ListDetail = ({ item: tweet }: ListDetailProps) => (
  <div>
    <h1>Date: {tweet.created_at}</h1>
    <p>ID: {tweet.id}</p>
    <p>ID: {tweet.text}</p>
  </div>
)

export default ListDetail
