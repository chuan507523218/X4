import express from "express";
import serverless from "serverless-http";
import { paymentMiddleware } from "x402-express";
import { facilitator } from "@coinbase/x402";

const app = express();

app.use(paymentMiddleware(
  "0x3ee25E549102e014b1B674662c68816d979DC73f",  // 你的 Base 主网钱包地址
  {
    "GET /weather": {
      price: "$1",
      network: "base",
      config: {
        description: "Get current weather data",
        inputSchema: {
          type: "object",
          properties: {
            location: { type: "string", description: "City name" }
          }
        },
        outputSchema: {
          type: "object",
          properties: {
            weather: { type: "string" },
            temperature: { type: "number" }
          }
        }
      }
    }
  },
  facilitator
));

app.get("/weather", (req, res) => {
  res.json({
    report: { weather: "sunny", temperature: 70 },
  });
});

// 导出为 Serverless handler
export const handler = serverless(app);
