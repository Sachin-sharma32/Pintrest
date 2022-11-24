import Head from 'next/head'
import Image from 'next/image'
import Feed from '../components/Feed'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
   <div className='mx-auto px-10 py-4'>
      <Feed/>
   </div>
  )
}
