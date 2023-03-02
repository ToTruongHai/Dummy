import { Key } from "react";

export interface userType {
  id: Number | Key;
  name?: string;
  salary?: number;
  age?: number;
  email?: string;
}

export interface metaType {
  meta: {
    title?: String;
    url?: String;
    description?: String;
    logo?: String;
    locale?: String;
    locale_alternate?: String;
    image?: String;
    app_id?: Number;
    type?: String;
  };
}

export type globalContextType = {
  users?: userType;
  state: metaType;

  setUser: React.Dispatch<React.SetStateAction<userType | undefined>>;
  setState: React.Dispatch<React.SetStateAction<metaType>>;
};
