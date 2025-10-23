import Link from "next/link";

export default function CallToAction() {
  return (
    <section className="w-full h-[60vh] flex flex-col justify-center text-white px-6 lg:px-16 py-16 rounded-2xl shadow-xl overflow-hidden relative">
      {/* Animated gradient background */}
      <div className="absolute inset-0 animate-gradient-smooth" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col justify-center items-center">
        {/* Subheading */}
        <p className="text-sm sm:text-base uppercase tracking-wide text-indigo-200 mb-3">
          Don’t Miss Out
        </p>

        {/* Heading */}
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-4 leading-tight">
          Ready to Experience the Future of Support?
        </h2>

        {/* Content */}
         <p className="text-gray-200 mb-8 text-base sm:text-lg lg:text-xl max-w-2xl">
          Step into the next era of customer engagement with Voice AI technology designed to
           transform how businesses communicate. Our advanced conversational agents deliver
            real-time, intelligent, and natural interactions that not only resolve customer
             queries but also build lasting relationships. Whether it’s automating routine calls or assisting live agents, our system ensures seamless, round-the-clock support — so your business never misses a moment to connect, impress, and grow
        </p> 

        {/* CTA Button */}
        <Link href="https://calendly.com/ray-rhythmiqcx/30min">
          <button className="px-6 sm:px-8 py-3 sm:py-4 bg-white text-indigo-700 rounded-xl font-semibold text-base sm:text-lg shadow-lg hover:opacity-90 hover:scale-105 transform transition">
            Schedule a Free Demo
          </button>
        </Link>
      </div>
    </section>
  );
}
