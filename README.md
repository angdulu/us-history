# APUSH Quest 🎓⏳

An interactive, high-fidelity prep application designed specifically for **AP US History (APUSH)** students. It focuses on the most challenging aspect of the AP exam: **Stimulus-Based Multiple-Choice Questions (SBMCQs)**.

---

## 💡 The Problem & The Solution

The College Board's AP US History exam relies heavily on stimulus-based questions where students must analyze historical source material (primary documents, maps, treaties, political cartoons, or charts) to answer a cluster of analytical questions. Standard flashcard tools fail because they test raw recall instead of historical thinking skills.

**APUSH Quest** provides a focused, highly interactive simulator for these questions:
- **Curated High-Difficulty Dataset:** Houses 30 custom-developed, College Board-aligned stimulus-based question profiles spanning key historical eras and thematic periods.
- **Skill Mapping:** Tracks and exposes the specific **Historical Thinking Skill** tested in each item (e.g., *Contextualization, Comparison, Causation, Continuity & Change Over Time*).
- **Interactive Rationale Engines:** When a choice is selected, the app highlights correct options in emerald green and incorrect options in rose red, displaying a detailed analysis card explaining the historical logic of the question.

---

## ⚡ Key Technical Features

- **State Persistence (Local Bookmarking):** Uses `localStorage` bindings to persist user bookmarks across sessions, enabling students to isolate and bookmark difficult document groups.
- **Grid-Based Navigation Overlay (Jump Menu):** Built an overlay menu allowing students to see their progress, view bookmarked status across the entire dataset, and jump to specific questions.
- **Bookmarks Filter Mode:** Dynamically re-maps current index ranges through a `useMemo` filter layer to allow seamless, contiguous cycling *only* through bookmarked questions.
- **Premium Interface:** A clean dark-mode-first aesthetic with glowing gradient background spheres, glassmorphic containers, and physics-based transitions powered by Framer Motion.

---

## 🛠️ Technology Stack

- **Framework:** React 19 + TypeScript + Vite
- **Styling:** Tailwind CSS (Modern dark-mode support)
- **Animations:** Motion (Framer Motion React adapter)
- **Iconography:** Lucide React

---

## 🚀 Installation & Local Run

Ensure you have [Node.js](https://nodejs.org) installed.

1. **Clone the repository:**
   ```bash
   git clone https://github.com/angdulu/us-history.git
   cd us-history
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Verify bundle compilation:**
   ```bash
   npm run build
   ```

---
*Created by Andrew Kim.*
