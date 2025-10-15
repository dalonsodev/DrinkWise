# DrinkWise Menu 🍹

A **React-based web application** designed for bars in Spain to showcase an interactive drink menu. The app allows users to browse cocktails, filter by category, and receive personalized recommendations through a concise quiz. Built with a focus on **responsiveness** and **multilingual support** (Spanish and English) to cater to both local and international customers.

---

## 🚀 Features

- **Interactive Drink Menu:** Browse and filter cocktails by category (e.g., alcoholic, non-alcoholic).
- **Recommendation Quiz:** A quick, 3-step quiz to suggest drinks based on user preferences (e.g., alcohol content, flavor profile, spirit type).
- **Multilingual Support:** Fully localized in Spanish and English using `react-i18next` for seamless language switching.
- **Responsive Design:** Mobile-first UI with CSS units tailored for scalability:
   - `rem` for font sizes to ensure consistent scaling.
   - `em` for margins and paddings for proportional spacing.
   - `px` for border-radius and specific width constraints.
- **Modular Architecture:** Organized component structure with reusable components (DrinkCard, Layout), custom hooks (useLazyBackground), and centralized styles in index.css.

---

## 🛠️ Tech Stack

| Technology      | Purpose                                      |
|-----------------|----------------------------------------------|
| React           | Dynamic, component-based UI                  |
| React Router    | Client-side navigation                       |
| react-i18next   | Internationalization (Spanish/English)       |
| CSS             | Centralized styles with custom CSS units     |
| React Context   | Global state management                      |
| Vite            | Fast development environment                 |

---

## 📂 Project Structure

```
src/
├── components/          # Reusable components
│   ├── common/         # Shared components (e.g., LanguageSelector)
│   ├── layout/         # Layout components (e.g., Navbar, Footer)
│   └── features/       # Feature-specific components (e.g., Quiz, DrinkCard)
├── pages/              # Page-level components (e.g., HomePage, DrinkDetailPage)
├── hooks/              # Custom hooks (e.g., useQuiz, useLazyBackground)
├── locales/            # Translation files (es.json, en.json)
├── data/               # Mock data (e.g., drinks.json)
├── styles/             # Global styles (index.css)
├── i18n.js             # i18next configuration
├── App.jsx             # Main app component
├── index.jsx           # Entry point
└── index.css           # Global styles
```

---

## 🏗️ Setup and Installation

1. **Clone the repository:**
    ```bash
    git clone https://github.com/dalonsodev/drinkwise-menu.git
    ```

2. **Install dependencies:**
    ```bash
    npm install
    ```

3. **Run the development server:**
    ```bash
    npm start
    ```

---

## 🔄 Development Process

This project is built with a modular and scalable approach from the start. Key decisions include:

- **Early i18n Integration:** Implemented `react-i18next` from the beginning to support Spanish and English, avoiding costly refactors and ensuring a seamless multilingual experience.
- **CSS Units:** Using `rem` for font sizes, `em` for margins/paddings, and `px` for border-radius to ensure accessibility and responsiveness.
- **Custom Hook:** Developed useLazyBackground for efficient image loading in DrinkCard components.
- **Git Workflow:** Descriptive commits (e.g., `feat: setup i18n with react-i18next`) to maintain a clean codebase.

---

## 📅 Next Steps

- Implement the recommendation quiz with a maximum of 3 questions (e.g., alcohol preference, flavor profile, spirit type).
- Add filtering functionality to MenuPage.jsx to sort cocktails by category or ingredient.
- Enhance responsiveness with media queries in index.css for better mobile support (e.g., adjust cocktail-card layout).
- Deploy to Netlify/Vercel for a live demo.

---

## 📬 Contact

For questions or feedback, reach out at **[email]**.  
A live demo will be available at **[Netlify/Vercel link]** once deployed.