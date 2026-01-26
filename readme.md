# Project: The Unbreakable Vow (Harry Potter Proposal App)

## 1. Project Overview
This is a romantic, interactive single-page web application designed as a "Propose Day" surprise. The user experience mimics the flow of the viral "Will you be mine?" apps but is heavily themed around **Harry Potter**. 

**Core Narrative:** The user (girlfriend) is presented with a magical contract to become my "Player 2" / "Permanent Partner in Mischief."

## 2. Tech Stack & Tools
* **Framework:** Next.js 14+ (App Router)
* **Styling:** Tailwind CSS (for layout and typography)
* **Animations:** GSAP (GreenSock) or Framer Motion (for "magical" transitions and floating elements).
* **Icons:** Lucide-React
* **Assets:** Placeholders for images/videos (I will replace these later).

## 3. Design System (Theme: "Hogwarts Romance")
* **Color Palette:**
    * *Background:* `bg-[#f5e6c8]` (Aged Parchment/Marauder's Map color).
    * *Primary Text:* `text-[#3e1f18]` (Ink/Dark Brown).
    * *Accents:* `text-[#740001]` (Gryffindor Red) and `text-[#d3a625]` (Golden Snitch Gold).
* **Typography:** Use a Google Font that resembles magic (e.g., 'Cinzel Decorative' or 'Crimson Text').
* **Visual Motifs:** Footsteps appearing on scroll, floating candles, envelopes with wax seals.

## 4. User Flow & Features

### Phase 1: The Landing (The Question)
* **Central Image:** A cute animated character (e.g., a cat or owl) wearing a Gryffindor scarf and holding a wand.
* **Main Text:** "I solemnly swear that I am up to no good... but will you make this mischief permanent?"
* **The Buttons:**
    * **Button A (YES):** Label: "Always" (Snape reference). Green/Gold styling.
    * **Button B (NO):** Label: "Avada Kedavra" or "No".
* **Interaction (The "Confundus" Charm):** * If the cursor hovers over the **NO** button, the button *must* teleport to a random location on the screen instantly so it cannot be clicked.
    * If **YES** is clicked, trigger a "Lumos Maxima" animation (screen flash white/gold confetti) and transition to Phase 2.

### Phase 2: The Dashboard (The Room of Requirement)
* **Header:** "Mischief Managed! ⚡️"
* **Navigation:** Display 3 Magical Cards (similar to the video's menu):
    1.  **The Pensieve (Gallery):** "View our core memories."
    2.  **Owl Post (Letter):** "A letter from the Department of Mysteries (My Heart)."
    3.  **The Mirror of Erised (Video):** "Our story."

### Phase 3: The Content Views (Modals or Sections)
* **The Pensieve (Gallery):** * A grid of 6 Polaroid-style photos.
    * Effect: When hovered, the photos should ripple slightly like water in a Pensieve.
* **Owl Post (Letter):**
    * An animation of an envelope opening.
    * Inside, a heartfelt letter written in a handwritten font style.
* **The Mirror of Erised (Video/Timeline):**
    * A simple video player wrapper or a vertical timeline of dates.

### Phase 4: The Footer
* **Text:** "Footer: Managed by [Your Name]. Together until the very end."

## 5. Implementation Instructions for AI
1.  **Setup:** Initialize the Next.js app with Tailwind.
2.  **Assets:** Create an `assets` folder structure.
3.  **Components:**
    * Create `ConfundusButton.tsx` (The running "No" button).
    * Create `MagicalCard.tsx` (For the menu items).
    * Create `PensieveGallery.tsx` (Photo grid).
4.  **Animation:** Use GSAP/Framer Motion to make the "Yes" transition seamless.
5.  **Responsiveness:** Ensure the "No" button logic works on mobile (moves on touch start) so she can't click it on her phone either.

## 6. Specific Code Snippet Requests
* **"No" Button Logic:** Ensure the button calculates the window bounds so it doesn't disappear off-screen.
* **Confetti:** Use `canvas-confetti` package for the "Yes" celebration, customized with gold colors.