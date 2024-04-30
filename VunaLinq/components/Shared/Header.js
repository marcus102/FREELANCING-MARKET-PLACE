/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import axios from 'axios'
// import useAuth from '../../hooks/useAuth'
import { CgMenuRight } from 'react-icons/cg'
import { AiOutlineClose } from 'react-icons/ai'
import { GrLogout } from 'react-icons/gr'
import { motion } from 'framer-motion'
import { RiMessage2Fill } from 'react-icons/ri'

const Header = () => {
  const [showMenu, setShowMenu] = useState(false)
  const [fixedMenu, setFixedMenu] = useState(false)
  // const { user, logOut } = useAuth()
  const gigs_button = "Gig's"
  const [thisUser, setThisUser] = useState({})

  // Loadded Loggined User Data
  // useEffect(() => {
  //   axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users/email/${1 > 0}`).then(
  //     (response) => {
  //       setThisUser(response?.data?.result)
  //     },
  //     (error) => {
  //       console.log(error)
  //     }
  //   )
  // }, [1 > 0])
  // Scrolling Effect here
  useEffect(() => {
    window.addEventListener('scroll', OnScrollHeader)
  }, [])
  const OnScrollHeader = (e) => {
    if (window.scrollY >= 200) {
      setFixedMenu(true)
    } else {
      setFixedMenu(false)
    }
  }
  // Soket io call here for notifications
  // useEffect(() => {
  //   const socket = io("http://localhost:6000");
  //   console.log(socket);
  // }, []);
  return (
    <motion.div
      initial={{ y: -100, opacity: 0, visibility: 'hidden' }}
      animate={{ y: 0, opacity: 1, visibility: 'visible' }}
      transition={{ duration: 0.5 }}
      className={`bg-[#2a3254] border-t-2 border-white transition-all ease-linear duration-500  py-3 ${
        fixedMenu
          ? 'fixed w-full left-0 top-0 z-40 border-none transition-all ease-linear duration-500'
          : 'transition-all ease-linear duration-500'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div>
            <Image
              src="/images/VunaLinq.png"
              width={100}
              height={80}
              alt="Logo of VunaLinq"
            />
          </div>
          {!showMenu && (
            <div className="inline-block lg:hidden">
              <span
                onClick={() => setShowMenu(!showMenu)}
                className="text-3xl cursor-pointer text-white transition-all duration-500 ease-linear"
              >
                <CgMenuRight />
              </span>
            </div>
          )}
          {showMenu && (
            <div className="text-3xl cursor-pointer text-white transition-all duration-500 ease-linear">
              😀
            </div>
          )}
          <div className="hidden lg:inline-block">
            <ul className="flex items-center">
              <li className="text-lg font-light  text-[white] ml-5">
                <Link href="/">Home</Link>
              </li>
              <li className="text-lg font-light text-[white] ml-5">
                <Link href="/gig_search">{gigs_button}</Link>
              </li>
              {1 > 0 && (
                <li className="text-lg font-light text-[white] ml-5">
                  <Link href="/profile">Profile</Link>
                </li>
              )}
              {1 > 0 && thisUser?.admin === 'admin' && (
                <li className="text-lg font-light text-[white] ml-5">
                  <Link href="/dashboard">Dashboard</Link>
                </li>
              )}
              <li className="text-lg font-light text-[white] ml-5">
                <Link href="/become&seller">Become A Seller</Link>
              </li>
              {1 > 0 && thisUser?.status === 'seller' && (
                <li className="text-lg font-light text-[white] ml-5">
                  <Link href="/gig_add">Create A gig</Link>
                </li>
              )}
              {1 > 0 && (
                <li className="text-2xl font-light text-[white] ml-5">
                  <Link href="/chat">
                    <RiMessage2Fill />
                  </Link>
                </li>
              )}
              {1 > 0 ? (
                <li className=" ml-5">
                  <button
                    id="login"
                    className="text-lg font-medium text-[#fff] flex items-center uppercase"
                    // onClick={logOut}
                  >
                    Logout{' '}
                    <GrLogout
                      style={{
                        paddingLeft: '5px',
                        fontSize: '25px',
                        color: 'white',
                      }}
                    />
                  </button>
                </li>
              ) : (
                <li className=" ml-5">
                  <Link href="/login">
                    <button
                      id="login"
                      className="text-lg font-bold text-[#fff] flex items-center uppercase"
                    >
                      Login{' '}
                      <GrLogout
                        style={{ paddingLeft: '10px', fontSize: '30px' }}
                        color="white"
                      />
                    </button>
                  </Link>
                </li>
              )}
            </ul>
          </div>
          <div
            className={`lg:hidden fixed top-0 ${
              showMenu
                ? 'left-0 transition-all ease-linear duration-300'
                : '-left-full transition-all ease-linear duration-300'
            } w-72 min-h-screen z-50 bg-white flex justify-start flex-col border-r-2 shado-lg shadow-[#ec489ab7] border-[#2a3254] hover:border-[#ec4899]`}
          >
            <div className="h-20 flex items-center text-2xl border-b-2 border-[#2a3254] hover:border-[#ec4899] text-[#2a3254] hover:text-[#ec4899] pr-5 justify-end ">
              <AiOutlineClose
                onClick={() => setShowMenu(!showMenu)}
                className="cursor-pointer"
              />
            </div>
            <div>
              <ul
                onClick={() => setShowMenu(!showMenu)}
                className="flex items-center flex-col"
              >
                {1 > 0 && (
                  <li className="text-2xl font-light text-[#2a3254] py-3">
                    <Link href="/chat">
                      <RiMessage2Fill />
                    </Link>
                  </li>
                )}
                <li className="text-lg font-light text-[#2a3254] py-3">
                  <Link href="/">Home</Link>
                </li>
                <li className="text-lg font-light text-[#2a3254] py-3">
                  <Link href="/gig_search">{gigs_button}</Link>
                </li>
                {1 > 0 && (
                  <li className="text-lg font-light text-[#2a3254] py-3">
                    <Link href="/profile">Profile</Link>
                  </li>
                )}
                {1 > 0 && thisUser?.admin === 'admin' && (
                  <li className="text-lg font-light text-[#2a3254] py-3">
                    <Link href="/dashboard">Dashboard</Link>
                  </li>
                )}
                <li className="text-lg font-light text-[#2a3254] py-3">
                  <Link href="/become&seller">Become A Seller</Link>
                </li>
                {1 > 0 && thisUser?.status === 'seller' && (
                  <li className="text-lg font-light text-[#2a3254] py-3">
                    <Link href="/gig_add">Create A gig</Link>
                  </li>
                )}
              </ul>
            </div>
            <div className="border-t-2 border-[#2a3254] hover:border-[#ec4899] mt-2 pt-5 flex items-center justify-center flex-col text-center">
              {1 > 0 ? (
                <>
                  <div>l</div>
                </>
              ) : (
                <div>
                  <Link href="/login">
                    <button className="text-lg font-bold text-[#2a3254] flex items-center uppercase">
                      Login{' '}
                      <GrLogout
                        style={{ paddingLeft: '10px', fontSize: '30px' }}
                      />
                    </button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default Header
//  <div>
//                 <button
//                   className="text-lg mx-auto font-bold text-[#2a3254] flex items-center uppercase"
//                   // onClick={logOut}
//                 >
//                   Logout{' '}
//                   <GrLogout
//                     style={{ paddingLeft: '10px', fontSize: '30px' }}
//                   />
//                 </button>
//                 {user?.displayName && (
//                   <button className="text-xl flex text-center justify-center font-light text-[#2a3254] pt-3">
//                     {user?.displayName}
//                   </button>
//                 )}
//               </div>
