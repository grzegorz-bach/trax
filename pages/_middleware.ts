import { NextResponse } from "next/server";

const whitelist = ["/", "playlist", "/library"];

export default function middleware(req) {
  if (whitelist.find((p) => p === req.nextUrl.pathname)) {
    if (!req.cookies.TRAX_ACCESS_TOKEN) {
      return NextResponse.redirect(`${req.url}signin`);
    }
  }
}
