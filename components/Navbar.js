import Link from 'next/link';
import React from 'react'

const Navbar = () => {
  return (
    <nav className=" flex items-center h-10 bg-purple-700 justify-end px-10">
      <ul className="flex w-fit items-center gap-4">
        <li>
          <Link href="/"> Home</Link>
        </li>
        <li>
          <Link href="/about"> About</Link>
        </li>
        <li>
          <Link href="/shortner"> Shortner</Link>
        </li>
        <li>
          <Link href="/contact"> Contact Us</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar
