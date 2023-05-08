import Head from 'next/head'
import Image from 'next/image'
import Login from '../components/Login'
import UserProfile from '../components/UserProfile'
import { useAuth } from '../context/AuthContext'

export default function Home() {
  const { currentUser } = useAuth()

  return (
    < >
      <Head>
      </Head>
      {!currentUser && <Login />}
      {currentUser && <UserProfile/>}
    </>
  )
}
