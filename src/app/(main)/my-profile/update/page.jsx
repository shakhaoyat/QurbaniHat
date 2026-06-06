"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";

const UpdateProfilePage = () => {
      const router = useRouter();
      const { data: session, isPending } = authClient.useSession();
      const user = session?.user;
      const [isSaving, setIsSaving] = useState(false);

      const {
            register,
            handleSubmit,
            reset,
            formState: { errors },
      } = useForm({
            defaultValues: {
                  name: "",
                  image: "",
            },
      });

      useEffect(() => {
            if (user) {
                  reset({
                        name: user.name || "",
                        image: user.image || "",
                  });
            }
      }, [user, reset]);

      useEffect(() => {
            if (!isPending && !user) {
                  router.push("/login");
            }
      }, [isPending, user, router]);

      const handleUpdate = async (data) => {
            setIsSaving(true);
            const { data: updatedUser, error } = await authClient.updateUser({
                  name: data.name,
                  image: data.image,
            });

            setIsSaving(false);

            if (error) {
                  toast.error(error.message || "Failed to update profile");
                  return;
            }

            if (updatedUser) {
                  toast.success("Profile updated successfully");
                  router.push("/my-profile");
                  router.refresh();
            }
      };

      if (isPending || !user) {
            return (
                  <div className="container mx-auto min-h-[70vh] flex items-center justify-center">
                        <span className="loading loading-spinner loading-lg"></span>
                  </div>
            );
      }

      return (
            <div className="container mx-auto py-10 px-4">
                  <div className="mx-auto max-w-xl rounded-2xl bg-base-100 shadow-lg p-6 md:p-8">
                        <div className="flex items-center gap-4 mb-8">
                              <div className="avatar">
                                    <div className="w-16 rounded-full">
                                          <Image
                                                src={user.image || "/user.png"}
                                                alt={user.name || "User"}
                                                width={64}
                                                height={64}
                                                unoptimized
                                                className="object-cover"
                                          />
                                    </div>
                              </div>
                              <div>
                                    <h1 className="text-3xl font-bold">Update Information</h1>
                                    <p className="text-base-content/70">Edit your name and profile image.</p>
                              </div>
                        </div>

                        <form className="space-y-5" onSubmit={handleSubmit(handleUpdate)}>
                              <fieldset className="fieldset">
                                    <legend className="fieldset-legend">Name</legend>
                                    <input
                                          type="text"
                                          className="input w-full"
                                          placeholder="Your name"
                                          {...register("name", {
                                                required: "Name field is required",
                                          })}
                                    />
                                    {errors.name && (
                                          <p className="text-red-500 text-sm">{errors.name.message}</p>
                                    )}
                              </fieldset>

                              <fieldset className="fieldset">
                                    <legend className="fieldset-legend">Image</legend>
                                    <input
                                          type="url"
                                          className="input w-full"
                                          placeholder="Image URL"
                                          {...register("image", {
                                                required: "Image URL field is required",
                                          })}
                                    />
                                    {errors.image && (
                                          <p className="text-red-500 text-sm">{errors.image.message}</p>
                                    )}
                              </fieldset>

                              <button className="btn btn-primary w-full" disabled={isSaving}>
                                    {isSaving ? "Updating..." : "Update Information"}
                              </button>
                        </form>
                  </div>
            </div>
      );
};

export default UpdateProfilePage;