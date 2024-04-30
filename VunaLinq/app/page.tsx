'use client'
import Image from 'next/image'

/* eslint-disable @next/next/no-img-element */
import Head from 'next/head'
import Banner from '../components/Home/Banner'
import Feature from '../components/Home/Feature'
import HomeServicesSlider from '../components/Home/HomeServicesSlider'
import Footer from '../components/Shared/Footer'
import Header from '../components/Shared/Header'
import HowWeWorks from '../components/HowWeWorks/Howweworks'
// import Topseller from "../components/Shared/Topseller";
import Devices from '../components/Home/Devices'
import Categories from '../components/Home/Categories'
import HeaderTop from '../components/Shared/HeaderTop'
import Counter from '../components/Home/Counter'
import HowItWorks from '../components/Home/HowItWorks'
import TryIt from '../components/Home/TryIt'
import Growing from '../components/Home/Growing'
import HeaderBottom from '../components/Shared/HeaderBottom'
import React, { useState, useEffect } from 'react'
// import MessengerCustomerChat from "react-messenger-customer-chat/lib/MessengerCustomerChat";

export default function Home() {
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 3000)
  }, [])
  return (
    <div className="feature-font">
      <Head>
        <title>VunaLinq</title>
        <meta
          name="description"
          content="A freelance marketplace for veritas students"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header>
        <div>
          <HeaderTop />
          <Header />
          <HeaderBottom />
        </div>
      </header>
      {loading && (
        <div
          style={{ minHeight: '90vh' }}
          className="flex items-center justify-center"
        >
          <span className="main-loader"></span>
        </div>
      )}
      {!loading && (
        <main>
          <div>
            <Banner />
            <Categories />
            <HowWeWorks />
            {/* <BreakdownFirst />
          <BreakdownSecond /> */}

            <Growing />
            <Counter />
            <HowItWorks />
            <TryIt />
          </div>
          <div>
            {/* <HomeServicesSlider />s */}
            <Devices />
            <Feature />
            {/* <HowItWorks /> */}
          </div>
        </main>
      )}
      <footer>
        <Footer />
      </footer>
      {/* <section className="messenger">
        <MessengerCustomerChat
          pageId="101344009267235"
          appId="705236444144347"
        />
      </section> */}
    </div>
  )
}
