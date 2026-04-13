# Ahya React JS Developer Assessment

**Live Demo:** https://stately-gecko-bd4824.netlify.app/ 
**GitHub Repo:** https://github.com/mahdahmed/Assessment.git

---

## 🚀 Setup Instructions (Vite Project)

### 1. Clone the repository
```bash
git clone https://github.com/mahdahmed/Assessment.git
cd ahya-assessment
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start the development server
```bash
npm run dev
```

The app will open at `http://localhost:5173`

### 4. Build for production (optional)
```bash
npm run build
npm run preview
```

---

## 🛠 Technical Decisions

- **Framework**: Vite + React 18 + TypeScript (fast HMR and excellent DX)
- **Routing**: React Router DOM v6 (clean sidebar navigation)
- **Styling**:
  - Tailwind CSS for Tasks 1, 2, and 3 (rapid responsive development)
  - **CSS Modules only** for Task 4 (as explicitly required)
- **Icons**: Lucide React (lightweight and consistent)
- **Modal**: `react-modal` (production-grade focus management, escape key, overlay click)
- **Toast**: `react-toastify` (stackable, auto-dismiss with progress bar, 4 types)
- **Form Validation**: Custom logic (no form libraries)
- **Data**: Mock data + public FakeStore API for Task 3


---

## 📋 Task Breakdown

### Task 1: Responsive Dashboard Layout
- Built a fully responsive analytics dashboard shell.
- **Sidebar**: Collapsible on mobile (overlay + backdrop), persistent on desktop with 5+ nav items and Lucide icons. Active states clearly highlighted.
- **Header**: Search input (desktop only), notification bell, and user avatar with fully functional dropdown menu.
- **Main Content**:
  - 3-column metric card grid that stacks to 1 column on mobile (375px).
  - Revenue growth bar chart (pure Tailwind).
  - New Insights card.
  - Sortable transactions table (client-side sorting, responsive on mobile).
- Semantic HTML used (`<aside>`, `<header>`, `<main>`, `<nav>`).
- No layout overflow or horizontal scroll at any breakpoint.

**Status**: completed and matches the provided design screenshots.

### Task 2: Multi-Step Form with Validation
- 3-step onboarding form with local state.
- Custom validation on blur (no form library).
- Progress indicator, back/next navigation, review screen.
- Field-level error messages, disabled submit until valid.
- Keyboard accessible (Tab, Enter, Escape).
- Success state notification.

### Task 3: Async Data Fetching with States
- Product listing page using Dummyjson API.
- Search bar with custom debounce (400ms).
- Category filter chips.
- Loading skeleton (matches card shape).
- Error state with retry button.
- Empty state.
- Pagination (chosen over infinite scroll for better UX and easier state management).

### Task 4: Reusable Component Library
- Built **Button**, **Input**, **Modal**, and **Toast** system.
- **Styling**: Pure CSS Modules (no Tailwind Used in this task).
- **Modal** (`react-modal`):
  - Header / Body / Footer slots.
  - Closes on Escape key and overlay click.
  - Auto-focuses first input field when opened.
  - Proper focus trap and return focus.
- **Toast** (`react-toastify`):
  - 4 types (success, error, warning, info).
  - Auto-dismiss with progress bar.
  - Stackable and individually dismissible.
- All components accept `className` for overrides and maintain consistent design.

---

## 🔄 Known Limitations & Future Improvements

- Table sorting in Task 1 is client-side only.
- Form data in Task 2 is stored in local state (not persisted to backend).
- Task 3 uses public API (no authentication).
- With more time I would:
  - Add dark mode support.
  - Implement real backend integration.
  - Improve accessibility scores.

---

## ⏱ Time Spent

| Task                          | Time Spent |
|-------------------------------|------------|
| Project Setup + Routing       | 25 min     |
| Task 1 (Dashboard Layout)     | 65 min     |
| Task 2 (Multi-Step Form)      | 45 min     |
| Task 3 (Async Fetching)       | 55 min     |
| Task 4 (Component Library)    | 65 min     |
| Refactoring + Polish + README | 45 min     |


I took slightly more than the suggested 4 hours to ensure high code quality, accessibility, and reusability.

---

## ✅ Assessment Notes

- All 4 tasks are completed.
- Commit history shows small, meaningful commits.
- Code is clean, typed, and well-structured.
- Fully responsive across mobile (375px), tablet (768px), and desktop.

Thank you for the opportunity!  

