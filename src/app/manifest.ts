import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Fitness App - Your Path to a Healthier You",
    description:
      "Discover a wide range of workout programs designed to help you achieve your fitness goals. Join our community and embark on a journey to better health and wellness.",
    theme_color: "#2563EB",
    icons: [
      { type: "apple-touch-icon", src: "/icon-512x512.png" },
      { type: "shortcut icon", src: "/favicon.ico" },
    ],
    display: "standalone",
    background_color: "#2563EB",
    start_url: "/",
    categories: [
      "fitify",
      "workout",
      "workout app",
      "workout program",
      "custom workout Routine",
      "workout app",
    ],
  };
}
