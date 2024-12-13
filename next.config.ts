import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;

module.exports = {
  experimental: {
    outputStandalone: true, // 出力設定を調整
  },
};