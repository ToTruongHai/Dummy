import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const middleware = (req: NextRequest) => {
  // const url = request.nextUrl.clone();
  // if (url.pathname === "/") {
  // url.pathname = "/345";
  // return NextResponse.redirect(url);
  // }
  // console.log({ mwURL: url });
};

export default middleware;
