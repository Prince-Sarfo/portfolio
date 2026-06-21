import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Prince Sarfo — Full-Stack Developer",
    short_name: "Prince Sarfo",
    description:
      "Full-stack developer building fast, accessible, and beautiful web experiences.",
    start_url: "/",
    display: "standalone",
    background_color: "#09090b",
    theme_color: "#06b6d4",
    icons: [
      {
        src: "/profile.png",
        sizes: "1024x1024",
        type: "image/png",
      },
    ],
  };
}
