import { useState, useEffect } from 'react';
import styles from '../styles/Home.module.css'
import PageLayout from './components/PageLayout';
export default function Home() {
  const [ articles, setArticles ] = useState([])
  useEffect(()=>{
    fetch('')
      .then(response=>response.json())
      .then(response => {
        const { articles } = response
        setArticles(articles)
      })
  },[])
  return (
    <PageLayout title="NewsApp - Home">
      <div className={styles.container}>
        {articles.length === 0 && <p>🏍️Loading...</p>}
        {articles.length > 0 && articles.map((article, index) => (
          <article key={index}>
            <img 
              alt={`Image for the article ${article.title}`}
              src={article.urlToImage}
            />
            <h2>{article.title}</h2>
            <p>{article.description}</p>
          </article>
        ))}
      </div>
    </PageLayout>
  )
}
