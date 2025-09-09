import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import EngineAnimation from "./animation"

export default function AiEngine() {
  return (
    <div className="w-full h-full flex flex-col justify-center text-white text-center">
      {/* Header */}
      <div className="max-w-5xl mx-auto mb-4 sm:mb-6">
        <p className="uppercase text-xs tracking-wider text-indigo-500 mb-2 font-semibold">
          Built for Speed & Scale
        </p>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">
          Powered by the Conduit Engine
        </h2>
        <p className="text-sm sm:text-base text-gray-300 max-w-3xl mx-auto">
          Conduit is our real-time messaging and AI orchestration engine,
          designed to handle thousands of simultaneous conversations without
          breaking a sweat. Every layer is tuned for speed, reliability, and
          trust—so your customers always get fast, accurate answers, whether
          handled by AI or a human agent.
        </p>
      </div>

      {/* Diagram + Steps */}
      <div className="relative max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 items-center">
        {/* Steps Left */}
        <div className="space-y-4 sm:space-y-6 order-1">
          <Step
            id="[1]"
            title="Smart Query Handling"
            description="Incoming questions are instantly routed and cleaned up for maximum comprehension before hitting the AI."
          />
          <Step
            id="[3]"
            title="Accuracy & Safety Checks"
            description="Responses are verified against compliance and quality rules to ensure safe, trustworthy answers every time."
          />
        </div>

        {/* Central Diagram */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative flex justify-center order-2 md:col-span-2 lg:col-span-1"
        >
          <EngineAnimation />
        </motion.div>

        {/* Steps Right */}
        <div className="space-y-4 sm:space-y-6 order-3">
          <Step
            id="[2]"
            title="AI-Powered Responses"
            description="RhythmiqCX uses advanced retrieval-augmented generation (RAG) to deliver precise, context-aware answers."
            highlight
          />
          <Step
            id="[4]"
            title="Continuous Optimization"
            description="Every conversation feeds back into the system, improving efficiency, reducing errors, and driving better customer experiences."
          />
        </div>
      </div>
    </div>
  )
}

function Step({
  id,
  title,
  description,
  highlight,
}: {
  id: string
  title: string
  description: string
  highlight?: boolean
}) {
  return (
    <Card
      className={`bg-transparent border transition-all duration-300 
        ${highlight ? "border-indigo-500" : "border-indigo-400/70"} 
        hover:border-indigo-500 hover:shadow-lg hover:shadow-indigo-500/20 hover:bg-indigo-500/5`}
    >
      <CardContent className="p-4">
        <span className="text-xs font-mono uppercase tracking-wider text-gray-400 block mb-2">
          {id} {title}
        </span>
        <p className="text-sm text-gray-300">{description}</p>
      </CardContent>
    </Card>
  )
}
