"use client"

import { Globe } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"
import { useRouter } from "next/navigation"
import { useLocale } from "next-intl"
import { useState, useTransition } from "react"

export function LanguageSwitcher() {
  const locale = useLocale()
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [isOpen, setIsOpen] = useState(false)

  const handleLanguageChange = (newLocale: string) => {
    startTransition(() => {
      // French is the default locale, so it doesn't need a prefix
      const path = newLocale === "fr" ? "/" : `/${newLocale}`
      router.replace(path)
      setIsOpen(false)
    })
  }

  const languages = {
    fr: "Français",
    en: "English",
  }

  return (
    <motion.div
      className="fixed top-6 right-6 z-50"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 1 }}
    >
      <div className="relative">
        {/* Button principal */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          disabled={isPending}
          className="flex items-center gap-2 rounded-full border border-white/20 bg-black/30 px-4 py-2 backdrop-blur-sm transition-all duration-200 hover:border-white/30 hover:bg-black/40"
        >
          <Globe className="h-4 w-4 text-white/80" />
          <span className="text-sm font-medium text-white/90">{locale.toUpperCase()}</span>
        </button>

        {/* Dropdown */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 mt-2 overflow-hidden rounded-2xl border border-white/20 bg-black/80 backdrop-blur-md"
            >
              <div className="flex flex-col p-1">
                {Object.entries(languages).map(([code, name]) => (
                  <button
                    key={code}
                    onClick={() => handleLanguageChange(code)}
                    disabled={isPending}
                    className={`rounded-xl px-4 py-2.5 text-left text-sm font-medium transition-all duration-200 ${
                      locale === code
                        ? "bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 text-white"
                        : "text-white/80 hover:bg-white/10"
                    }`}
                  >
                    {name}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
