# Setup Instructions

## Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Run Development Server**
   ```bash
   npm run dev
   ```

3. **Open in Browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Customization

### Replace Placeholder Content

1. **Photos in Pensieve Gallery**
   - Add your photos to `assets/images/`
   - Update the `photos` array in `components/PensieveGallery.tsx` with your image paths

2. **Letter Content**
   - Edit the letter text in `components/OwlPost.tsx`
   - Replace `[Your Name]` with your actual name

3. **Timeline/Memories**
   - Update the `timeline` array in `components/MirrorOfErised.tsx` with your actual dates and memories

4. **Video**
   - Add your video to `assets/videos/`
   - Update the video player section in `components/MirrorOfErised.tsx`

5. **Footer Name**
   - Replace `[Your Name]` in `app/page.tsx` footer section

6. **Animated Character**
   - Replace the owl emoji (🦉) with your preferred character image or animation

## Build for Production

```bash
npm run build
npm start
```

## Features Implemented

### Core Features
✅ Phase 1: Landing page with animated character and Confundus Button (NO button teleports)
✅ Phase 2: Dashboard with magical cards
✅ Phase 3: All content views (Pensieve, Owl Post, Mirror of Erised)
✅ Phase 4: Footer
✅ Animations with Framer Motion
✅ Confetti celebration on "Always" click
✅ Mobile responsive design
✅ Harry Potter themed design system

### 💖 NEW: Valentine's Week System
✅ **4 Different Weeks** - Each week of February has unique content
✅ **Week 1: The Beginning** - First spark and memory collection
✅ **Week 2: Growing Closer** - Deepening bond with spell casting
✅ **Week 3: The Promise** - Unbreakable vow with potion brewing
✅ **Week 4: The Grand Finale** - Valentine's Day proposal
✅ **Dynamic Content** - Different cards and features each week
✅ **Week-Specific Challenges** - Unique challenges per week
✅ **Countdown to Valentine's** - Shows days remaining

### 🎮 Interactive Mini-Games
✅ **Week Challenges** - Complete week-specific challenges
✅ **Spell Casting Game** - Master magical spells (Week 2+)
✅ **Potion Brewing Game** - Brew love potions (Week 3+)
✅ **Unlockable Content System** - Earn achievements each week
✅ **Progress Persistence** - All progress saved automatically

### 🥚 Easter Eggs & Secrets
✅ **Character Clicking** - Click the main character for surprises
✅ **Week-Specific Secrets** - Different easter eggs each week
✅ **Special Animations** - Confetti and effects for discoveries

### 🎨 Enhanced Theming
✅ **Week-Based Colors** - Each week has its own color theme
✅ **Week-Specific Characters** - Different emojis/icons per week
✅ **Dynamic Backgrounds** - Colors change based on current week
✅ **Floating Elements** - Week-themed magical elements

## 📚 Documentation

See `FEATURES.md` for a complete guide to all the crazy features!

## 🎯 Quick Start Tips

1. **First Visit**: Click "Always" to enter
2. **Daily Surprise**: Automatically appears on dashboard
3. **Try Challenges**: Click the trophy card for daily challenge
4. **Play Games**: Try spell casting and potion brewing
5. **Find Secrets**: Click characters and explore!
6. **Track Progress**: Check your achievements

Enjoy your magical proposal with daily surprises! ✨
