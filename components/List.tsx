import * as React from 'react'
import ListItem from './ListItem'
import { tweet } from '../interfaces'

type Props = {
  items: tweet[]
}

const List = ({ items }: Props) => (
  <ul>
    {items.map((item) => (
      <li key={item.id}>
        <ListItem data={item} />
      </li>
    ))}
  </ul>
)

export default List
