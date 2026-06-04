# US History Prep App (AP-Style Simulator) 🎓⏳

An interactive, high-fidelity practice application designed for students in **regular US History** courses who want to challenge themselves with **AP-style Stimulus-Based Multiple-Choice Questions (SBMCQs)**. It helps students prepare for complex unit tests and final exams by practicing document analysis and historical reasoning.

---

## 💡 The Problem & The Solution

In standard US History courses, unit tests and final exams increasingly feature AP-style stimulus-based questions. These require students to analyze historical source material (primary documents, maps, treaties, political cartoons, or charts) rather than relying on simple rote memorization. 

This app provides a focused practice simulator to master these test formats:
- **Curated AP-Style Dataset:** Houses 30 custom-developed, stimulus-based question profiles spanning key historical eras and thematic periods to simulate exam-level rigor.
- **Skill Mapping:** Tracks and exposes the specific **Historical Thinking Skill** tested in each item (e.g., *Contextualization, Comparison, Causation, Continuity & Change Over Time*).
- **Interactive Rationale Engines:** When a choice is selected, the app highlights correct options in emerald green and incorrect options in rose red, displaying a detailed analysis card explaining the historical logic of the question to ensure students learn from mistakes before their finals.

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
