import Head from 'next/head'
import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/Home.module.css'
import { Container } from '@nextui-org/react';
import { Header }  from '../components/Header';
import fs from 'fs/promises';
export default function Home({latestComics}) {
  return (
    <>
      <Header></Header>
      <main>
        <h2 className='text-3xl font-bold text-center mb-10'>Latest Comics</h2>
        <section className='grid grid-cols-2 gap-2 max-w-md m-auto'>
          {latestComics.map( comic => {
            return (
              <Link href={`/comic/${comic.id}`} key={comic.id}>
                <a className='mb-4 pb-4'>
                  <h3 className='font-bold text-sm text-center pb-2'>{comic.title}</h3>
                  <Image width='300' height='300' layout="intrinsic" objectFit='contain' src={comic.img} alt={comic.alt}></Image>
                </a>
              </Link>
            )
          })}
        </section>
      </main>
    </>
  )
}
export async function getStaticProps(context) {
  const files = await fs.readdir('./comics');
  const latestComicsFiles = files.slice(-8, files.length);
  const readFiles = latestComicsFiles.map(async (file)=> {
    const content = await fs.readFile(`./comics/${file}`, 'utf8')
    return JSON.parse(content)
  })
  const latestComics = await Promise.all(readFiles)
  return {
    props: {
      latestComics
    }
  }
}
