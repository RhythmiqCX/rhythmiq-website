
import { NextApiRequest, NextApiResponse } from "next";
import { WebSocket, WebSocketServer } from "ws";
import { IncomingMessage } from "http";
import https from "https";

export const config = {
    api: {
        bodyParser: false, // Disabling body parser to stream the multipart/form-data directly
        externalResolver: true, // Suppress warnings for piped responses
    },
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        const apiKey = process.env.SARVAM_API_KEY || process.env.NEXT_PUBLIC_SARVAM_API_KEY;

        if (!apiKey) {
            return res.status(500).json({ error: "Missing API configuration" });
        }

        const type = req.query.type || "speech-to-text";
        let path = "/speech-to-text";

        if (type === "chat") {
            path = "/v1/chat/completions";
        } else if (type === "text-to-speech") {
            path = "/text-to-speech";
        }

        // Proxy the POST request to Sarvam REST API
        const options = {
            hostname: "api.sarvam.ai",
            path: path,
            method: "POST",
            headers: {
                "api-subscription-key": apiKey,
                "content-type": req.headers["content-type"] || "multipart/form-data",
                ...(req.headers["content-length"] && { "content-length": req.headers["content-length"] }),
            },
        };

        const proxyReq = https.request(options, (proxyRes) => {
            res.writeHead(proxyRes.statusCode || 200, proxyRes.headers);
            proxyRes.pipe(res);
        });

        proxyReq.on("error", (e) => {
            console.error("Sarvam Proxy Error:", e);
            res.status(500).json({ error: "Proxy Request Failed" });
        });

        // Pipe the client request (FormData) directly to Sarvam
        req.pipe(proxyReq);
        return;
    }

    // Helper to handle WebSocket logic if needed (Legacy support for the WS attempt)
    const server = (res.socket as any)?.server;
    if (!server?.sarvamProxy) {
        console.log("Initializing Sarvam WS Proxy...");
        const wss = new WebSocketServer({ noServer: true });
        server.sarvamProxy = wss;

        server.on("upgrade", (request: IncomingMessage, socket: any, head: Buffer) => {
            if (request.url?.includes("/api/sarvam-proxy")) {
                const apiKey = process.env.SARVAM_API_KEY || process.env.NEXT_PUBLIC_SARVAM_API_KEY;
                wss.handleUpgrade(request, socket, head, (clientSocket: any) => {
                    // ... (Existing WS logic kept for safety/reference, though POST is now primary)
                    const target = new WebSocket(
                        "wss://api.sarvam.ai/speech-to-text/ws?model=saarika:v2.5&language-code=en-IN&sample_rate=16000&input_audio_codec=pcm_s16le",
                        { headers: { "Api-Subscription-Key": apiKey || "" } }
                    );
                    clientSocket.on("message", (msg: any) => target.readyState === WebSocket.OPEN && target.send(msg));
                    target.on("message", (msg: any) => clientSocket.readyState === WebSocket.OPEN && clientSocket.send(msg));
                    clientSocket.on("close", () => target.close());
                });
            }
        });
    }

    res.status(200).json({ ok: true, mode: "ready" });
}
