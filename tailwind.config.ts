import type { Config } from "tailwindcss";

export default {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
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
  			},
        // Simplified animations (keep or remove as needed)
         'float': {
           '0%, 100%': { transform: 'translateY(0px)' },
           '50%': { transform: 'translateY(-8px)' }, // Reduced float distance
         },
         'rotate-in': { // Kept rotate-in for potential use
            '0%': { transform: 'rotateY(-90deg) scale(0.9)', opacity: '0' },
            '100%': { transform: 'rotateY(0deg) scale(1)', opacity: '1' },
          },
         'rotate-out': { // Kept rotate-out
            '0%': { transform: 'rotateY(0deg) scale(1)', opacity: '1' },
            '100%': { transform: 'rotateY(90deg) scale(0.9)', opacity: '0' },
          },
         'background-pan': { // Added background pan animation
           'from': { backgroundPosition: '0% center' },
           'to': { backgroundPosition: '-200% center' },
         },
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out',
        'float': 'float 3s ease-in-out infinite',
        'rotate-in': 'rotate-in 0.6s cubic-bezier(0.250, 0.460, 0.450, 0.940) both',
        'rotate-out': 'rotate-out 0.5s cubic-bezier(0.550, 0.085, 0.680, 0.530) both',
        'background-pan': 'background-pan 10s linear infinite', // Added background pan
  		}
  	}
  },
   plugins: [
       require("tailwindcss-animate"),
       // Removed require('tailwindcss-3d')
   ],
} satisfies Config;
