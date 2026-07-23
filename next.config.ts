import path from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Next 16 blocks image-optimizer fetches to loopback/private IPs by
    // default (SSRF guard) even when the host matches remotePatterns.
    // admin-ui is genuinely local in dev (localhost:3002 serving uploads),
    // so this has to be opted back in explicitly.
    dangerouslyAllowLocalIP: true,
    remotePatterns: [
      // Package cover images are arbitrary admin-supplied URLs (see
      // CreateImageDto in admin-apis — any https URL is accepted), so the
      // domain can't be known ahead of time; wildcard is the documented
      // approach for this "CMS with user-supplied image URLs" case.
      { protocol: "https", hostname: "**" },
      // admin-ui serves uploads over plain HTTP in local dev
      // (localhost:3002); prod admin-ui is https and already covered above.
      { protocol: "http", hostname: "localhost" },
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
