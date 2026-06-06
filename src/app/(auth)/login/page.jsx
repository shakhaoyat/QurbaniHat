"use client";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { toast } from "react-toastify";

const LoginPage = () => {
      const handleGoogleSignin = async () => {
            const data = await authClient.signIn.social({
                  provider: "google",
            });

            console.log(data, "data");
      };

      const {
            register,
            handleSubmit,
            watch,
            formState: { errors },
      } = useForm();

      const [isShowPassword, setIsShowPassword] = useState(false);

      const handleLoginFunc = async (data) => {
            console.log(data, "data");

            const { data: res, error } = await authClient.signIn.email({
                  email: data.email, // required
                  password: data.password, // required
                  rememberMe: true,
                  callbackURL: "/",
            });

            console.log(res, error);

            if (error) {
                  toast.error(error.message || "Signin failed");
                  return;
            }

            if (res) {
                  toast.success("Signin successful");
            }
      };

      return (
            <div className="container mx-auto min-h-[80vh] flex justify-center items-center bg-slate-100">
                  <div className="p-4 rounded-xl bg-white">
                        <h2 className="font-bold text-3xl text-center mb-6">
                              Login your account
                        </h2>

                        <form className="space-y-4" onSubmit={handleSubmit(handleLoginFunc)}>
                              <fieldset className="fieldset">
                                    <legend className="fieldset-legend">Email</legend>
                                    <input
                                          type="email"
                                          className="input"
                                          placeholder="Type here email"
                                          {...register("email", {
                                                required: "Email field is required",
                                          })}
                                    />
                                    {errors.email && (
                                          <p className="text-red-500">{errors.email.message}</p>
                                    )}
                              </fieldset>
                              <fieldset className="fieldset relative">
                                    <legend className="fieldset-legend">Password</legend>
                                    <input
                                          type={isShowPassword ? "text" : "password"}
                                          className="input"
                                          placeholder="Type here password"
                                          {...register("password", {
                                                required: "Password field is required",
                                          })}
                                    />
                                    <span
                                          className="absolute right-2 top-4 cursor-pointer"
                                          onClick={() => setIsShowPassword(!isShowPassword)}
                                    >
                                          {isShowPassword ? <FaEye /> : <FaEyeSlash />}
                                    </span>
                                    {errors.password && (
                                          <p className="text-red-500">{errors.password.message}</p>
                                    )}
                              </fieldset>

                              <button className="btn w-full bg-slate-800 text-white">Login</button>
                        </form>

                        <p className="mt-4">
                              Don't have an account?{" "}
                              <Link href={"/register"} className="text-blue-500">
                                    Register
                              </Link>
                        </p>

                        <button
                              className="btn border-blue-500 text-blue-500 inline-flex gap-2 mt-4 w-full"
                              onClick={handleGoogleSignin}
                        >
                              <FaGoogle />
                              Login with google
                        </button>
                  </div>
            </div>
      );
};

export default LoginPage;