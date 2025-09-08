import { motion } from "framer-motion";

const stats = [
  {
    value: "500+",
    label: "early adopters engaged",
    size: "md:col-span-2", // bigger block
    color: "from-purple-500 to-indigo-600",
  },
  {
    value: "10X",
    label: "efficiency boost vs human agents",
    size: "md:col-span-1",
    color: "from-pink-500 to-rose-600",
  },
  {
    value: "85%",
    label: "conversations fully automated",
    size: "md:col-span-1",
    color: "from-blue-500 to-cyan-600",
  },
  {
    value: "99.99%",
    label: "uptime and reliability",
    size: "md:col-span-2", // bigger block
    color: "from-emerald-500 to-green-600",
  },
];

export default function ImpactStats() {
  return (
    <section className="h-screen w-full bg-gradient-to-b from-black via-zinc-900 to-black text-white flex flex-col justify-center items-center px-6 snap-start">
      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl md:text-5xl font-bold text-center mb-12"
      >
        Building the Future of Engagement{" "}
        <span className="text-indigo-400">with AI</span>
      </motion.h2>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl w-full auto-rows-fr">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.2 }}
            whileHover={{ scale: 1.05 }}
            className={`rounded-2xl p-8 flex flex-col justify-center text-center shadow-lg bg-gradient-to-br ${stat.color} ${stat.size}`}
          >
            <h3 className="text-5xl font-extrabold mb-3 drop-shadow-lg">
              {stat.value}
            </h3>
            <p className="text-base opacity-90">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Footer Text */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="mt-12 text-lg text-gray-400 text-center"
      >
        Delivering reliable, scalable, and intelligent automation for the
        future.
      </motion.p>
    </section>
  );
}
