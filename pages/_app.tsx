import '../styles/globals.css'
import "@fortawesome/fontawesome-free/css/all.min.css";
import Loading from "./components/Loading/Loading.js";

import Head from "next/head";

import ProtectedRoutes from './interceptors/ProtectedRoutes.js';
import type { AppProps } from 'next/app'
import {useState, useEffect} from 'react'


export default function App({ Component, pageProps, router }: AppProps) {
  
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    router.events.on('routeChangeStart', (e,url) => {
      setLoading(true);
    });
    router.events.on('routeChangeComplete', (e,url) => {
      setLoading(false);
    });
  }, []);

  return (
    <>
    <ProtectedRoutes router={router} pathname={router.pathname}>
      <Head>
        <title>Dummy Clinic</title>
        {/* <link rel="icon" href="/img/thumbnail/logo-home.png" /> */}
      </Head>
      { ( loading ? <Loading/> : null ) }
      <Component {...pageProps} />
    </ProtectedRoutes>
    </>
  )
  
}
