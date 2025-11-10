"use client"

import { motion } from "motion/react"
import { useLocale } from "next-intl"
import { useRouter } from "next/navigation"
import { useTransition } from "react"

export function LanguageSwitcher() {
  const locale = useLocale()
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const handleLanguageChange = (newLocale: string) => {
    startTransition(() => {
      router.replace(`/${newLocale}`)
    })
  }

  return (
    <motion.div
      className="fixed top-6 right-6 z-50 flex gap-2 rounded-full border border-white/20 bg-black/30 p-1 backdrop-blur-sm"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 1 }}
    >
      <button
        onClick={() => handleLanguageChange("fr")}
        disabled={isPending}
        className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
          locale === "fr"
            ? "bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 text-white shadow-lg"
            : "text-white/60 hover:text-white/80"
        }`}
      >
        FR
      </button>
      <button
        onClick={() => handleLanguageChange("en")}
        disabled={isPending}
        className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
          locale === "en"
            ? "bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 text-white shadow-lg"
            : "text-white/60 hover:text-white/80"
        }`}
      >
        EN
      </button>
    </motion.div>
  )
}
