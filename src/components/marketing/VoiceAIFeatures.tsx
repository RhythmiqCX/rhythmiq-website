interface Props {
  section1Subheading: string;
  section1Heading: string;
  section2?: boolean;
  section1Content?: string;
  section2Subheading?: string;
  section2Heading?: string;
  section2Content?: string;
  imageUrl1?: string;
  imageUrl2?: string;
}

export default function VoiceAIFeatures({
  section1Subheading,
  section1Heading,
  section2 = false,
  section1Content = "",
  section2Subheading = "",
  section2Heading = "",
  section2Content = "",
  imageUrl1 = "",
  imageUrl2 = "",
}: Props) {
  return (
    <>
      {/* Section 1 */}
      <section className="w-full px-6 py-16 md:py-24 bg-background/80 flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-10">
          
          {/* Left Image */}
          <div className="flex justify-center items-center shrink-0">
            <img
              src={imageUrl1}
              alt="Feature Image"
              className="rounded-2xl shadow-xl w-full max-w-[220px] h-auto"
            />
          </div>

          {/* Right Text */}
          <div className="flex flex-col justify-center gap-4 md:items-start text-center md:text-left">
            <p className="text-sm text-white/70 font-medium">{section1Subheading}</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">{section1Heading}</h2>
            <p className="text-base text-white/80 max-w-lg">{section1Content}</p>
          </div>
        </div>
      </section>

      {/* Section 2 */}
      {section2 && (
        <section className="w-full px-6 py-16 md:py-24 bg-background/80 flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-10">
            
            {/* Left Text */}
            <div className="flex flex-col justify-center gap-4 text-center md:text-left md:order-1">
              <p className="text-sm text-white/70 font-medium">{section2Subheading}</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-white">{section2Heading}</h2>
              <p className="text-base text-white/80 max-w-lg">{section2Content}</p>
            </div>

            {/* Right Image */}
            <div className="flex justify-center items-center md:order-2">
              <img
                src={imageUrl2}
                alt="Feature Image"
                className="rounded-2xl shadow-xl w-full max-w-[280px] h-auto"
              />
            </div>
          </div>
        </section>
      )}
    </>
  );
}
