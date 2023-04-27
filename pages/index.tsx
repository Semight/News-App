import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css' 
import { GetServerSideProps } from 'next'
import { NewsArticle, NewsResponse } from '@/models/NewsArticles'
import NewsArticleEntry from '@/components/NewsArticleEntry'
import NewsArticlesGrid from '@/components/NewsArticlesGrid'
import { Alert } from 'react-bootstrap'

interface BreakingNewsPageProps {
  newsArticles: NewsArticle[],
}

export const getServerSideProps: GetServerSideProps<BreakingNewsPageProps> = async () => {
  const response = await fetch(`https://newsapi.org/v2/everything?q=bitcoin&apiKey=${process.env.NEXT_PUBLIC_NEWS_API_KEY}`);
  const newsResponse: NewsResponse = await response.json();
  return {
    props: { newsArticles: newsResponse?.articles }
  }
    // let error go to 500 page
}

export default function BreakingNewsPage({newsArticles} : BreakingNewsPageProps) {
  
  console.log("This is news article", newsArticles);
  return (
    <>
      <Head>
        <title key="title">Breaking News - NextJS News App</title>
      </Head>
      <main>
        <h1>Breaking News</h1>
        <Alert>
          This Page uses <strong>getServerSideProps</strong> to fetch data server-side on every request. This allows search engine to crawl the page content and <strong>improves SEO.</strong>
        </Alert>
        <NewsArticlesGrid articles={newsArticles}/> 
      </main>
    </>
  )
}
