import { NextConfig } from "next"
import createNextIntlPlugin from "next-intl/plugin"

const nextConfig: NextConfig = {
   output: "standalone",
   // compression will be configured using nginx
   compress: false,

   images: {
      remotePatterns: [
         {
            protocol: "https",
            hostname: "res.cloudinary.com",
            pathname: "/**",
         },
      ],
   },
}

const withNextIntl = createNextIntlPlugin()
export default withNextIntl(nextConfig)
