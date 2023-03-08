const mfConfig = (isServer) => {
  const SHARED_MF = {
    DEMO_NEXTJS: { NAME: "demo-nextjs", HOST: "localhost:3000" },
    SHARED_NEXTJS: { NAME: "micro-shared", HOST: "localhost:3002" },
  };

  const SHARED_ITEMS = {
    DEFAULT_LAYOUT: {
      NAME: "./DefaultLayout",
      PATH: "./layouts/DefaultLayout",
    },
  };

  const { DEMO_NEXTJS, SHARED_NEXTJS } = SHARED_MF ?? {};
  return {
    name: SHARED_NEXTJS.NAME,
    remotes: {
      [DEMO_NEXTJS.NAME]: `${DEMO_NEXTJS.NAME}@http://${
        DEMO_NEXTJS.HOST
      }/_next/static/${isServer ? "ssr" : "chunks"}/remoteEntry.js`,
    },
    filename: "remoteEntry.js",
    extraOptions: {
      exposePages: true,
    },
  };
};

module.exports = mfConfig;
