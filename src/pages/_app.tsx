import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import HomePage from "../components/HomePage"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
    <Component {...pageProps} />
    <HomePage/>
    </>
  ) 
}
