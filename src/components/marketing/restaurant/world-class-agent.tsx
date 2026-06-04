import Link from "next/link";
import Reveal from "./reveal";
import { MeshTile } from "./art";
import { DEMO_URL } from "@/constants/links";

const WorldClassAgent = () => {
  return (
    <section className="section bg-paper2" aria-label="World-class agent">
      <div className="wrap">
        <Reveal className="frame frame-light frame-pad grid lg:grid-cols-2 gap-6 lg:gap-14 items-stretch">
          <div className="flex flex-col justify-center text-center px-5 lg:px-10 py-5">
            <svg
              className="w-[130px] h-[130px] mx-auto mb-7"
              viewBox="0 0 120 120"
              fill="none"
              aria-hidden
            >
              <circle cx="60" cy="60" r="34" stroke="#E8643C" strokeWidth="2" />
              <circle cx="60" cy="60" r="24" stroke="#E8643C" strokeWidth="2" />
              <circle cx="60" cy="60" r="14" stroke="#E8643C" strokeWidth="2" />
              <circle cx="60" cy="26" r="6" fill="#E8643C" />
              <circle cx="94" cy="60" r="6" fill="#E8643C" />
              <circle cx="60" cy="94" r="6" fill="#E8643C" />
              <circle cx="26" cy="60" r="6" fill="#E8643C" />
            </svg>
            <span className="eyebrow justify-center">Designed for hospitality</span>
            <h2 className="h-section mt-3.5">A voice guests actually trust</h2>
            <p className="lede max-w-[40ch] mx-auto mt-4 mb-[22px]">
              Natural turn taking, graceful interruptions, real warmth. Rhythmiq sounds like the
              person you want greeting every guest, at 3pm or 11pm, in any language.
            </p>
            <Link href={DEMO_URL} className="btn btn-dark self-center">
              Hear it for yourself
            </Link>
          </div>
          <div className="relative rounded-[22px] overflow-hidden min-h-[380px]">
            <MeshTile uid="wca" variant="coral" className="absolute inset-0" />
            <span
              className="ph-tag absolute top-0 left-0 text-white border-transparent"
              style={{ background: "rgba(20,16,13,.4)" }}
            >
              live transcript
            </span>
            <div
              className="absolute right-[22px] bottom-[22px] left-[22px] ml-auto max-w-[320px] rounded-[14px] px-[18px] py-4 text-sm leading-[1.5] text-onDark"
              style={{ background: "rgba(20,16,13,.78)", backdropFilter: "blur(8px)" }}
            >
              <small
                className="font-mono text-[10px] tracking-[0.06em] block mb-1.5"
                style={{ color: "#FFC4AD" }}
              >
                Caller · transferred to host
              </small>
              I just called to change my reservation and it actually understood me. Sorted it in ten
              seconds. I didn&rsquo;t realize it wasn&rsquo;t a person.
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default WorldClassAgent;
