import { defaultLocale, locales } from "./i18n/request"

import createMiddleware from "next-intl/middleware"

export default createMiddleware({
  // A list of all locales that are supported
  locales,

  // Used when no locale matches
  defaultLocale,

  // The default locale (fr) will not have a prefix
  localePrefix: "as-needed",

  // Disable automatic locale detection to allow manual language switching
  localeDetection: false,
})

export const config = {
  // Match only internationalized pathnames
  // Skip all internal paths (_next, api, static files)
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
}
