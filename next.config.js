/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Jika kamu menggunakan hosted manifest dari Farcaster, 
  // uncomment dan ganti ID di bawah ini:
  // async redirects() {
  //   return [
  //     {
  //       source: '/.well-known/farcaster.json',
  //       destination: 'https://api.farcaster.xyz/miniapps/hosted-manifest/YOUR_MANIFEST_ID',
  //       permanent: false,
  //     },
  //   ]
  // },
}

module.exports = nextConfig
