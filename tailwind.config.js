/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                parchment: '#F9F5EB',
                forest: '#1B3022',
                copper: '#B87333',
                vdark: '#0A0A0B',
                starlight: '#EAEADB',
                nebula: '#1C1C21',
                'gold-dust': '#D4AF37',
                ethereal: 'rgba(255, 255, 255, 0.05)',
            },
            fontFamily: {
                serif: ['"Cormorant Garamond"', '"Playfair Display"', 'serif'],
                sans: ['"Outfit"', 'sans-serif'],
            },
            backgroundImage: {
                'grain': "url('data:image/svg+xml,%3Csvg viewBox=\"0 0 200 200\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cfilter id=\"noiseFilter\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.80\" numOctaves=\"1\" stitchTiles=\"stitch\"/%3E%3C/filter%3E%3Crect width=\"100%25\" height=\"100%25\" filter=\"url(%23noiseFilter)\" opacity=\"0.05\"/%3E%3C/svg%3E')",
                'lux-gradient': "linear-gradient(to bottom, #0A0A0B, #111114)",
            },
            animation: {
                'float': 'float 6s ease-in-out infinite',
                'float-delayed': 'float 6s ease-in-out 3s infinite',
                'steam': 'steam 4s ease-out infinite',
                'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                steam: {
                    '0%': { opacity: '0.8', transform: 'translateY(0) scale(1)' },
                    '100%': { opacity: '0', transform: 'translateY(-40px) scale(1.5)' },
                },
                fadeInUp: {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                }
            }
        },
    },
    plugins: [],
}
