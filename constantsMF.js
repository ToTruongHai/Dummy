const CURRENT_MF = { NAME: "demoNextjs", HOST: "localhost:3000" };

const SHARED_MF = {
  SHARED_NEXTJS: { NAME: "microShared", HOST: "localhost:3002" },
};

const SHARED_ITEMS = {
  DEFAULT_LAYOUT_HEADER: {
    NAME: "./DefaultHeader",
    PATH: "./layouts/components/Header",
  },
  DEFAULT_LAYOUT_FOOTER: {
    NAME: "./DefaultFooter",
    PATH: "./layouts/components/Footer",
  },
  COMPONENT_TABLE: {
    NAME: "./Table",
    PATH: "./components/Table",
  },
};

module.exports = { CURRENT_MF, SHARED_MF, SHARED_ITEMS };
