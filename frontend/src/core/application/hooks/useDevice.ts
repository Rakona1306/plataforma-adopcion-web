"use client";

import { useEffect, useState } from "react";

export type DeviceType = "desktop" | "tablet" | "mobile";

export const useDevice = () => {
  const [device, setDevice] = useState<DeviceType>("desktop");
  const [width, setWidth] = useState<number>(0);

  useEffect(() => {
    const handleResize = () => {
      const currentWidth = window.innerWidth;

      setWidth(currentWidth);

      if (currentWidth < 768) {
        setDevice("mobile");
      } else if (currentWidth < 1024) {
        setDevice("tablet");
      } else {
        setDevice("desktop");
      }
    };

    // Ejecutar una vez al montar
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return {
    device,
    width,
  };
};