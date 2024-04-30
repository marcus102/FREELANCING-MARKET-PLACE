/* eslint-disable @next/next/no-img-element */
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <section className="bg-gray-900 py-3">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-7 gap-8 py-6">
          <div className="md:col-span-3">
            <div>
              <Image
                src="/images/VunaLinq.png"
                width={100}
                height={80}
                alt="Logo of VunaLinq"
              />
            </div>
            <div>
              <p className="text-gray-400 font-medium py-2 text-lg">
                Veritas University, Nigeria
              </p>
              <p className="text-gray-400 font-medium py-1 text-lg">
                support@VunaLinqlancer.com
              </p>
              <div className="flex items-stretch justify-between pt-5">
                <input
                  className="w-9/12 text-lg font-medium py-2 px-2"
                  type="text"
                  placeholder="Your email address"
                />
                <button className="w-3/12 bg-[#6787fe] flex items-center justify-center text-white text-center ">
                  Sign Up
                </button>
              </div>
            </div>
          </div>
          <div className="col-span-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 mx-auto">
            <div>
              <strong className="text-white font-medium text-2xl border-b border-[#e83a3b]pb-2 mb-4">
                Services
              </strong>
              <ul>
                <li className="block pb-2">
                  <Link
                    className="no-underline hover:underline hover:text-[#6787fe] text-lg mt-4 font-medium text-gray-400"
                    href="/become&seller"
                  >
                    Become a Seller
                  </Link>
                </li>
                <li className="block pb-2">
                  <Link
                    className="no-underline hover:underline hover:text-[#6787fe] text-lg font-medium text-gray-400"
                    href="/gig_add"
                  >
                    Create a Gig
                  </Link>
                </li>
                <li className="block pb-2">
                  <Link
                    className="no-underline hover:underline hover:text-[#6787fe] text-lg font-medium text-gray-400"
                    href="/profile"
                  >
                    Your Profile
                  </Link>
                </li>
                <li className="block pb-2">
                  <Link
                    className="no-underline hover:underline hover:text-[#6787fe] text-lg font-medium text-gray-400"
                    href="/jobCreate"
                  >
                    Make a Job
                  </Link>
                </li>
                <li className="block pb-2">
                  <Link
                    className="no-underline hover:underline hover:text-[#6787fe] text-lg font-medium text-gray-400"
                    href="/search_job"
                  >
                    Job Searcing
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <strong className="text-white font-medium text-2xl border-b border-[#6787fe]pb-2 mb-4">
                Community
              </strong>
              <ul>
                <li className="block pb-2">
                  <Link
                    className="no-underline hover:underline hover:text-[#6787fe] text-lg mt-4 font-medium text-gray-400"
                    href="/community"
                  >
                    Community
                  </Link>
                </li>
                <li className="block pb-2">
                  <Link
                    className="no-underline hover:underline hover:text-[#6787fe] text-lg mt-4 font-medium text-gray-400"
                    href="/support"
                  >
                    Support
                  </Link>
                </li>
                <li className="block pb-2">
                  <Link
                    className="no-underline hover:underline hover:text-[#6787fe] text-lg mt-4 font-medium text-gray-400"
                    href="/about"
                  >
                    About
                  </Link>
                </li>
                <li className="block pb-2  text-gray-400">
                  <Link href="#">Our Team</Link>
                </li>
              </ul>
            </div>
            <div>
              <img
                className="border-2 rounded-lg"
                src="https://i.ibb.co/ryn5btD/flat-customer-support-illustration-23-2148899114.png"
                alt="pic"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-400 py-2">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between flex-wrap">
            <div>
              <p className="text-[#6787fe]">
                Copyright © 2024 || All Rights Reserved by Team Gamma.
              </p>
            </div>
            <div className="text-right">
              {/* <img className="rounded-md" src="/footer/paypal.png" alt="" /> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Footer
