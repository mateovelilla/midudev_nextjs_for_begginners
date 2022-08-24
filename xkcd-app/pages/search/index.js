import { Layout } from 'components/Layout';
import Head from 'next/head'
export default function Search ({ query }) {
    return <>
        <Head>
            <title>xkcd - Result for { query }</title>
            <meta name="description" content={`Search results for ${query}`}/>
        </Head>
        <Layout>
            <h1> Result to {query } </h1>
        </Layout>
    </>
}

export async function getServerSideProps (context) {
    const { query } = context;
    const { q = ''} = query;
    return {
        props: {
            query: q
        }
    }
}