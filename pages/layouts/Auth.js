import React from "react";
import Head from 'next/head'

export default function Auth ({ children }) {
  return (
    <div>
      <Head>
        <title>Clinic Dummy</title>
        <link rel="icon" href="/img/thumbnail/logo-home.png" />
      </Head>
      <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 px-6 lg:px-8">
        {children}
      </div>
    </div>
  );
}
