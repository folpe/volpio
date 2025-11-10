import { motion } from "motion/react"
import React from "react"
import { cva, type VariantProps } from "class-variance-authority"

interface Entity {
  name: string
  role: string
  angle: number
  variant: "voidcorp" | "v0rn" | "volpio"
  url?: string
}

const entityVariants = cva(
  "relative size-[140px] rounded-full border-2 p-6 text-center backdrop-blur-md flex flex-col items-center justify-center",
  {
    variants: {
      variant: {
        voidcorp: "border-slate-500/25 bg-gradient-to-br from-slate-500/15 to-slate-500/5",
        v0rn: "border-blue-500/25 bg-gradient-to-br from-blue-500/15 to-blue-500/5",
        volpio: "border-orange-500/25 bg-gradient-to-br from-orange-500/15 to-orange-500/5",
      },
    },
  }
)

const markerVariants = cva("absolute z-20 size-3 rounded-full -translate-x-1/2 -translate-y-1/2", {
  variants: {
    variant: {
      voidcorp: "bg-slate-500 shadow-[0_0_10px_#64748b]",
      v0rn: "bg-blue-500 shadow-[0_0_10px_#3b82f6]",
      volpio: "bg-orange-500 shadow-[0_0_10px_#f97316]",
    },
  },
})

const textVariants = cva("mb-1 text-sm font-semibold", {
  variants: {
    variant: {
      voidcorp: "text-slate-500",
      v0rn: "text-blue-500",
      volpio: "text-orange-500",
    },
  },
})

const indicatorVariants = cva("mt-2 mx-auto size-2 rounded-full", {
  variants: {
    variant: {
      voidcorp: "bg-slate-500",
      v0rn: "bg-blue-500",
      volpio: "bg-orange-500",
    },
  },
})

// Mapping des couleurs hex pour les éléments qui en ont besoin (SVG, boxShadow)
const colorMap = {
  voidcorp: "#64748b",
  v0rn: "#3b82f6",
  volpio: "#f97316",
}

export const EcosystemOrbit = () => {
  const entities: Entity[] = [
    { name: "Void Corp", role: "L'Origine", angle: -90, variant: "voidcorp", url: "https://voidcorp.io" },
    { name: "v0rn", role: "La Forge", angle: 150, variant: "v0rn", url: "https://v0rn.com" },
    { name: "Volpio", role: "Le Flux", angle: 30, variant: "volpio" },
  ]

  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null)
  const radius = 160

  return (
    <div className="relative flex h-[500px] w-full items-center justify-center">
      {/* Center core */}
      <motion.div
        className="absolute z-10 size-6 rounded-full bg-white shadow-[0_0_30px_rgba(255,255,255,0.6)]"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.8, 1, 0.8],
        }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Orbit rings */}
      <motion.div
        className="absolute size-[320px] rounded-full border border-white/20"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{
          opacity: [1, 0.8, 1],
          scale: [1, 1.02, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute size-[400px] rounded-full border border-white/10"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{
          opacity: [1, 0.6, 1],
          scale: [1, 1.03, 1],
        }}
        transition={{
          duration: 5,
          delay: 0.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Entities */}
      {entities.map((entity, index) => {
        const angleRad = (entity.angle * Math.PI) / 180
        const x = Math.cos(angleRad) * radius
        const y = Math.sin(angleRad) * radius
        const color = colorMap[entity.variant]

        return (
          <React.Fragment key={entity.name}>
            {/* Connection line using SVG for precise positioning */}
            <svg
              className="absolute inset-0 pointer-events-none size-full overflow-visible"
            >
              <motion.line
                x1="50%"
                y1="50%"
                x2={`calc(50% + ${x}px)`}
                y2={`calc(50% + ${y}px)`}
                stroke={color}
                strokeWidth="2"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{
                  pathLength: hoveredIndex === index ? 1 : 0,
                  opacity: hoveredIndex === index ? 1 : 0,
                }}
                transition={{
                  duration: 0.3,
                  ease: "easeOut",
                }}
                style={{
                  filter: `drop-shadow(0 0 10px ${color}80)`,
                }}
              />
            </svg>

            {/* Position marker circle */}
            <motion.div
              className={markerVariants({ variant: entity.variant })}
              style={{
                left: `calc(50% + ${x}px)`,
                top: `calc(50% + ${y}px)`,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: 0.8,
                scale: 1,
              }}
              transition={{
                delay: 0.5 + index * 0.2,
                duration: 0.6,
              }}
            />

            {/* Entity card */}
            <motion.div
              className="absolute z-30"
              style={{
                left: `calc(50% + ${x}px)`,
                top: `calc(50% + ${y}px)`,
                x: "-50%",
                y: "-50%",
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              transition={{
                delay: 0.7 + index * 0.2,
                duration: 0.6,
                type: "spring",
                stiffness: 100,
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {entity.url ? (
                <motion.a
                  href={entity.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${entityVariants({ variant: entity.variant })} cursor-pointer`}
                  whileHover={{
                    scale: 1.1,
                    borderColor: color,
                    boxShadow: `0 0 20px ${color}60`,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 10,
                  }}
                >
                  <div
                    className={textVariants({ variant: entity.variant })}
                    style={{ fontFamily: "'Montserrat Alternates', sans-serif" }}
                  >
                    {entity.name}
                  </div>
                  <div className="text-[10px] text-white/60">{entity.role}</div>
                </motion.a>
              ) : (
                <motion.div
                  className={entityVariants({ variant: entity.variant })}
                  whileHover={{
                    scale: 1.1,
                    borderColor: color,
                    boxShadow: `0 0 20px ${color}60`,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 10,
                  }}
                >
                  <div
                    className={textVariants({ variant: entity.variant })}
                    style={{ fontFamily: "'Montserrat Alternates', sans-serif" }}
                  >
                    {entity.name}
                  </div>
                  <div className="text-[10px] text-white/60">{entity.role}</div>

                  {/* Active indicator for Volpio */}
                  {entity.name === "Volpio" && (
                    <motion.div
                      className={indicatorVariants({ variant: entity.variant })}
                      animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.7, 1, 0.7],
                      }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                  )}
                </motion.div>
              )}
            </motion.div>
          </React.Fragment>
        )
      })}
    </div>
  )
}
