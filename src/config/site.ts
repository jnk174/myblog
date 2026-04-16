export const siteConfig = {
  name: "Gill's Log",
  description: "배우고, 기록하고, 성장하는 것을 좋아하는 사람의 학습 일지입니다.",
  url: "https://gill-log.vercel.app",
  ogImage: "https://gill-log.vercel.app/og-image.png", // Ensure this exists or point to a default
  links: {
    github: "https://github.com/jnk174", // Adjust if known
    email: "jnk174@gmail.com",
  },
  author: "Gill",
};

export type SiteConfig = typeof siteConfig;
