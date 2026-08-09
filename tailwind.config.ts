import type { Config } from 'tailwindcss';
const config: Config = { content: ['./src/**/*.{ts,tsx,mdx}'], theme: { extend: { colors: { mafia: { black:'#070707', charcoal:'#111113', graphite:'#1b1b1f', zinc:'#2a2a31', bone:'#f4f0e8', red:'#9f111b', ember:'#d9252e' } }, fontFamily: { display:['var(--font-display)','Arial Black','sans-serif'], body:['var(--font-body)','Inter','sans-serif'] }, boxShadow:{cinema:'0 40px 120px rgba(0,0,0,.45)'}, backgroundImage:{grain:'radial-gradient(circle at 1px 1px, rgba(255,255,255,.08) 1px, transparent 0)'} } }, plugins: [] };
export default config;
