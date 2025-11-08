import { motion } from "motion/react"
import React from "react"

interface Entity {
  name: string
  role: string
  angle: number
  color: string
  url?: string
}

export const EcosystemOrbit = () => {
  const entities: Entity[] = [
    { name: "Void Corp", role: "L'Origine", angle: -90, color: "#64748b", url: "https://voidcorp.io" },
    { name: "v0rn", role: "La Forge", angle: 150, color: "#3b82f6", url: "https://v0rn.com" },
    { name: "Volpio", role: "Le Flux", angle: 30, color: "#f97316" },
  ]

  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null)
  const radius = 160

  return (
    <div className="relative flex h-[500px] w-full items-center justify-center">
      {/* Center core */}
      <motion.div
        className="absolute z-10 h-6 w-6 rounded-full bg-white"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.8, 1, 0.8],
        }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        style={{
          boxShadow: "0 0 30px rgba(255, 255, 255, 0.6)",
        }}
      />

      {/* Orbit rings */}
      <motion.div
        className="absolute rounded-full border border-white/20"
        style={{ width: radius * 2, height: radius * 2 }}
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
        className="absolute rounded-full border border-white/10"
        style={{ width: radius * 2 + 80, height: radius * 2 + 80 }}
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

        return (
          <React.Fragment key={entity.name}>
            {/* Connection line using SVG for precise positioning */}
            <svg
              className="absolute inset-0 pointer-events-none overflow-visible"
              style={{ width: '100%', height: '100%' }}
            >
              <motion.line
                x1="50%"
                y1="50%"
                x2={`calc(50% + ${x}px)`}
                y2={`calc(50% + ${y}px)`}
                stroke={entity.color}
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
                  filter: `drop-shadow(0 0 10px ${entity.color}80)`,
                }}
              />
            </svg>

            {/* Position marker circle */}
            <motion.div
              className="absolute z-20 h-3 w-3 rounded-full"
              style={{
                left: `calc(50% + ${x}px)`,
                top: `calc(50% + ${y}px)`,
                transform: "translate(-50%, -50%)",
                backgroundColor: entity.color,
                boxShadow: `0 0 10px ${entity.color}`,
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
              <motion.div
                className="relative rounded-xl border-2 p-4 text-center backdrop-blur-md"
                style={{
                  borderColor: `${entity.color}40`,
                  background: `linear-gradient(135deg, ${entity.color}20, ${entity.color}05)`,
                  width: "140px",
                }}
                animate={{
                  borderColor: `${entity.color}40`,
                }}
                whileHover={{
                  scale: 1.1,
                  borderColor: entity.color,
                  boxShadow: `0 0 20px ${entity.color}60`,
                }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 10,
                }}
              >
                {entity.url ? (
                  <a
                    href={entity.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <div
                      className="mb-1"
                      style={{
                        fontFamily: "'Montserrat Alternates', sans-serif",
                        color: entity.color,
                      }}
                    >
                      {entity.name}
                    </div>
                    <div className="text-xs text-white/60">{entity.role}</div>
                  </a>
                ) : (
                  <>
                    <div
                      className="mb-1"
                      style={{
                        fontFamily: "'Montserrat Alternates', sans-serif",
                        color: entity.color,
                      }}
                    >
                      {entity.name}
                    </div>
                    <div className="text-xs text-white/60">{entity.role}</div>
                  </>
                )}

                {/* Active indicator for Volpio */}
                {entity.name === "Volpio" && (
                  <motion.div
                    className="absolute -top-2 -right-2 h-4 w-4 rounded-full"
                    style={{
                      background: entity.color,
                    }}
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.7, 1, 0.7],
                    }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                )}
              </motion.div>
            </motion.div>
          </React.Fragment>
        )
      })}
    </div>
  )
}
