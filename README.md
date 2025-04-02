# Recipe Finder

A modern web app to search and view recipes by keyword, cuisine, and preparation time.  
Built with **Next.js App Router**, **Tailwind CSS**, **TypeScript**, and the [Spoonacular API](https://spoonacular.com/food-api).

---

## Features

- Search recipes by name, cuisine, and max prep time
- View full recipe details with image, ingredients, and instructions
- Server-side rendering with 1-minute cache (ISR)
- ESLint & Prettier configured with Flat Config
- Responsive and accessible UI

---

## 🔧 Getting Started

### 1. Clone the project

```bash
git clone https://github.com/Kati0405/recipe-finder.git
cd recipe-finder
```



### 2. Install dependencies

```bash
npm install
```

### 3. Add environment variables

Create a .env.local file:

```bash
SPOONACULAR_API_KEY=your_api_key_here
```

You can get your key at: https://spoonacular.com/food-api


### Development

```bash
npm run dev
```

Visit http://localhost:3000


### Build for Production

```bash
npm run build
npm start
```

### Lint & Format
```bash
npm run lint
npm run lint:fix
```

### Tech Stack
Next.js App Router

Tailwind CSS

TypeScript

Spoonacular API

ESLint + Flat Config

Prettier

