import { useState, useEffect } from 'react';
import styles from '../styles/Home.module.css'
import PageLayout from './components/PageLayout';
export default function Home({ articles }) {

  return (
    <PageLayout title="NewsApp - Home">
      <div className={styles.container}>
        {articles.length === 0 && <p>🏍️Los hay articulos...</p>}
        {articles.length > 0 && articles.map((article, index) => (
          <div key={index}>
            <img 
              alt={`Image for the article ${article.title}`}
              src={article.urlToImage}
            />
            <h2>{article.title}</h2>
            <p>{article.description}</p>
          </div>
        ))}
      </div>
    </PageLayout>
  )
}
export async function getServerSideProps() {
  const response = await fetch('https://newsapi.org/v2/everything?q=tesla&from=2022-07-18&sortBy=publishedAt&apiKey=3e51a48d6496492389f2505c5e88bf36')
  const { articles } = await response.json()
  return {
    props: {
      articles
    }
  }
}
