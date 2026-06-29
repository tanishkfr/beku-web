import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

// Content-Security-Policy.
//
// 'unsafe-inline' is required for both scripts and styles: the site uses inline
// styles throughout, Next injects an inline hydration bootstrap, and there is an
// inline JSON-LD block — all without a nonce. A nonce-based strict CSP needs
// request-time middleware; that's the documented next hardening step. Dev adds
// 'unsafe-eval' + websockets so React Fast Refresh / HMR keep working.
const csp = [
  `default-src 'self'`,
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  `style-src 'self' 'unsafe-inline'`,
  `img-src 'self' data: blob: https://images.unsplash.com https://*.tile.openstreetmap.org`,
  `font-src 'self'`,
  `frame-src https://www.openstreetmap.org`,
  `connect-src 'self'${isDev ? " ws: wss:" : ""}`,
  `media-src 'self'`,
  `object-src 'none'`,
  `base-uri 'self'`,
  `form-action 'self'`,
  `frame-ancestors 'none'`,
  ...(isDev ? [] : [`upgrade-insecure-requests`]),
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  // Belt-and-braces clickjacking defence for older browsers (frame-ancestors covers modern ones).
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
