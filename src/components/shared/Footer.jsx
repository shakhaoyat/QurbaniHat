import Image from 'next/image';
import React from 'react';

const Footer = () => {
      return (
            <div className="container mx-auto">
                  <footer className="footer sm:footer-horizontal bg-base-200 text-base-content p-10">
                        <aside>
                              <Image
                                    width={40}
                                    height={40}
                                    src={"/logo.png"}
                                    alt="logo" />
                              <p>
                                    QurbaniHat
                                    <br />
                                    Livestock Booking Platform since 2026
                              </p>
                        </aside>
                        <nav>
                              <h6 className="footer-title">Services</h6>
                              <a className="link link-hover">Branding</a>
                              <a className="link link-hover">Design</a>
                              <a className="link link-hover">Marketing</a>
                              <a className="link link-hover">Advertisement</a>
                        </nav>
                        <nav>
                              <h6 className="footer-title">Company</h6>
                              <a className="link link-hover">About us</a>
                              <a className="link link-hover">Contact</a>
                              <a className="link link-hover">Jobs</a>
                              <a className="link link-hover">Press kit</a>
                        </nav>
                        <nav>
                              <h6 className="footer-title">Legal</h6>
                              <a className="link link-hover">Terms of use</a>
                              <a className="link link-hover">Privacy policy</a>
                              <a className="link link-hover">Cookie policy</a>
                        </nav>
                  </footer>
            </div>
      );
};

export default Footer;