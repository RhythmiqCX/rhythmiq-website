// Rhythmiq logo mark: a calligraphic (Allura) "R" in a rounded square with a
// coral beat dot at the flourish. The glyph is embedded as a vector path so it
// renders identically in-browser and in the generated favicon/OG assets, with
// no font-loading flash. Coral stays coral on light and dark; the square + glyph
// invert via `onDark`.

// Allura "R" outline (1000 UPM, y-up font space). Positioned by the <g> transform
// below: fit to a 22px box in the 32-viewBox, y flipped.
export const R_PATH =
  "M717 -182Q707 -182 697.0 -181.0Q687 -180 676 -178Q608 -165 553.0 -133.0Q498 -101 454.5 -58.5Q411 -16 375.5 31.0Q340 78 311.0 121.5Q282 165 257 198Q255 203 252.5 201.0Q250 199 250 199Q228 157 209.5 120.5Q191 84 182 62Q174 40 174 31Q174 17 185 17Q199 17 215 36Q226 49 235.5 60.5Q245 72 252 70Q253 69 253 67Q253 62 246.0 53.5Q239 45 238 44Q231 34 219.5 17.0Q208 0 195.5 -13.5Q183 -27 169 -27Q167 -27 157.5 -25.0Q148 -23 139.5 -20.0Q131 -17 130 -13Q128 6 139.5 40.5Q151 75 171.0 117.0Q191 159 212 199Q196 203 189 206Q179 213 179 225Q179 235 187.0 243.0Q195 251 211 251Q216 251 223.0 249.0Q230 247 234 242Q251 272 264.5 297.0Q278 322 284 336Q290 347 292.0 354.5Q294 362 294 366Q294 372 292 376Q294 388 306.5 408.0Q319 428 338.0 448.0Q357 468 379.0 481.5Q401 495 420 495Q426 495 438.5 491.5Q451 488 462.5 481.0Q474 474 477 461Q478 458 478 455Q478 452 476 452Q474 452 470.5 453.5Q467 455 465 455Q437 455 402.5 421.5Q368 388 332.5 336.0Q297 284 266 228Q271 227 277.5 225.5Q284 224 293 224Q297 224 300.5 224.0Q304 224 308 225Q372 232 438.5 250.0Q505 268 563.0 297.0Q621 326 659 365Q694 402 694 441Q694 470 672.0 495.0Q650 520 603 533Q575 541 539.5 545.0Q504 549 463 549Q399 549 331.5 538.0Q264 527 205.0 504.5Q146 482 106.0 448.0Q66 414 58 367Q55 343 67.0 329.0Q79 315 96.5 307.5Q114 300 124 294Q131 288 131 284Q131 277 118 279Q104 282 83.5 293.0Q63 304 47.5 323.5Q32 343 32 369Q32 373 32.5 377.0Q33 381 34 385Q34 386 33.5 391.5Q33 397 33 401Q39 432 63.5 459.5Q88 487 119.5 508.5Q151 530 178 543Q225 566 291.0 579.5Q357 593 429 593Q473 593 516.5 587.0Q560 581 601 568Q658 549 689.5 509.5Q721 470 718 427Q715 386 689.5 353.0Q664 320 624.5 295.5Q585 271 537.5 253.5Q490 236 442 225Q403 217 360.0 212.0Q317 207 279 205Q322 152 364.5 98.5Q407 45 455.5 -2.0Q504 -49 562.0 -82.5Q620 -116 693 -130Q708 -133 724 -133Q750 -133 775.5 -125.0Q801 -117 818.0 -100.0Q835 -83 835 -55Q835 -50 834.5 -45.0Q834 -40 833 -35Q833 -33 832.5 -32.0Q832 -31 832 -30Q832 -21 839 -21Q849 -21 852 -36Q855 -51 855 -64Q855 -79 852.5 -92.0Q850 -105 846 -116Q837 -144 800.5 -163.0Q764 -182 717 -182Z";

export const LogoMark = ({
  size = 24,
  onDark = false,
  className,
}: {
  size?: number;
  onDark?: boolean;
  className?: string;
}) => {
  const square = onDark ? "#FAF8F3" : "#191814";
  const rColor = onDark ? "#191814" : "#FAF8F3";
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      className={className}
      role="img"
      aria-label="Rhythmiq"
    >
      <rect width="32" height="32" rx="8" fill={square} />
      <g transform="translate(4.1446 21.4933) scale(0.0267314 -0.0267314)">
        <path d={R_PATH} fill={rColor} />
      </g>
      {/* coral beat dot, placed on the flourish terminal of the R */}
      <circle cx="26.5" cy="25.3" r="2.5" fill="#E8643C" />
    </svg>
  );
};

export default LogoMark;
