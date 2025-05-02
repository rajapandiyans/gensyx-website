
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
       textShadow: { // Added text shadow utility
         sm: '0 1px 2px var(--tw-shadow-color)',
         DEFAULT: '0 2px 4px var(--tw-shadow-color)',
         lg: '0 8px 16px var(--tw-shadow-color)',
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
        // Kept existing animations
         'float': {
           '0%, 100%': { transform: 'translateY(0px)' },
           '50%': { transform: 'translateY(-10px)' }, // Increased float distance
         },
         'rotate-in': {
            '0%': { transform: 'rotateY(-90deg) scale(0.9)', opacity: '0' },
            '100%': { transform: 'rotateY(0deg) scale(1)', opacity: '1' },
          },
         'rotate-out': {
            '0%': { transform: 'rotateY(0deg) scale(1)', opacity: '1' },
            '100%': { transform: 'rotateY(90deg) scale(0.9)', opacity: '0' },
          },
         'background-pan': {
           'from': { backgroundPosition: '0% center' },
           'to': { backgroundPosition: '-200% center' },
         },
         'pulse-glow': { // Ensure pulse-glow is defined if used
            '0%, 100%': {
              opacity: '0.7',
              boxShadow: '0 0 5px hsl(var(--primary) / 0.5), 0 0 10px hsl(var(--primary) / 0.4)',
            },
            '50%': {
              opacity: '1',
              boxShadow: '0 0 10px hsl(var(--primary) / 0.7), 0 0 20px hsl(var(--primary) / 0.6)',
            },
          },
          'subtle-fade-in-down': { // Ensure subtle-fade-in-down is defined
            from: {
              opacity: '0',
              transform: 'translateY(-10px)',
            },
            to: {
              opacity: '1',
              transform: 'translateY(0)',
            },
          },
          'subtle-fade-in-up': { // Ensure subtle-fade-in-up is defined
            from: {
              opacity: '0',
              transform: 'translateY(10px)',
            },
            to: {
              opacity: '1',
              transform: 'translateY(0)',
            },
          },
          'subtle-scale-in': { // Ensure subtle-scale-in is defined
            from: { transform: 'scale(0.95)', opacity: '0' },
            to: { transform: 'scale(1)', opacity: '1' },
          },
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out',
        'float': 'float 4s ease-in-out infinite', // Adjusted duration
        'rotate-in': 'rotate-in 0.7s cubic-bezier(0.250, 0.460, 0.450, 0.940) both',
        'rotate-out': 'rotate-out 0.6s cubic-bezier(0.550, 0.085, 0.680, 0.530) both',
        'background-pan': 'background-pan 10s linear infinite',
        'pulse-glow': 'pulse-glow 2.5s infinite ease-in-out', // Add animation utility
         'fade-in-down': 'subtle-fade-in-down 0.5s ease-out forwards', // Add animation utility
         'fade-in-up': 'subtle-fade-in-up 0.5s ease-out forwards', // Add animation utility
         'subtle-scale-in': 'subtle-scale-in 0.5s ease-out forwards', // Add animation utility

  		}
  	}
  },
   plugins: [
       require("tailwindcss-animate"),
       // Removed require('@tailwindcss/typography') as it's not installed
        function ({ matchUtilities, theme }) { // Added text-shadow utility
          matchUtilities(
            {
              'text-shadow': (value) => ({
                textShadow: value,
              }),
            },
            { values: theme('textShadow') }
          )
        },
   ],
} satisfies Config;
