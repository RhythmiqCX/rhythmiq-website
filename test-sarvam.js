const text = "नमस्ते";
const apiKey = process.env.NEXT_PUBLIC_SARVAM_API_KEY || "sk_iif96p4y_vO1hBmU8e7FqhyTBShNN3yYe";

fetch("https://api.sarvam.ai/text-to-speech", {
  method: "POST",
  headers: {
    "api-subscription-key": apiKey,
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    inputs: [text],
    target_language_code: "hi-IN",
    speaker: "meera",
    pace: 1.0,
    model: "bulbul:v3"
  })
})
  .then(res => {
    console.log("Status:", res.status);
    return res.json();
  })
  .then(data => {
    console.log("Response Keys:", Object.keys(data));
    if (data.audios) {
      console.log("Audio length:", data.audios[0].length);
    } else {
      console.log("Data:", data);
    }
  })
  .catch(console.error);
