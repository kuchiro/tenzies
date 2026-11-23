# 🎲 Tenzies

Un petit jeu de dés fait avec **React** et **Vite**, réalisé pendant mon apprentissage de React.

Le but est simple : lancer les dés jusqu'à ce qu'ils affichent **tous la même valeur**, le plus vite possible et en le moins de lancers possible.

---

## 🏠 La page d'accueil

Quand on arrive sur le site, une page d'accueil s'affiche avant de commencer la partie :

- un rappel rapide des **règles du jeu** ;
- un **curseur pour choisir le nombre de dés** avec lequel on veut jouer (de **4 à 30** dés, 10 par défaut comme le Tenzies classique) ;
- un bouton **Start** qui lance la partie… et le chronomètre ⏱️.

La grille de dés s'adapte au nombre choisi (2 lignes jusqu'à 12 dés, puis 5 ou 6 colonnes), et les dés rétrécissent sur les petits écrans pour que le jeu reste jouable sur téléphone.

## 📜 Les règles du jeu

1. Au début de la partie, tous les dés sont lancés au hasard.
2. **Clique sur un dé** pour le bloquer : il devient vert 🟩 et ne bougera plus aux prochains lancers. Clique à nouveau dessus pour le débloquer.
3. Clique sur **Roll** pour relancer tous les dés qui ne sont pas bloqués.
4. Continue jusqu'à ce que **tous les dés soient bloqués et aient la même valeur**.
5. 🎉 Gagné ! Des confettis apparaissent et le jeu affiche ton nombre de lancers et ton temps.

## ✨ Fonctionnalités

- 🎲 Choix du nombre de dés avant chaque partie
- ⏱️ **Chronomètre** : il démarre quand on clique sur *Start* et s'arrête au moment où on gagne
- 🔢 **Compteur de lancers**
- 🎉 Confettis à la victoire
- 🔁 Bouton **New Game** pour rejouer avec le même nombre de dés
- ↩️ Lien **Change number of dice** pour revenir à la page d'accueil
- 📱 Mise en page adaptée au téléphone
- ♿ Message de victoire lu par les lecteurs d'écran et focus automatique sur le bouton *New Game*

## 🛠️ Technologies utilisées

- [React](https://react.dev/) (`useState`, `useEffect`, `useRef`)
- [Vite](https://vite.dev/) pour le serveur de développement et le build
- [nanoid](https://github.com/ai/nanoid) pour donner un id unique à chaque dé
- [react-confetti](https://github.com/alampros/react-confetti) pour les confettis

## 📁 Organisation du projet

```
src/
├── main.jsx               → point d'entrée de l'application
├── index.css              → tout le style du jeu
└── component/
    ├── App.jsx            → la logique du jeu (dés, lancers, timer, victoire)
    ├── StartScreen.jsx    → la page d'accueil (choix du nombre de dés)
    └── Die.jsx            → un dé
public/images/             → les images des faces de dés (1 à 6)
```

## 🚀 Lancer le projet en local

```bash
npm install
npm run dev
```

Puis ouvrir l'adresse affichée dans le terminal (en général http://localhost:5173).

## 🌐 Déploiement sur Netlify

Le fichier `netlify.toml` indique à Netlify comment construire le site :

- commande de build : `npm run build`
- dossier publié : `dist`

**Option 1 – depuis GitHub (recommandé)** : sur [app.netlify.com](https://app.netlify.com), *Add new site → Import an existing project*, choisir le dépôt GitHub. Netlify lit `netlify.toml` tout seul et redéploie le site à chaque `git push`.

**Option 2 – en ligne de commande** :

```bash
npx netlify-cli login
npx netlify-cli deploy --build --prod
```
