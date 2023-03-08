const { CURRENT_MF, SHARED_MF } = require("./constantsMF.js");

const mfConfig = (isServer) => {
  const { NAME } = CURRENT_MF ?? {};
  const { DEMO_NEXTJS } = SHARED_MF ?? {};
  return {
    name: NAME,
    remotes: {
      [DEMO_NEXTJS.NAME]: `${DEMO_NEXTJS.NAME}@http://${
        DEMO_NEXTJS.HOST
      }/_next/static/${isServer ? "ssr" : "chunks"}/remoteEntry.js`,
    },
    filename: `static/chunks/remoteEntry.js`,
    extraOptions: {
      exposePages: true,
    },
    shared: {
      // whatever else
    },
  };
};

module.exports = mfConfig;
