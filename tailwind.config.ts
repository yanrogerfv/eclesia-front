import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
  prefix: "",
  theme: {
  	container: {
  		center: true,
  		padding: '2rem',
  		screens: {
  			'2xl': '1400px'
  		}
  	},
	fontFamily: {
		sans: ['var(--font-inter)', 'sans-serif'],
		serif: ['var(--font-lexend)', 'serif'],
		mono: ['var(--font-roboto)', 'monospace'],
		display: ['var(--font-poppins)', 'sans-serif'],
		notosans: ['var(--font-notosansjp)', 'sans-serif'],
	},
  	extend: {
  		colors: {
			border: 'oklch(from var(--border) l c h / <alpha-value>)',
			input: 'oklch(from var(--input) l c h / <alpha-value>)',
			ring: 'oklch(from var(--ring) l c h / <alpha-value>)',
			background: 'oklch(from var(--background) l c h / <alpha-value>)',
			foreground: 'oklch(from var(--foreground) l c h / <alpha-value>)',
			tablebg: 'oklch(from var(--table-bg) l c h / <alpha-value>)',
			colortext: 'oklch(from var(--colortext) l c h / <alpha-value>)',
			specialtext: 'oklch(from var(--special-text) l c h / <alpha-value>)',
			cardstartbg: 'oklch(from var(--card-start-bg) l c h / <alpha-value>)',
  			primary: {
				DEFAULT: 'oklch(from var(--primary) l c h / <alpha-value>)',
				foreground: 'oklch(from var(--primary-foreground) l c h / <alpha-value>)'
  			},
  			subprimary: {
				DEFAULT: 'oklch(from var(--subprimary) l c h / <alpha-value>)',
				foreground: 'oklch(from var(--sub-primary-foreground) l c h / <alpha-value>)'
  			},
  			secondary: {
				DEFAULT: 'oklch(from var(--secondary) l c h / <alpha-value>)',
				foreground: 'oklch(from var(--secondary-foreground) l c h / <alpha-value>)'
  			},
  			special: {
				DEFAULT: 'oklch(from var(--special) l c h / <alpha-value>)',
				foreground: 'oklch(from var(--special-foreground) l c h / <alpha-value>)'
  			},
  			destructive: {
				DEFAULT: 'oklch(from var(--destructive) l c h / <alpha-value>)',
				foreground: 'oklch(from var(--destructive-foreground) l c h / <alpha-value>)'
  			},
  			muted: {
				DEFAULT: 'oklch(from var(--muted) l c h / <alpha-value>)',
				foreground: 'oklch(from var(--muted-foreground) l c h / <alpha-value>)'
  			},
  			accent: {
				DEFAULT: 'oklch(from var(--accent) l c h / <alpha-value>)',
				foreground: 'oklch(from var(--accent-foreground) l c h / <alpha-value>)'
  			},
  			popover: {
				DEFAULT: 'oklch(from var(--popover) l c h / <alpha-value>)',
				foreground: 'oklch(from var(--popover-foreground) l c h / <alpha-value>)'
  			},
  			card: {
				DEFAULT: 'oklch(from var(--card) l c h / <alpha-value>)',
				foreground: 'oklch(from var(--card-foreground) l c h / <alpha-value>)'
  			},
  			sidebar: {
				DEFAULT: 'oklch(from var(--sidebar-background) l c h / <alpha-value>)',
				foreground: 'oklch(from var(--sidebar-foreground) l c h / <alpha-value>)',
				primary: 'oklch(from var(--sidebar-primary) l c h / <alpha-value>)',
				'primary-foreground': 'oklch(from var(--sidebar-primary-foreground) l c h / <alpha-value>)',
				accent: 'oklch(from var(--sidebar-accent) l c h / <alpha-value>)',
				'accent-foreground': 'oklch(from var(--sidebar-accent-foreground) l c h / <alpha-value>)',
				border: 'oklch(from var(--sidebar-border) l c h / <alpha-value>)',
				ring: 'oklch(from var(--sidebar-ring) l c h / <alpha-value>)'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config