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
  const { DEFAULT_LAYOUT } = SHARED_ITEMS ?? {};
  return {
    name: DEMO_NEXTJS.NAME,
    remotes: {
      [SHARED_NEXTJS.NAME]: `${SHARED_NEXTJS.NAME}@http://${
        SHARED_NEXTJS.HOST
      }/_next/static/${isServer ? "ssr" : "chunks"}/remoteEntry.js`,
    },
    filename: "remoteEntry.js",
    exposes: {
      [DEFAULT_LAYOUT.NAME]: DEFAULT_LAYOUT.PATH,
    },
    extraOptions: {
      exposePages: true,
    },
  };
};

module.exports = mfConfig;
