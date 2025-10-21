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
			border: 'var(--border)',
			input: 'var(--input)',
			ring: 'var(--ring)',
			background: 'var(--background)',
			foreground: 'var(--foreground)',
			tablebg: 'var(--table-bg)',
			colortext: 'var(--colortext)',
			specialtext: 'var(--special-text)',
			cardstartbg: 'var(--card-start-bg)',
  			primary: {
				DEFAULT: 'var(--primary)',
				foreground: 'var(--primary-foreground)'
  			},
  			subprimary: {
				DEFAULT: 'var(--subprimary)',
				foreground: 'var(--sub-primary-foreground)'
  			},
  			secondary: {
				DEFAULT: 'var(--secondary)',
				foreground: 'var(--secondary-foreground)'
  			},
  			special: {
				DEFAULT: 'var(--special)',
				foreground: 'var(--special-foreground)'
  			},
  			destructive: {
				DEFAULT: 'var(--destructive)',
				foreground: 'var(--destructive-foreground)'
  			},
  			muted: {
				DEFAULT: 'var(--muted)',
				foreground: 'var(--muted-foreground)'
  			},
  			accent: {
				DEFAULT: 'var(--accent)',
				foreground: 'var(--accent-foreground)'
  			},
  			popover: {
				DEFAULT: 'var(--popover)',
				foreground: 'var(--popover-foreground)'
  			},
  			card: {
				DEFAULT: 'var(--card)',
				foreground: 'var(--card-foreground)'
  			},
  			sidebar: {
				DEFAULT: 'var(--sidebar-background)',
				foreground: 'var(--sidebar-foreground)',
				primary: 'var(--sidebar-primary)',
				'primary-foreground': 'var(--sidebar-primary-foreground)',
				accent: 'var(--sidebar-accent)',
				'accent-foreground': 'var(--sidebar-accent-foreground)',
				border: 'var(--sidebar-border)',
				ring: 'var(--sidebar-ring)'
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