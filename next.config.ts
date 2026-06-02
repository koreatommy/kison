import type { NextConfig } from "next";

const tourNoStoreHeaders = [
  { key: "Cache-Control", value: "no-store, no-cache, must-revalidate, max-age=0" },
  { key: "Pragma", value: "no-cache" },
  { key: "Expires", value: "0" },
];

const nextConfig: NextConfig = {
  turbopack: {},
  async headers() {
    return [
      { source: "/tour", headers: tourNoStoreHeaders },
      { source: "/tour/", headers: tourNoStoreHeaders },
      { source: "/tour/ep1", headers: tourNoStoreHeaders },
      { source: "/trip", headers: tourNoStoreHeaders },
      { source: "/trip/", headers: tourNoStoreHeaders },
      { source: "/trip/ep1", headers: tourNoStoreHeaders },
    ];
  },
};

export default nextConfig;
