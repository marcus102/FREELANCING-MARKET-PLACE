import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import useAuth from '../../hooks/useAuth'

const SellerHeader = () => {
  const [showBg, setShowBg] = useState(false)
  const { user, logOut } = useAuth()
  useEffect(() => {
    window.addEventListener('scroll', OnScrollHeader)
  }, [])
  const OnScrollHeader = (e) => {
    if (window.scrollY >= 100) {
      setShowBg(true)
    } else {
      setShowBg(false)
    }
  }
  return (
    <div style={{ zIndex: '1000' }} className="fixed top-0 left-0 w-full ">
      <nav className="bg-stone-800">
        <div className="container m-auto flex justify-between items-center text-gray-700">
          <div className="flex items-center ">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="w-36 cursor-pointer  py-4"
              src="navbar/image/logo-white.png"
              alt=""
            />
            <form
              action="#"
              onSubmit={(e) => {
                e.preventDefault()
              }}
            >
              <input
                className="p-2 ml-4 lg:w-72 md:w-64 rounded-tl-md rounded-bl-md focus:outline-0"
                type="text"
                placeholder="Search your services"
              />
              <button className="p-2 bg-[#19A463] text-white px-4 rounded-tr-md rounded-br-md">
                Search
              </button>
            </form>
          </div>
          <ul className="hidden md:flex items-center  text-base font-semibold text-white cursor-pointer">
            <Link className="hover:text-red-500 text-lg py-4 px-6" href="/">
              Home
            </Link>

            <Link
              className="hover:text-red-500 text-lg py-4 px-6"
              href="/become&seller"
            >
              Become a Seller
            </Link>

            {1 > 2 ? (
              <button
                onClick={logOut}
                className="bg-green-600 text-lg hover:bg-red-500 translate-all transition duration-300 rounded-md font-bold py-1 px-4 border-0 shadow ring-1 ring-red-300"
              >
                Sign Out
              </button>
            ) : (
              <>
                {' '}
                <Link className="hover:text-white" href="/login">
                  <button className="bg-transparent text-lg hover:bg-green-600 translate-all transition duration-300 rounded-md font-bold py-1 px-4 ring-1 ring-lime-400 shadow">
                    Sign In
                  </button>
                </Link>
                <Link className="hover:text-white" href="/login/register">
                  <button className="bg-transparent hover:bg-green-600 translate-all transition duration-300 rounded-md font-bold py-1 mx-2 px-4 ring-2 ring-lime-400 shadow">
                    Join
                  </button>
                </Link>
              </>
            )}
          </ul>
          <button className="block md:hidden py-3 px-4 mx-2 rounded focus:outline-none hover:bg-gray-200 group">
            <div className="w-5 h-1 bg-gray-600 mb-1"></div>
            <div className="w-5 h-1 bg-gray-600 mb-1"></div>
            <div className="w-5 h-1 bg-gray-600"></div>
            <div
              className="absolute top-0 -right-full h-screen w-8/12 bg-lime-400 border opacity-0
  group-focus:right-0 group-focus:opacity-100 transition-all duration-300"
            >
              <ul className="flex flex-col items-end w-full text-base cursor-pointer pt-10">
                <Link
                  className="hover:text-red-500 mr-10 text-lg pt-6 pb-2 px-6"
                  href="/"
                >
                  Home
                </Link>
                <Link
                  className="hover:text-red-500 mr-10 text-lg pt-6 pb-2 px-6"
                  href="/"
                >
                  Contact
                </Link>
                <Link
                  className="hover:text-red-500 mr-10 text-lg pt-6 pb-2 px-6"
                  href="/"
                >
                  Services
                </Link>
                <Link
                  className="hover:text-red-500 mr-10 text-lg pt-6 pb-2 px-6"
                  href="/"
                >
                  About
                </Link>
              </ul>
            </div>
          </button>
        </div>
      </nav>
    </div>
  )
}

export default SellerHeader
