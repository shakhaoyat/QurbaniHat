"use client"
import Image from 'next/image';
import React from 'react';
import NavLink from './NavLink';
import Link from 'next/link';



const Navber = () => {



      return (
            <div >
                  <div className="navbar bg-base-100 shadow-sm container mx-auto">
                        <div className="navbar-start">
                              <div className="dropdown">
                                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                                    </div>
                                    <ul
                                          tabIndex="-1"
                                          className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                                          <li><NavLink href={"/"} >Home</NavLink></li>
                                          <li><NavLink href={"/all-animals"} >All Animals</NavLink></li>
                                    </ul>
                              </div>
                              <div className="flex items-center">
                                    <Image
                                          width={40}
                                          height={40}
                                          src={"/logo.png"}
                                          alt="logo" />
                                    <a className="btn btn-ghost text-xl">Qurbanihat</a>
                              </div>
                        </div>
                        <div className="navbar-center hidden lg:flex">
                              <ul className="menu menu-horizontal px-1">
                                    <li><NavLink href={"/"} >Home</NavLink></li>
                                    <li><NavLink href={"/all-animals"} >All Animals</NavLink></li>
                              </ul>
                        </div>
                        <div className="navbar-end gap-2 ">
                              <Link href="/login" className="btn">
                                    Login
                              </Link>
                              <Link href="/register" className="btn">
                                    Register
                              </Link>
                        </div>
                  </div>


            </div>
      );
};

export default Navber;