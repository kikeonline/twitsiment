import { GetStaticProps } from 'next'
import Link from 'next/link'

import { tweet } from '../../interfaces'
// import { sampleUserData } from '../../utils/sample-data'
import Layout from '../../components/Layout'
import List from '../../components/List'

type Props = {
  items: tweet[]
}

const WithStaticProps = ({ items }: Props) => (
  <Layout title="Tweets | Twitsiment">
    <h1>Tweet List</h1>
    <p>tweets</p>
    <List items={items} />
    <p>
      <Link href="/">
        <a>Go home</a>
      </Link>
    </p>
  </Layout>
)

export const getStaticProps: GetStaticProps = async () => {
  // Example for including static props in a Next.js function component page.
  // Don't forget to include the respective types for any props passed into
  // the component.
  const res = await fetch('http://localhost:3000/api/tweets')
  const tweets = await res.json()
  const items: tweet[] = tweets
  return { props: { items } }
}

export default WithStaticProps
