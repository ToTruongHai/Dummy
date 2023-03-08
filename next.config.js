const { NextFederationPlugin } = require("@module-federation/nextjs-mf");
const mfConfig = require("./mf.config.js");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  future: {
    webpack5: true,
  },
  webpack: (config, options) => {
    const { isServer } = options;
    config.plugins.push(new NextFederationPlugin({ ...mfConfig(isServer) }));
    return config;
  },
};

module.exports = nextConfig;
