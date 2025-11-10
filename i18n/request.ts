import { getRequestConfig } from "next-intl/server"
import { notFound } from "next/navigation"

// Can be imported from a shared config
export const locales = ["fr", "en"]
export const defaultLocale = "fr"

export default getRequestConfig(async ({ requestLocale }) => {
  // This typically corresponds to the `[locale]` segment
  let locale = await requestLocale

  // Validate that the incoming `locale` parameter is valid
  if (!locale || !locales.includes(locale as (typeof locales)[number])) {
    locale = defaultLocale
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  }
})
