import express from "express";
import { paymentMiddleware } from "x402-express";
import { facilitator } from "@coinbase/x402";
import serverless from "serverless-http";

const app = express();

app.use(paymentMiddleware(
  "0x3ee25E549102e014b1B674662c68816d979DC73f", // 你的钱包地址
  {
    "GET /weather": {
      price: "$1",
      network: "base",
      config: { description: "Weather API on Base" }
    },
  },
  facilitator
));

app.get("/weather", (req, res) => {
  res.json({
    report: {
      weather: "sunny",
      temperature: 72,
    },
  });
});

// ✅ 关键改动：导出 default handler，而不是 const handler
export default serverless(app);
