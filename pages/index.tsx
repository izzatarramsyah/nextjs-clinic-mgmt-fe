import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import { useRouter } from 'next/router'
import { useEffect } from 'react';

// serivces
import { userService } from "../services/UserServices.js";

export default function Home() {
  const router = useRouter();
  return (
    useEffect(() => {
      if (userService.userValue) {
        router.push('/admin/DataPatient');
      } else {
        router.push('/auth/Login');
      }
    })
  )
}
