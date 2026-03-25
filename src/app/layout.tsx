import type { Metadata } from "next";
import { Inter, Poppins, Noto_Sans_JP } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css";
import { ThemeProvider } from "@/components/themeProvider";
import { Toaster } from "@/components/ui/sonner";
import { randomThemeName } from "@/util/themes";
// import { PermissionProvider } from "@/context/permissionContext";

const inter = Inter({ subsets: ["latin"] });
const poppins = Poppins({
	subsets: ["latin"],
	weight: ["400", "500", "600", "700"],
	variable: "--font-poppins",
});
const notosansjp = Noto_Sans_JP({
	subsets: ["latin"],
	weight: ["400", "500", "600", "700"],
	variable: "--font-notosansjp",
});

export const metadata: Metadata = {
	icons: {
		icon: "/favicon.ico",
		apple: "/icons/icon-192x192.svg",
	},
	title: "Eclesia",
	description: "Organização e planejamento de escalas para grupos de louvor.",
	manifest: "/manifest.json",
	appleWebApp: {
		capable: true,
		statusBarStyle: "default",
		title: "Eclesia",
	},
	formatDetection: {
		telephone: false,
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="pt-br" suppressHydrationWarning>
			<head>
				<meta name="theme-color" content="#1a1a2e" />
				<meta name="mobile-web-app-capable" content="yes" />
			</head>
			<body className={notosansjp.className}>
				<ThemeProvider attribute="class" defaultTheme={"creamy"} enableSystem={false} disableTransitionOnChange>
					{children}
					<Toaster />
					<Analytics />
					<SpeedInsights />
				</ThemeProvider>
			</body>
		</html>
	);
}
