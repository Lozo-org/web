# 17Lud Studio Design System

Design system issu de la review UI/UX Pro Max et adapte a un portfolio personnel de createur de bots Discord.

## Direction

- Product type: personal portfolio + Discord bot development studio.
- Mood: black/white, cinematic, technical, serious, premium, slightly cyber.
- Identity: 17Lud Studio first. QUP appears only as project examples.
- Layout: hero identity, about, services, project examples, trust reasons, process, direct contact.
- Visual asset: immersive Discord systems dashboard in `public/images/qup-bots-hero-dashboard.png`.
- 3D layer: subtle Three.js monogram/object in the hero, full-bleed and unframed.

## Tokens

- Background: `#020204`, `#050509`, `#090A12`.
- Surface: `rgba(255,255,255,.052)`.
- Surface strong: `rgba(255,255,255,.085)`.
- Text: `#F6F6F7`.
- Muted text: `#A1A1AA`.
- Accent chrome: `#FFFFFF`.
- Accent steel: `#D4D4D8`.
- Accent smoke: `#71717A`.
- Border: `rgba(255,255,255,.12)`.
- Radius cards: `8px`.
- Section rhythm: `112px` desktop, `80px` mobile.

## Typography

- Heading: Geist Sans, 600-700.
- Body: DM Sans/Geist Sans, 400-500.
- Mono/data: Geist Mono.
- Body base: 16px minimum.
- Letter spacing: default only.

## Interaction

- Use 150-300ms transitions.
- Animate transform/opacity only.
- Visible focus rings on every control.
- Respect `prefers-reduced-motion`.
- Min interactive height: 44px.
- Cards can use subtle 3D hover, disabled by reduced motion.

## Component Rules

- Use Lucide icons, no emoji as structural icons.
- Keep repeated cards at 8px radius.
- Use glass effect lightly: blur + 1px border + subtle inner highlight.
- Contact is direct only: Discord username copy and mailto email link.
- Do not make QUP the main brand in hero, nav, metadata or footer.
- Use progressive enhancement for modern motion: View Transition API, `animation-timeline: view()`, and `@starting-style`.
