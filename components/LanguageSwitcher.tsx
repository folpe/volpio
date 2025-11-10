"use client"

import { cva } from "class-variance-authority"
import { Globe } from "lucide-react"
import { motion } from "motion/react"
import { useRouter } from "next/navigation"
import { useLocale } from "next-intl"
import { useEffect, useRef, useState, useTransition } from "react"

const languageButtonVariants = cva("w-full px-4 py-2 text-left text-sm font-medium transition-colors rounded-xl", {
  variants: {
    active: {
      true: "bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 text-white",
      false: "text-white/80 hover:bg-white/10",
    },
  },
  defaultVariants: {
    active: false,
  },
})

export function LanguageSwitcher() {
  const locale = useLocale()
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen])

  const handleLanguageChange = (newLocale: string) => {
    if (newLocale === locale) {
      setIsOpen(false)
      return
    }

    setIsOpen(false)
    startTransition(() => {
      // Get the current browser pathname (includes locale prefix)
      const currentPath = window.location.pathname

      // Remove any locale prefix to get the base path
      let basePath = currentPath
      if (currentPath.startsWith("/en")) {
        basePath = currentPath.slice(3) || "/"
      } else if (currentPath.startsWith("/fr")) {
        basePath = currentPath.slice(3) || "/"
      }

      // Build the new path based on the target locale
      // French (default locale) doesn't need prefix due to localePrefix: "as-needed"
      const newPath = newLocale === "fr" ? basePath : `/${newLocale}${basePath}`

      router.push(newPath)
    })
  }

  return (
    <div className="fixed top-6 right-6 z-50">
      <div className="relative" ref={dropdownRef}>
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 rounded-full border border-white/20 bg-black/30 px-4 py-2 backdrop-blur-sm transition-all duration-200 hover:border-white/30 hover:bg-black/40"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={isPending}
        >
          <Globe className="h-4 w-4 text-white/80" strokeWidth={2} />
          <span className="text-sm font-medium text-white/90 uppercase">{locale}</span>
        </motion.button>

        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full right-0 mt-2 overflow-hidden rounded-2xl border border-white/20 bg-black/80 backdrop-blur-md"
          >
            <div className="flex flex-col p-1">
              <button
                onClick={() => handleLanguageChange("en")}
                className={languageButtonVariants({ active: locale === "en" })}
              >
                English
              </button>
              <button
                onClick={() => handleLanguageChange("fr")}
                className={languageButtonVariants({ active: locale === "fr" })}
              >
                Français
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
