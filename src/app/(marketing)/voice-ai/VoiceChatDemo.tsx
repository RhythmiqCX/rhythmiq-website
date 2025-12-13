"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
const VoiceChatDemo = () => {
  const [muted, setMuted] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "ai",
      text: "Hello! I'm your AI voice assistant. Press the microphone button and speak to start our conversation.",
      timestamp: new Date(Date.now() - 120000),
    },
  ]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showScrollDown, setShowScrollDown] = useState(false);

  const [isListening, setIsListening] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const messagesContainerRef = useRef<HTMLDivElement | null>(null);

  // MediaRecorder Refs
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  // Silence Detection Refs
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const silenceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const shouldAutoRestartRef = useRef(false);

  const stopListening = useCallback(() => {
    // Stop Recorder
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state === "recording"
    ) {
      mediaRecorderRef.current.stop();
    }

    // Stop Audio Context/Analysis
    if (audioContextRef.current) {
      audioContextRef.current.close().catch(() => {});
      audioContextRef.current = null;
    }
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    if (silenceTimerRef.current) {
      clearTimeout(silenceTimerRef.current);
      silenceTimerRef.current = null;
    }

    setIsListening(false);
  }, []);

  const getChatCompletion = useCallback(async (userText: string) => {
    const response = await fetch("/api/sarvam-proxy?type=chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "sarvam-m",
        messages: [
          {
            role: "system",
            content:
              "You are a helpful and friendly voice AI assistant for Rhythmiqcx. Rhythmiqcx is an AI CX platform that transforms how companies interact with customers. We leverage AI to automate support queries, create personalized AI agents, and boost productivity, ensuring seamless, 24/7 support. Keep your responses concise and conversational.",
          },
          { role: "user", content: userText },
        ],
        max_tokens: 150,
      }),
    });

    if (!response.ok) throw new Error("Chat Completion failed");
    const data = await response.json();
    return data.choices[0]?.message?.content || "I didn't catch that.";
  }, []);

  const getTextToSpeech = useCallback(async (text: string) => {
    const response = await fetch("/api/sarvam-proxy?type=text-to-speech", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: text,
        target_language_code: "en-IN",
        speaker: "anushka",
        pitch: 0,
        pace: 1.0,
        loudness: 1.5,
        speech_sample_rate: 24000,
        enable_preprocessing: true,
        model: "bulbul:v2",
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("TTS API Error Body:", errorText);
      throw new Error(`TTS failed: ${errorText}`);
    }
    const data = await response.json();
    return data.audios?.[0]; // Assuming base64 string in audios array
  }, []);

  const playAudioResponse = useCallback((base64Audio: string) => {
    return new Promise<void>((resolve) => {
      const audio = new Audio(`data:audio/wav;base64,${base64Audio}`);
      audio.onended = () => resolve();
      audio.play().catch((e) => {
        console.error("Audio playback error", e);
        resolve(); // Resolve anyway to continue flow
      });
    });
  }, []);

  const processAudio = useCallback(
    async (audioBlob: Blob) => {
      setIsProcessing(true);

      try {
        // 1. STT
        const formData = new FormData();
        formData.append("file", audioBlob, "recording.webm");
        formData.append("model", "saarika:v2.5");

        const sttResponse = await fetch(
          "/api/sarvam-proxy?type=speech-to-text",
          {
            method: "POST",
            body: formData,
          }
        );

        if (!sttResponse.ok)
          throw new Error(`STT API Error: ${sttResponse.statusText}`);

        const sttData = await sttResponse.json();
        const userText = sttData.transcript;

        if (!userText || !userText.trim()) {
          setIsProcessing(false);
          if (shouldAutoRestartRef.current) {
            startListeningRef.current();
          }
          return;
        }

        // Check for exit commands
        const lowerText = userText.toLowerCase();
        const isConversationEnd =
          lowerText.includes("bye") ||
          lowerText.includes("goodbye") ||
          lowerText.includes("exit");
        if (isConversationEnd) {
          shouldAutoRestartRef.current = false;
        }

        setMessages((prev) => [
          ...prev,
          {
            id: Date.now(),
            type: "user",
            text: userText,
            timestamp: new Date(),
          },
        ]);

        // 2. Chat Completion
        const aiText = await getChatCompletion(userText);

        setMessages((prev) => [
          ...prev,
          {
            id: Date.now() + 1,
            type: "ai",
            text: aiText,
            timestamp: new Date(),
          },
        ]);

        // 3. TTS
        if (!muted) {
          try {
            const audioBase64 = await getTextToSpeech(aiText);
            if (audioBase64) {
              await playAudioResponse(audioBase64);
            }
          } catch (ttsError) {
            console.error("TTS Error:", ttsError);
          }
        }
      } catch (error) {
        console.error("Processing failed", error);
        // Optional: Add error message to chat
      } finally {
        setIsProcessing(false);
        if (shouldAutoRestartRef.current) {
          startListeningRef.current();
        }
      }
    },
    [getChatCompletion, getTextToSpeech, playAudioResponse, muted]
  );

  const startListening = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/webm",
        });
        processAudio(audioBlob);

        // Cleanup tracks
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();
      setIsListening(true);

      // --- Silence Detection Setup ---
      const AudioContextClass =
        window.AudioContext || (window as any).webkitAudioContext;
      const audioCtx = new AudioContextClass();
      audioContextRef.current = audioCtx;

      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 256;
      analyserRef.current = analyser;

      const source = audioCtx.createMediaStreamSource(stream);
      source.connect(analyser);

      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      let silenceStart = Date.now();
      const SILENCE_THRESHOLD = 20; // 0-255. Adjust sensitivity.
      const MAX_SILENCE_DURATION = 2000; // 2 seconds

      const checkSilence = () => {
        if (!analyserRef.current) return; // Use analyserRef.current directly

        analyserRef.current.getByteFrequencyData(dataArray); // Use analyserRef.current

        // Calculate average volume
        let sum = 0;
        for (let i = 0; i < bufferLength; i++) {
          sum += dataArray[i];
        }
        const average = sum / bufferLength;

        if (average > SILENCE_THRESHOLD) {
          // Speech detected, reset timer
          silenceStart = Date.now();
        } else {
          // Silence
          if (Date.now() - silenceStart > MAX_SILENCE_DURATION) {
            // Silence limit reached
            stopListening();
            return; // Stop loop
          }
        }

        animationFrameRef.current = requestAnimationFrame(checkSilence);
      };

      // Start loop
      checkSilence();
    } catch (err) {
      console.error("Failed to start recording", err);
      alert("Could not access microphone.");
      setIsListening(false);
      shouldAutoRestartRef.current = false;
    }
  }, [processAudio, stopListening]); // Dependencies: processAudio, stopListening

  // use refs to access latest functions without triggering re-renders or circular dependencies
  const stopListeningRef = useRef(stopListening);
  const startListeningRef = useRef(startListening);
  const processAudioRef = useRef(processAudio);

  useEffect(() => {
    stopListeningRef.current = stopListening;
    startListeningRef.current = startListening;
    processAudioRef.current = processAudio;
  }, [stopListening, startListening, processAudio]);

  const handleVoiceInput = () => {
    if (isProcessing) return;

    if (isListening) {
      // Manual stop: User wants to stop loop
      shouldAutoRestartRef.current = false;
      stopListening();
    } else {
      // Manual start: User wants to start loop
      shouldAutoRestartRef.current = true;
      startListening();
    }
  };

  const scrollToBottom = () => {
    messagesContainerRef.current?.scrollTo({
      top: messagesContainerRef.current.scrollHeight,
      behavior: "smooth",
    });
  };

  const handleScroll = useCallback(() => {
    if (messagesContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } =
        messagesContainerRef.current;
      const isNearBottom = scrollHeight - scrollTop - clientHeight < 50;
      setShowScrollDown(!isNearBottom && messages.length > 2);
    }
  }, [messages.length]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const container = messagesContainerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, [handleScroll]);

  useEffect(() => {
    const container = messagesContainerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, [handleScroll]);

  const formatTime = (timestamp: Date) => {
    return new Date(timestamp).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-[70vh] max-h-[70vh] overflow-y-auto bg-background-80 flex flex-col px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
      <div className="max-w-4xl mx-auto w-full flex flex-col h-full min-h-0">
        {/* Header */}
        <div className="scroll-mt-16 text-center mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-3 sm:mb-4">
            Voice AI Demo
          </h2>
          <p className="text-sm sm:text-base text-gray-300 px-2">
            Experience conversations with our advanced voice AI assistant. Tap
            to record, tap again to send.
          </p>
        </div>

        {/* Chat Container */}
        <div className="flex-1 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden min-h-0">
          {/* Chat Messages */}
          <div
            ref={messagesContainerRef}
            className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 sm:space-y-6 min-h-0 relative"
            style={{ maxHeight: "65vh" }}
          >
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.type === "user" ? "justify-end" : "justify-start"
                } animate-fade-in`}
              >
                <div
                  className={`max-w-[85%] sm:max-w-[75%] ${
                    message.type === "user"
                      ? "bg-gradient-to-r from-cyan-500 to-blue-600"
                      : "bg-white/10 backdrop-blur-sm border border-white/20"
                  } rounded-2xl px-4 sm:px-6 py-3 sm:py-4 shadow-lg`}
                >
                  {message.type === "ai" && (
                    <div className="flex items-center mb-2">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-purple-400 to-cyan-400 rounded-full flex items-center justify-center mr-2 sm:mr-3">
                        <svg
                          className="w-3 h-3 sm:w-4 sm:h-4 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <span className="text-xs sm:text-sm font-medium text-cyan-300">
                        AI Assistant
                      </span>
                    </div>
                  )}

                  <p className="text-white text-sm sm:text-base leading-relaxed mb-2">
                    {message.text}
                  </p>
                  <p className="text-xs text-gray-400 text-right">
                    {formatTime(message.timestamp)}
                  </p>
                </div>
              </div>
            ))}

            {(isListening || isProcessing) && (
              <div className="flex justify-start animate-fade-in">
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-4 sm:px-6 py-3 sm:py-4 shadow-lg w-fit max-w-[80%]">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-300">
                      {isListening ? "Listening..." : "Processing..."}
                    </span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />

            {/* Scroll to bottom button */}
            {showScrollDown && (
              <button
                onClick={scrollToBottom}
                className="fixed bottom-32 right-4 sm:right-6 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white p-3 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-105 z-10"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  />
                </svg>
              </button>
            )}
          </div>

          {/* Voice Input Controls */}
          <div className="p-2 sm:p-2 border-t border-white/10 bg-white/5 relative">
            <div className="flex items-center justify-center">
              {/* Microphone Controls */}
              <button
                onClick={handleVoiceInput}
                disabled={isProcessing}
                className={`relative w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-xl ${
                  isListening
                    ? "bg-red-500 hover:bg-red-600 animate-pulse"
                    : "bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500"
                }`}
              >
                {isListening ? (
                  <div className="w-3 h-3 sm:w-4 sm:h-4 bg-white rounded-sm"></div>
                ) : (
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
                {isListening && (
                  <div className="absolute inset-0 rounded-full border-2 border-red-300 animate-ping"></div>
                )}
              </button>
            </div>

            {/* Status text */}
            <div className="text-center mt-1">
              <p className="text-sm sm:text-base text-white font-medium">
                {isListening
                  ? "Tap to Stop & Send"
                  : isProcessing
                  ? "Processing..."
                  : "Tap to Speak"}
              </p>
              <p className="text-xs text-gray-400">
                {isListening ? "Recording..." : "Start a new message"}
              </p>
            </div>

            {/* Mute Button - smaller, bottom left */}
            <button
              onClick={() => setMuted(!muted)}
              className="absolute bottom-2 left-2 bg-white/10 hover:bg-white/20 text-white p-2 rounded-lg transition-colors duration-200 flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9"
            >
              <div className="relative w-5 h-5 sm:w-6 sm:h-6">
                {/* Speaker Icon */}
                <svg
                  className={`absolute inset-0 w-full h-full transition-opacity duration-300`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 34 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                  />
                </svg>

                {/* Sound Waves */}
                <svg
                  className={`absolute inset-0 w-full h-full transition-all duration-300 ${
                    muted ? "opacity-0 scale-75" : "opacity-100 scale-100"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15.536 8.464a5 5 0 010 7.072M18.364 5.636a9 9 0 010 12.728"
                  />
                </svg>

                {/* Mute "X" */}
                <svg
                  className={`mx-[6px] mt-[4px] h-[16px] w-[16px] absolute inset-0 w-full h-full transition-all duration-300 ${
                    muted ? "opacity-100 scale-100" : "opacity-0 scale-75"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 6L18 18M6 18L18 6"
                  />
                </svg>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoiceChatDemo;
