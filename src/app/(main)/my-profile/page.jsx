"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { authClient } from "@/lib/auth-client";

const MyProfilePage = () => {
      const router = useRouter();
      const { data: session, isPending } = authClient.useSession();
      const user = session?.user;

      useEffect(() => {
            if (!isPending && !user) {
                  router.push("/login");
            }
      }, [isPending, user, router]);

      if (isPending || !user) {
            return (
                  <div className="container mx-auto min-h-[70vh] flex items-center justify-center">
                        <span className="loading loading-spinner loading-lg"></span>
                  </div>
            );
      }

      return (
            <div className="container mx-auto py-10 px-4">
                  <div className="mx-auto max-w-2xl rounded-2xl bg-base-100 shadow-lg p-6 md:p-8">
                        <div className="flex flex-col md:flex-row items-center gap-6">
                              <div className="avatar">
                                    <div className="w-28 rounded-full">
                                          <Image
                                                src={user.image || "/user.png"}
                                                alt={user.name || "User"}
                                                width={112}
                                                height={112}
                                                unoptimized
                                                className="object-cover"
                                          />
                                    </div>
                              </div>

                              <div className="flex-1 text-center md:text-left space-y-2">
                                    <h1 className="text-3xl font-bold">My Profile</h1>
                                    <p className="text-base-content/70">
                                          View your account information below.
                                    </p>
                              </div>
                        </div>

                        <div className="mt-8 grid gap-4">
                              <div className="rounded-xl border border-base-300 p-4">
                                    <span className="text-sm text-base-content/60">Name</span>
                                    <p className="text-lg font-semibold">{user.name || "N/A"}</p>
                              </div>
                              <div className="rounded-xl border border-base-300 p-4">
                                    <span className="text-sm text-base-content/60">Email</span>
                                    <p className="text-lg font-semibold">{user.email || "N/A"}</p>
                              </div>
                              <div className="rounded-xl border border-base-300 p-4">
                                    <span className="text-sm text-base-content/60">Photo</span>
                                    <p className="text-lg font-semibold break-all">{user.image || "/user.png"}</p>
                              </div>
                        </div>

                        <div className="mt-8 flex justify-end">
                              <Link href="/my-profile/update" className="btn btn-primary">
                                    Update Information
                              </Link>
                        </div>
                  </div>
            </div>
      );
};

export default MyProfilePage;