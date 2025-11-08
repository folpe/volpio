import { motion } from "motion/react"
import React, { useEffect, useState } from "react"

interface Node {
  id: number
  x: number
  y: number
  label: string
}

export const FlowVisualization = () => {
  const [activeNode, setActiveNode] = useState(0)

  const nodes: Node[] = [
    { id: 0, x: 10, y: 50, label: "Auditer" },
    { id: 1, x: 35, y: 50, label: "Concevoir" },
    { id: 2, x: 60, y: 50, label: "Implémenter" },
    { id: 3, x: 85, y: 50, label: "Automatiser" },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveNode((prev) => (prev + 1) % nodes.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [nodes.length])

  // Get current and next node for particle animation
  const currentNode = nodes[activeNode]
  const nextNode = nodes[(activeNode + 1) % nodes.length]
  const isLastNode = activeNode === nodes.length - 1
  const isFirstNode = activeNode === 0

  return (
    <div className="relative flex h-64 w-full items-center justify-center">
      <svg className="absolute inset-0 h-full w-full" style={{ overflow: "visible" }}>
        <defs>
          <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FF6B35" />
            <stop offset="33%" stopColor="#F7931E" />
            <stop offset="66%" stopColor="#E91E63" />
            <stop offset="100%" stopColor="#9C27B0" />
          </linearGradient>
        </defs>

        {/* Background line for continuity */}
        <line
          x1="10%"
          y1="50%"
          x2="85%"
          y2="50%"
          stroke="rgba(255, 255, 255, 0.1)"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* Active gradient line */}
        <motion.line
          x1="10%"
          y1="50%"
          x2="85%"
          y2="50%"
          stroke="url(#flowGradient)"
          strokeWidth="3"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.6 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />

        {/* Animated flow particle - synchronized with active node */}
        <motion.circle
          key={`particle-${activeNode}`}
          cx={`${currentNode?.x}%`}
          cy={`${currentNode?.y}%`}
          r="6"
          fill="#ffffff"
          initial={{
            cx: `${currentNode?.x}%`,
            cy: `${currentNode?.y}%`,
            opacity: isFirstNode ? 0 : 1
          }}
          animate={{
            cx: isLastNode ? `${currentNode?.x}%` : `${nextNode?.x}%`,
            cy: isLastNode ? `${currentNode?.y}%` : `${nextNode?.y}%`,
            opacity: isLastNode ? [1, 0.5, 0] : isFirstNode ? [0, 0.5, 1] : [1, 0.8, 1]
          }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            opacity: { duration: 2, ease: "easeInOut" }
          }}
        />
      </svg>

      {/* Nodes */}
      <div className="relative h-full w-full">
        {nodes.map((node) => (
          <motion.div
            key={node.id}
            className="absolute -translate-x-1/2 -translate-y-1/2 transform"
            style={{ left: `${node.x}%`, top: `${node.y}%` }}
            animate={{
              scale: activeNode === node.id ? 1.2 : 1,
            }}
            transition={{ duration: 0.3 }}
          >
            <div className="relative">
              {/* Glow effect */}
              {activeNode === node.id && (
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: "linear-gradient(to right, rgb(249, 115, 22), rgb(236, 72, 153), rgb(168, 85, 247))",
                    filter: "blur(24px)",
                  }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 0.6, scale: 1.5 }}
                  transition={{ duration: 0.5 }}
                />
              )}

              {/* Node circle */}
              <div
                className={`relative flex h-16 w-16 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                  activeNode === node.id ? "border-orange-500 bg-orange-500/20" : "border-white/20 bg-white/5"
                }`}
              >
                <div
                  className={`h-3 w-3 rounded-full transition-all duration-300 ${
                    activeNode === node.id ? "bg-orange-400" : "bg-white/40"
                  }`}
                />
              </div>
            </div>

            {/* Label */}
            <div className="absolute top-20 left-1/2 -translate-x-1/2 transform whitespace-nowrap">
              <span
                className={`transition-all duration-300 ${
                  activeNode === node.id ? "text-orange-400" : "text-white/60"
                }`}
              >
                {node.label}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
