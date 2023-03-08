const { NextFederationPlugin } = require("@module-federation/nextjs-mf");
const mfConfig = require("./mf.config.js");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  i18n: {
    locales: ["vi", "en"],
    localeDetection: false,
    defaultLocale: "vi",
  },
  webpack: (config, options) => {
    const { isServer } = options;
    config.plugins.push(new NextFederationPlugin({ ...mfConfig(isServer) }));
    return config;
  },
};

module.exports = nextConfig;
