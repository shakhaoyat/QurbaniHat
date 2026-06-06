"use client";

import React from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";

const BookingForm = ({ animalName }) => {
      const { data: session, isPending } = authClient.useSession();
      const user = session?.user;

      const {
            register,
            handleSubmit,
            reset,
            formState: { errors },
      } = useForm({
            defaultValues: {
                  name: "",
                  email: "",
                  phone: "",
                  address: "",
            },
      });

      const handleBooking = async () => {
            reset();
            toast.success(`Booking request for ${animalName || "this animal"} submitted successfully`);
      };

      if (isPending) {
            return (
                  <div className="card bg-base-100 shadow-xl">
                        <div className="card-body min-h-75 flex items-center justify-center">
                              <span className="loading loading-spinner loading-lg"></span>
                        </div>
                  </div>
            );
      }

      if (!user) {
            return (
                  <div className="card bg-base-100 shadow-xl">
                        <div className="card-body md:p-8">
                              <div className="alert alert-warning">
                                    <span>You need to login first to book this animal.</span>
                              </div>
                              <h2 className="card-title text-2xl mt-2">Booking Form</h2>
                              <p className="text-base-content/70">
                                    Login to continue with your booking request.
                              </p>
                              <div className="card-actions justify-end mt-4">
                                    <Link href="/login" className="btn btn-primary">
                                          Login Required
                                    </Link>
                              </div>
                        </div>
                  </div>
            );
      }

      return (
            <div className="card bg-base-100 shadow-xl">
                  <div className="card-body md:p-8">
                        <div className="flex items-start justify-between gap-4">
                              <div>
                                    <h2 className="card-title text-2xl">Booking Form</h2>
                                    <p className="text-base-content/70 mt-2">
                                          Submit your booking request for {animalName || "this animal"}.
                                    </p>
                              </div>
                              <div className="badge badge-primary badge-outline">Secure</div>
                        </div>

                        <form className="mt-6 space-y-4" onSubmit={handleSubmit(handleBooking)}>
                              <label className="form-control w-full">
                                    <div className="label">
                                          <span className="label-text font-medium">Name</span>
                                    </div>
                                    <input
                                          type="text"
                                          className="input input-bordered w-full"
                                          placeholder="Your name"
                                          defaultValue={user.name || ""}
                                          {...register("name", {
                                                required: "Name is required",
                                          })}
                                    />
                                    {errors.name && (
                                          <div className="label">
                                                <span className="label-text-alt text-error">{errors.name.message}</span>
                                          </div>
                                    )}
                              </label>

                              <label className="form-control w-full">
                                    <div className="label">
                                          <span className="label-text font-medium">Email</span>
                                    </div>
                                    <input
                                          type="email"
                                          className="input input-bordered w-full"
                                          placeholder="Your email"
                                          defaultValue={user.email || ""}
                                          {...register("email", {
                                                required: "Email is required",
                                          })}
                                    />
                                    {errors.email && (
                                          <div className="label">
                                                <span className="label-text-alt text-error">{errors.email.message}</span>
                                          </div>
                                    )}
                              </label>

                              <label className="form-control w-full">
                                    <div className="label">
                                          <span className="label-text font-medium">Phone</span>
                                    </div>
                                    <input
                                          type="tel"
                                          className="input input-bordered w-full"
                                          placeholder="Phone number"
                                          {...register("phone", {
                                                required: "Phone is required",
                                          })}
                                    />
                                    {errors.phone && (
                                          <div className="label">
                                                <span className="label-text-alt text-error">{errors.phone.message}</span>
                                          </div>
                                    )}
                              </label>

                              <label className="form-control w-full">
                                    <div className="label">
                                          <span className="label-text font-medium">Address</span>
                                    </div>
                                    <textarea
                                          className="textarea textarea-bordered w-full min-h-28"
                                          placeholder="Your address"
                                          {...register("address", {
                                                required: "Address is required",
                                          })}
                                    />
                                    {errors.address && (
                                          <div className="label">
                                                <span className="label-text-alt text-error">{errors.address.message}</span>
                                          </div>
                                    )}
                              </label>

                              <div className="card-actions justify-end pt-2">
                                    <button className="btn btn-primary w-full bg-amber-500" type="submit">
                                          Booking Submit
                                    </button>
                              </div>
                        </form>
                  </div>
            </div>
      );
};

export default BookingForm;