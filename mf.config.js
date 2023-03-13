const { SHARED_ITEMS, CURRENT_MF, SHARED_MF } = require("./constantsMF.js");

const mfConfig = (isServer) => {
  const { NAME } = CURRENT_MF ?? {};
  const { SHARED_NEXTJS } = SHARED_MF ?? {};
  const { DEFAULT_LAYOUT_HEADER, DEFAULT_LAYOUT_FOOTER, COMPONENT_TABLE } =
    SHARED_ITEMS ?? {};
  return {
    name: NAME,
    remotes: {
      [SHARED_NEXTJS.NAME]: `${SHARED_NEXTJS.NAME}@http://${
        SHARED_NEXTJS.HOST
      }/_next/static/${isServer ? "ssr" : "chunks"}/remoteEntry.js`,
    },
    filename: `static/chunks/remoteEntry.js`,
    exposes: {
      [DEFAULT_LAYOUT_HEADER.NAME]: DEFAULT_LAYOUT_HEADER.PATH,
      [DEFAULT_LAYOUT_FOOTER.NAME]: DEFAULT_LAYOUT_FOOTER.PATH,
      [COMPONENT_TABLE.NAME]: COMPONENT_TABLE.PATH,
    },
    extraOptions: {
      exposePages: true,
    },
    shared: {
      // whatever else
    },
  };
};

module.exports = mfConfig;
