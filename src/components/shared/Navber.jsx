"use client"
import Image from 'next/image';
import React from 'react';
import NavLink from './NavLink';
import Link from 'next/link';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';



const Navber = () => {
      const router = useRouter();
      const { data: session, isPending } = authClient.useSession();
      const user = session?.user;
      const avatarSrc = user?.image || '/user.png';

      const handleLogout = async () => {
            await authClient.signOut();
            router.refresh();
            router.push('/login');
      };



      return (
            <div >
                  <div className="navbar bg-green-300 shadow-sm container mx-auto ">
                        <div className="navbar-start">
                              <div className="dropdown">
                                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                                          {/* eslint-disable-next-line @next/next/no-img-element */}
                                          <img
                                                src={avatarSrc}
                                                alt={user?.name || 'User avatar'}
                                                className="h-8 w-8 rounded-full object-cover"
                                          />
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
                              {isPending ? (
                                    <span className="loading loading-spinner loading-sm"></span>
                              ) : user ? (
                                    <div className="flex items-center gap-3">
                                          <div className="flex items-center gap-2">
                                                <div className="avatar">
                                                      <div className="w-10 rounded-full">
                                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                                            <img
                                                                  src={avatarSrc}
                                                                  alt={user.name || "User"}
                                                                  className="h-10 w-10 object-cover"
                                                            />
                                                      </div>
                                                </div>
                                                <div className="flex flex-col leading-tight">
                                                      <span className="text-sm text-base-content/60">Hello</span>
                                                      <span className="font-semibold">{user.name}</span>
                                                </div>
                                          </div>
                                          <Link href="/my-profile" className="btn btn-outline">
                                                My Profile
                                          </Link>
                                          <button onClick={handleLogout} className="btn btn-outline btn-error">
                                                Logout
                                          </button>
                                    </div>
                              ) : (
                                    <>
                                          <Link href="/login" className="btn">
                                                Login
                                          </Link>
                                          <Link href="/register" className="btn">
                                                Register
                                          </Link>
                                    </>
                              )}
                        </div>
                  </div>


            </div>
      );
};

export default Navber;