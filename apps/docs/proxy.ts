import { after, NextResponse } from "next/server"
import { createGeoProxy } from "@usenotra/geo/next"

/** Notra GEO tracker — null (no-op) when NOTRA_GEO_TOKEN isn't configured. */
const geo = process.env.NOTRA_GEO_TOKEN
  ? createGeoProxy({
      token: process.env.NOTRA_GEO_TOKEN,
      endpoint: "https://ingest.usenotra.com",
    })
  : null

export function proxy(request: Request) {
  if (geo) {
    after(() => geo(request).catch(() => {}))
  }

  return NextResponse.next()
}

export const config = {
  // Skip Next internals and static assets
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
}
