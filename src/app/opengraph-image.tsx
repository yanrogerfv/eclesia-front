import { ImageResponse } from "next/og";

export const alt = "Eclesia - escalas para grupos de louvor";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Social card rendered by next/og: inline styles and flexbox only.
export default function OpengraphImage() {
	const features = ["Escalas", "Levitas", "Instrumentos", "Músicas"];

	return new ImageResponse(
		(
			<div
				style={{
					width: "100%",
					height: "100%",
					display: "flex",
					flexDirection: "column",
					justifyContent: "space-between",
					backgroundColor: "#fffbea",
					backgroundImage: "linear-gradient(135deg, #fffbea 45%, #fbe08a 100%)",
					padding: "72px",
					color: "#1a1a2e",
				}}
			>
				<div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
					<div
						style={{
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							width: "64px",
							height: "64px",
							borderRadius: "18px",
							backgroundColor: "#f2b01e",
							color: "#1a1a2e",
							fontSize: "36px",
							fontWeight: 700,
						}}
					>
						E
					</div>
					<div
						style={{
							display: "flex",
							fontSize: "22px",
							letterSpacing: "4px",
							textTransform: "uppercase",
							color: "#8a6100",
						}}
					>
						Escalas para grupos de louvor
					</div>
				</div>

				<div style={{ display: "flex", flexDirection: "column" }}>
					<div style={{ display: "flex", fontSize: "132px", fontWeight: 700, letterSpacing: "-4px", lineHeight: 1 }}>
						Eclesia
					</div>
					<div style={{ display: "flex", marginTop: "24px", fontSize: "36px", color: "#4a4a5e" }}>
						Uma amiga na hora de organizar os levitas.
					</div>
				</div>

				<div style={{ display: "flex", gap: "14px" }}>
					{features.map((feature) => (
						<div
							key={feature}
							style={{
								display: "flex",
								padding: "10px 22px",
								borderRadius: "999px",
								border: "2px solid #f2b01e",
								backgroundColor: "rgba(242,176,30,0.18)",
								fontSize: "24px",
								fontWeight: 600,
							}}
						>
							{feature}
						</div>
					))}
				</div>
			</div>
		),
		{ ...size },
	);
}
