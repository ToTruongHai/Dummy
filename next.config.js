/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  i18n: {
    locales: ["vi", "en"],
    localeDetection: false,
    defaultLocale: "vi",
  },
};

module.exports = nextConfig;
