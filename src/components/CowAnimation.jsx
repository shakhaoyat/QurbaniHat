"use client";

import React, { useEffect, useState } from "react";
import Lottie from "lottie-react";

export default function CowAnimation({ className }) {
      // animationData: undefined = loading, object = animation, null = failed -> use fallback
      const [animationData, setAnimationData] = useState(undefined);

      useEffect(() => {
            let mounted = true;
            fetch("/cow.json")
                  .then((res) => {
                        if (!res.ok) throw new Error("no animation");
                        return res.json();
                  })
                  .then((json) => {
                        if (mounted) setAnimationData(json);
                  })
                  .catch(() => {
                        if (mounted) setAnimationData(null);
                  });

            return () => {
                  mounted = false;
            };
      }, []);

      if (animationData === undefined) {
            return (
                  <div className={className || "h-64 w-full flex items-center justify-center bg-base-200"}>
                        <span className="loading loading-spinner loading-lg"></span>
                  </div>
            );
      }

      if (animationData === null) {
            return (
                  <div className={className || "h-64 w-full flex items-center justify-center bg-base-200"}>
                        <img src="/cow-fallback.svg" alt="cow fallback" className="h-full w-full object-contain" />
                  </div>
            );
      }

      return (
            <div className={className || "h-64 w-full"}>
                  <Lottie animationData={animationData} loop={true} />
            </div>
      );
}
