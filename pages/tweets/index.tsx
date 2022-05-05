import { GetStaticProps } from 'next'
import Link from 'next/link'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

import { tweet } from '../../interfaces'
import Layout from '../../components/Layout'
import List from '../../components/List'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Sentiment Score',
    },
  },
};

type Props = {
  items: tweet[];
  data: {
    labels: string[];
    datasets: {
      label: string,
      data: number[],
      borderColor: string,
      backgroundColor: string,
    }
  };
}

const WithStaticProps = ({ items, data }: Props) => (
  <Layout title="Tweets | Twitsiment">
    <h1>Tweet List</h1>

    <Line options={options} data={data} />

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
  const labels = items.map(item => item.created_at);
  const sentiments_score = items.map(item => item.sentiment_score);
  const data = {
    labels,
    datasets: [
      {
        label: 'Sentiment Score',
        data: sentiments_score,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      }
    ],
  };

  return { props: { items, data } }
}

export default WithStaticProps
