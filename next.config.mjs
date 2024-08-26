/** @type {import('next').NextConfig} */

const WEB3AUTHCLIENTID = process.env.WEB3AUTHCLIENTID;
const nextConfig = {
  env: { WEB3AUTHCLIENTID: WEB3AUTHCLIENTID },
  reactStrictMode: false,
};

export default nextConfig;
