import express from "express";
import { paymentMiddleware } from "x402-express";
import { facilitator } from "@coinbase/x402";
import serverless from "serverless-http"; // ⚠️ 必须添加

const app = express();

// ✅ 添加支付中间件（Mainnet）
app.use(paymentMiddleware(
  "0x3ee25E549102e014b1B674662c68816d979DC73f", // 你的钱包地址
  {
    "GET /weather": {
      price: "$1",
      network: "base", // 主网
    },
  },
  facilitator // 使用 mainnet facilitator
));

// ✅ 定义你的接口
app.get("/weather", (req, res) => {
  res.json({
    report: {
      weather: "sunny",
      temperature: 72,
    },
  });
});

// ❌ 不要使用 app.listen()
// ✅ 导出一个 handler，让 Vercel 执行
export const handler = serverless(app);
