import withPWA from "@ducanh2912/next-pwa";

const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/";
const escapedApiUrl = apiUrl ? apiUrl.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&') : "http:\\/\\/localhost:8080\\/";
const apiRegex = new RegExp(escapedApiUrl);

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            "i.imgur.com"
        ],
    },
};

export default withPWA({
    dest: "public",
    cacheOnFrontEndNav: true,
    aggressiveFrontEndNavCaching: true,
    reloadOnOnline: true,
    disable: process.env.NODE_ENV === "development",
    extendDefaultRuntimeCaching: true,
    workboxOptions: {
        disableDevLogs: true,
        runtimeCaching: [
            {
                urlPattern: apiRegex,
                handler: "NetworkFirst",
                options: {
                    cacheName: "api-cache",
                    expiration: {
                        maxEntries: 120,
                        maxAgeSeconds: 24 * 60 * 60 * 30, // 30 dias
                    },
                    networkTimeoutSeconds: 5,
                },
            },
        ],
    },
})(nextConfig);
