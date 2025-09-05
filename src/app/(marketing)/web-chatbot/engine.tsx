import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import Image from "next/image"

export default function FinAiEngine() {
  return (
    <section className="relative w-full bg-background/80 text-white pt-56 pb-4 px-6 lg:px-12">
      {/* Header */}
      <div className="max-w-5xl mx-auto text-center mb-4">
        <p className="uppercase text-xs tracking-wider text-orange-400 mb-2 font-semibold content-center">
          Superior Technology
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Powered by the Fin AI Engine™
        </h2>
        <p className="text-base text-gray-300 max-w-3xl mx-auto">
          The Fin AI Engine™ is a patented AI architecture specifically engineered for complex customer service queries.
          Every layer is optimized for precision, speed, and reliability—so Fin can resolve more conversations, more
          effectively than competing AI Agents.
        </p>
      </div>

      {/* Diagram + Steps */}
      <div className="relative max-w-6xl mx-auto grid lg:grid-cols-3 gap-8 items-center">
        {/* Steps */}
        <div className="space-y-6 lg:col-span-1">
          <Step
            id="[3.a.1]"
            title="Refine the query"
            description="In order to optimize the accuracy of an answer that an LLM generates, the inputs the LLM receives must be refined for comprehension."
          />
          <Step
            id="[3.a.3]"
            title="Validate accuracy"
            description="In the final step, the Fin AI Engine™ checks whether the LLM output meets response accuracy and safety standards."
          />
        </div>

        {/* Central Diagram */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative flex justify-center"
        >
          <Image
            src="/img/home/control.svg"
            alt="Fin AI Engine Diagram"
            width={320}
            height={640}
            className="object-contain"
          />
        </motion.div>

        {/* Steps */}
        <div className="space-y-6 lg:col-span-1">
          <Step
            id="[3.a.2]"
            title="Generate a response"
            description="To generate a response, the Fin AI Engine™ uses a bespoke, enhanced retrieval-augmented generation (RAG) architecture."
            highlight
          />
          <Step
            id="[3.a.4]"
            title="Engine optimization"
            description="To calibrate performance, the Fin AI Engine™ uses integrated tools that optimize answer generation, efficiency, precision, and coverage."
          />
        </div>
      </div>
    </section>
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
        ${highlight ? "border-orange-500" : "border-orange-400/70"} 
        hover:border-orange-500 hover:shadow-lg hover:shadow-orange-500/20 hover:bg-orange-500/5`}
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
