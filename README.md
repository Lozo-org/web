# 17Lud Studio

Portfolio personnel premium pour presenter des creations de bots Discord, des services custom et des exemples de projets comme QUP MANA, QUP Commu, QUP MANS et QUP CORE.

## Lancer le site

```bash
npm install
npm run dev
```

Ouvre ensuite `http://127.0.0.1:3000`.

## Configuration

La cle 21st.dev reste uniquement en variable d'environnement locale ou dans les variables du provider de deploiement.

```bash
API_KEY_21ST="[COLLER_TA_CLE_API_ICI]"
21ST_API_KEY=""
```

Ne mets jamais `.env.local` dans Git. Le frontend ne lit pas `API_KEY_21ST` ou `21ST_API_KEY`.

## Ou modifier le contenu

- Branding personnel : `src/lib/site-content.ts`, objet `brand`.
- Services : `src/lib/site-content.ts`, tableau `services`.
- Projets / exemples de bots : `src/lib/site-content.ts`, tableau `projects`.
- Contact direct : `src/lib/site-content.ts`, objet `brand`, et `src/components/site/contact-actions.tsx`.
- Hero 3D : `src/components/site/hero-scene.tsx`.
- Configuration 21st.dev : `src/lib/magic-21st.ts` et `.env.local`.
- Direction artistique : `docs/design-system.md`.

## Contact

Le site utilise un contact simple :

- Discord : `17lud`
- Email : `ludofootball@icloud.com`

Il n'y a pas de backend de formulaire a configurer pour cette version.

## Verifications

```bash
npm run lint
npm run build
```

