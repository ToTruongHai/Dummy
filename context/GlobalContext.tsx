import React, { ReactNode, useState } from "react";
import { globalContextType, metaType, userType } from "./@types.global";
import { Helmet } from "react-helmet";

const GlobalContext = React.createContext<globalContextType | null>(null);
const GlobalConsumer = GlobalContext.Consumer;

type ProviderProps = {
  children?: ReactNode;
};

const defaultMeta = {
  title: "title",
  url: "https://classroom.eduplaX.com/",
  description: "description",
  logo: `https://thumbs.dreamstime.com/b/environment-earth-day-hands-trees-growing-seedlings-bokeh-green-background-female-hand-holding-tree-nature-field-gra-130247647.jpg`,
  locale: "vi_VN",
  locale_alternate: "en_US",
  image: `https://images.ctfassets.net/hrltx12pl8hq/a2hkMAaruSQ8haQZ4rBL9/8ff4a6f289b9ca3f4e6474f29793a74a/nature-image-for-website.jpg?fit=fill&w=480&h=320`,
  app_id: 132575442052241,
  type: "website",
};

const renderHelmet = (meta: any) => (
  <Helmet
    htmlAttributes={{ lang: "en" }}
    title={meta?.title}
    meta={[
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        property: "description",
        content: meta.description,
      },
      {
        property: "og:title",
        content: meta.title,
      },
      {
        property: "og:url",
        content: meta.url,
      },
      {
        property: "og:image",
        content: meta.image,
      },
      {
        property: "og:image:url",
        content: meta.image,
      },
      {
        property: "og:image:secure_url",
        content: meta.image,
      },
      {
        property: "og:description",
        content: meta.description,
      },
      {
        property: "og:locale",
        content: meta.locale,
      },
      {
        property: "og:locale:alternate",
        content: meta.locale_alternate,
      },
      {
        property: "og:image:width",
        content: meta.img_width,
      },
      {
        property: "fb:app_id",
        content: meta.app_id,
      },
      {
        property: "og:type",
        content: meta.type,
      },
    ]}
    link={[
      {
        rel: "icon",
        type: "image/x-icon",
        href: meta.logo,
      },
      {
        rel: "stylesheet",
        type: "text/css",
        href: "https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css",
      },
      {
        rel: "stylesheet",
        type: "text/css",
        href: "https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css",
      },
      {
        rel: "stylesheet",
        href: "https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css",
      },
    ]}
    script={[
      {
        src: "https://apis.google.com/js/platform.js",
        async: true,
        defer: true,
      },
    ]}
  />
);

const GlobalProvider = (props: ProviderProps) => {
  const [state, setState] = useState<metaType>({
    meta: defaultMeta,
  });

  const [users, setUser] = useState<userType>();

  return (
    <GlobalContext.Provider
      value={{
        users,
        state,

        setUser,
        setState,
      }}
    >
      {state?.meta && renderHelmet(state?.meta)}
      {props.children}
    </GlobalContext.Provider>
  );
};

export { GlobalContext, GlobalConsumer, GlobalProvider };
