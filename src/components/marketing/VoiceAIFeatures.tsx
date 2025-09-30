type Props = {
  section1Subheading: string;
  section1Heading: string;
  section2?: boolean;
  section1Content?: string;
  section2Subheading?: string;
  section2Heading?: string;
  section2Content?: string;
  imageUrl1?: string;
  imageUrl2?: string;
};

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
      <section className="h-[70vh] w-full px-8 py-12 bg-background/80 flex justify-center ">
        {/*Section 1*/}
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8flex md:flex-col md:items-center sm:flex-col sm:items-center">
          {/* Left Image Section */}
          <div className="flex justify-center items-center">
            <img
              src={imageUrl1}
              alt="Example"
              className="rounded-2xl shadow-lg object-cover w-full max-w-md"
            />
          </div>

          {/* Right Text Section */}
          <div className="flex flex-col justify-center md:text-right gap-2 sm:text-center lg:text-right md:text-right relative  lg:-top-16  lg:left-[72px] md:left-32">
            <p className="text-sm text-gray-500 ">{section1Subheading}</p>
            <h2 className="text-3xl font-bold ">{section1Heading}</h2>
            <p className="text-base text-gray-600 max-w-md">
              {section1Content}
            </p>
          </div>
        </div>
      </section>

      {/* Section 2 */}
      {section2 && <section className="h-[80vh] w-full px-8 py-12 bg-background/80 flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8">
          {/* Left Text Section */}
          <div className="flex flex-col justify-center gap-2 text-center md:text-left relative lg:-top-16 lg:right-[72px] md:right-32">
            <p className="text-sm text-gray-500">{section2Subheading}</p>
            <h2 className="text-3xl font-bold">{section2Heading}</h2>
            <p className="text-base text-gray-600 max-w-md mx-auto md:mx-0">
              {section2Content}
            </p>
          </div>

          {/* Right Image Section */}
          <div className="flex justify-center items-center">
            <img
              src={imageUrl2}
              alt="Example"
              className="rounded-2xl shadow-lg object-cover w-full max-w-md"
            />
          </div>
        </div>
      </section>}
    </>
  );
}
