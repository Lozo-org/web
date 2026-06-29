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

Tout le texte visible vit dans `src/lib/site-content.ts`, en deux langues : `fr` et `en`.
Le bouton FR / EN (en haut à droite) bascule l'ensemble du site.

- Branding personnel : `src/lib/site-content.ts`, objet `brand` (dans `fr` et `en`).
- Services : `src/lib/site-content.ts`, `services.items`.
- Projets / exemples de bots : `src/lib/site-content.ts`, `projects.items`.
- **Tarifs** : `src/lib/site-content.ts`, `pricing.tiers` (montants, devise, features, badge "featured").
- **Traductions** : modifie les objets `fr` et `en` côte à côte. La langue par défaut est `DEFAULT_LOCALE`.
- **Formulaire de contact** : `src/components/site/contact-form.tsx` (UI) et `src/app/api/contact/route.ts` (envoi email).
- Photo de profil : remplace `public/images/profile.svg` par ta photo (même nom, ou change l'URL dans la section About de `src/app/page.tsx`).
- Hero 3D : `src/components/site/hero-scene.tsx`.
- Animations : `src/components/site/reveal.tsx`, `animated-section.tsx`, `scroll-progress.tsx`.
- Configuration 21st.dev : `src/lib/magic-21st.ts` et `.env.local`.
- Direction artistique : `docs/design-system.md`.

## Contact & formulaire email

Le site propose trois canaux : le **formulaire** (envoi direct par email), Discord et email.

- Discord : `17lud`
- Email : `ludofootball@icloud.com`

### Activer l'envoi d'email du formulaire (Resend)

Le formulaire fonctionne sans config (il bascule alors sur le fallback email/Discord).
Pour qu'il t'envoie un vrai email :

1. Crée un compte gratuit sur [resend.com](https://resend.com) avec `ludofootball@icloud.com`.
2. Génère une API key sur [resend.com/api-keys](https://resend.com/api-keys).
3. Ajoute `RESEND_API_KEY` dans `.env.local` (local) **et** dans Vercel
   (`Project > Settings > Environment Variables`), puis redéploie.

Tant qu'aucun domaine n'est vérifié sur Resend, l'expéditeur partagé
`onboarding@resend.dev` n'envoie qu'à l'adresse de ton compte Resend — d'où
l'intérêt d'utiliser `ludofootball@icloud.com` à l'inscription. Voir
`.env.local.example` pour `CONTACT_TO_EMAIL` et `CONTACT_FROM_EMAIL`.

## Verifications

```bash
npm run lint
npm run build
```

