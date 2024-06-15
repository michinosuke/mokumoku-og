/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: `${process.env.NEXT_PUBLIC_S3_BUCKET}.s3.ap-northeast-1.amazonaws.com`,
      },
    ],
  },
};

export default nextConfig;
