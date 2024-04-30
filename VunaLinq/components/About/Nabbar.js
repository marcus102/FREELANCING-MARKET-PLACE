import Link from 'next/link'
import React from 'react'

const Nabbar = () => {
  return (
    <div>
      <div className="p-12">
        <ul className="lg:flex justify-center text-base font-semibold">
          <div>
            <Link className="text-2xl font-medium py-6 px-8" href="#">
              Who We Are
            </Link>
          </div>
          <div>
            <Link className="text-2xl font-medium py-6 px-8" href="#">
              Meet Our Team
            </Link>
          </div>
        </ul>
      </div>
    </div>
  )
}

export default Nabbar
