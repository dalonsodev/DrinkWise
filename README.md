# DrinkWise Menu 🍹

A **React-based web application** designed for bars in Spain to showcase an interactive drink menu. The app allows users to browse cocktails, filter by category, and receive personalized recommendations through a concise quiz. Built with a focus on **responsiveness** and **multilingual support** (Spanish and English) to cater to both local and international customers.

---

## 🚀 Features

- **Interactive Drink Menu:** Browse and filter cocktails by category (e.g., alcoholic, non-alcoholic, flavor profile, main spirit).
   -**Horizontal swipe:** Achieve 0 vertical scroll
   -**CSS Grid:** 80vw cards + 10vw padding + 5vw gaps
   -**Scroll Snap:** x mandatory + center align
   -**Peek Cards:** 10% next cocktail visible (invitation to swipe)
- **Cocktail Count Display:** Shows the number of cocktails available after applying filters, with the number highlighted in gold (--accent) for better UX.
- **Clear Filters Button:** A subtle button to reset category and spirit filters, displayed only when filters are active.
- **Filter Logic Abstraction:** Uses a custom hook (useDrinkFilters) and a FilterControls component for modular and reusable filter management.
- **Recommendation Quiz:** A quick, 3-step quiz to suggest drinks based on user preferences (e.g., alcohol content, flavor profile, spirit type).
   - **Auto-advance** single-choice questions (150ms UX delay)
   - **Multi-choice** spirit selection with visual toggle
   - **Smart navigation**: Discreet "‹ Back" + prominent "See Results" button
   - **Confirmation flow**: Back button resets previous step for re-selection
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
| i18next-icu     | Support for ICU pluralization in translations|
| CSS             | Centralized styles with custom CSS units     |
| React Context   | Global state management                      |
| Vite            | Fast development environment                 |

---

## 📂 Project Structure

```
src/
├── components/          # Reusable components
│   ├── common/         # Shared components (e.g., ProgressIndicator, Question, Option, ToggleAlcohol)
│   ├── layout/         # Layout components (e.g., Navbar, Footer)
│   └── features/       # Feature-specific components (e.g., Quiz, DrinkCard, FilterControls)
├── pages/              # Page-level components (e.g., HomePage, DrinkDetailPage)
├── hooks/              # Custom hooks (e.g., useDrinkFilters, useLazyBackground)
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
- **Cocktail Count and Filters:** Added a cocktail count display with a highlighted number in gold (--accent) for better UX, along with a subtle "Clear filters" button that appears only when filters are active.
- **Filter Logic Abstraction:** Extracted filter logic into a custom hook (useDrinkFilters) and UI into FilterControls to improve modularity and maintainability.
- **Quiz Implementation:**
   - **State Management:** answers, currentStep, lastAnsweredStep for smooth navigation
   - **Auto-advance Logic:** useEffect + 150ms timeout for visual feedback
   - **Reset Pattern:** Back button resets target step
   - **Unified Styling:** .menu-filter-btn for options + navigation consistency
   - **UX Flow:** Confirmation -> Progress -> Questions -> Results
- **Custom Hooks:** Developed useLazyBackground for efficient image loading in DrinkCard components and useDrinkFilters to improve modularity and mantainability.
- **Git Workflow:** Descriptive commits (e.g., `feat: setup i18n with react-i18next`) to maintain a clean codebase.

---

## 📅 Next Steps

- [x] Add filtering functionality to MenuPage.jsx to sort cocktails by category or ingredient.
- [x] Implement the recommendation quiz with a maximum of 3 questions (e.g., alcohol preference, flavor profile, spirit type).
- [x] Implement cocktail carousel in ManuPage.
- [x] Implement cocktail carousel to show suggested cocktail drinks.
- [] Add ability for the user to see cocktail details (e.g. ingredients, allergens) by tapping the drink card.
- [] Enhance responsiveness with media queries in index.css for better mobile support (e.g., adjust cocktail-card layout).
- [] Deploy to Netlify for a live demo.

---

## 📬 Contact

For questions or feedback, reach out at **[email]**.  
A live demo will be available at **[Netlify/Vercel link]** once deployed.