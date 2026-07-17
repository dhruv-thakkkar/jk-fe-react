import path from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Package cover images are arbitrary admin-supplied URLs (see
      // CreateImageDto in admin-apis — any https URL is accepted), so the
      // domain can't be known ahead of time; wildcard is the documented
      // approach for this "CMS with user-supplied image URLs" case.
      { protocol: "https", hostname: "**" },
    ],
  },
  // Bootstrap's own scss files use relative imports (e.g. `@import
  // "mixins/banner"` inside bootstrap.scss) that don't resolve correctly
  // without an explicit node_modules load path — Next's documented fix.
  sassOptions: {
    includePaths: [
      path.join(process.cwd(), "node_modules"),
      path.join(process.cwd(), "node_modules/bootstrap/scss"),
    ],
  },
};

export default nextConfig;
