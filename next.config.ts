import { NextConfig } from "next"
import createNextIntlPlugin from "next-intl/plugin"

const nextConfig: NextConfig = {
   compress: false,
   async headers() {
      return [
         {
            // prevent profile image from being indexed
            source: "/me.webp",
            headers: [
               {
                  key: "X-Robots-Tag",
                  value: "noindex, nofollow",
               },
            ],
         },
      ]
   },
}

const withNextIntl = createNextIntlPlugin()
export default withNextIntl(nextConfig)
