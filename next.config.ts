import { NextConfig } from "next"
import createNextIntlPlugin from "next-intl/plugin"

const nextConfig: NextConfig = {
   // compression will be configured using nginx
   compress: false,
}

const withNextIntl = createNextIntlPlugin()
export default withNextIntl(nextConfig)
