import Head from 'next/head'
import Image from 'next/image';
import { readFile, readdir, stat } from 'fs/promises'
import { basename } from 'path';
import Link from 'next/link';
import { Layout } from 'components/Layout';
export default function Comic({
  img,
  alt,
  title,
  width,
  height,
  hasPrevious,
  hasNext,
  prevId,
  nextId
}) {
  return <>
    <Head>
      <title>xkcd - Comics for developers</title>
      <meta name="description" content="Comics for developers"/>
    </Head>
    <Layout>
      <section className='max-w-lg m-auto'>
          <h1 className='font-bold text-xl text-center mb-4'>{title}</h1>
          <div className='max-w-xs m-auto mb-4'>
            <Image layout='responsive' width={width} height={height} alt={alt} src={img}></Image>
          </div>
          <p>{alt}</p>
          <div className='flex justify-between mt-4 font-bold'>
            {
              hasPrevious && <Link href={`/comic/${prevId}`}>
                <a className='text-gray-600'> 🔙 Prev</a>
              </Link>
            }
            {
              hasNext && <Link href={`/comic/${nextId}`}>
                <a className='text-gray-600'> Next 🔜</a>
              </Link>
            }
          </div>
        </section>
    </Layout>
  </>
}

export async function getStaticPaths ({locales}) {
  const files = await readdir('./comics');
  let paths = [];
  locales.forEach(locale => {
    const pathForLocale = files.map(file => {
      const id = basename(file, '.json');
      return {params:{id},locale}
    })
    paths = [...paths, ...pathForLocale]
  });
  return {
    paths: paths,
    fallback: false
  }
}

export async function getStaticProps({params:{id}}) {
  const comicFile = await readFile(`../comics/${id}.json`, 'utf8')
  const comic = JSON.parse(comicFile)
  const idNumber = +id;
  const prevId = idNumber - 1;
  const nextId = idNumber + 1;
  const [prevResult, nextResult] = await Promise.allSettled([
    stat(`./comics/${prevId}.json`),
    stat(`./comics/${nextId}.json`)
  ])
  const hasPrevious = prevResult.status === 'fulfilled';
  const hasNext = nextResult.status === 'fulfilled';
  return {
    props: {
      ...comic,
      hasPrevious,
      hasNext,
      prevId,
      nextId
    }
  }
}
