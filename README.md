# 💖 Girlfriend Proposal Website

A romantic, playful, and responsive web experience to ask your special someone to be your girlfriend!

---

## 🌟 Features

- 💌 **Animated 3D Love Envelope**: Opens with a wax-seal breaking effect and gentle chimes.
- 📸 **Polaroid Photo Wall**: Showcase your sweetest memories and favorite moments together.
- ✨ **"Things I Love About You"**: Highlight the little reasons she makes life brighter.
- 🏃‍♂️ **Interactive Runaway "No" Button**: The "No" button comically runs away whenever she hovers or taps it, and displays funny excuses while the **"YES"** button grows larger!
- 🎉 **Celebration Confetti Blast**: When she clicks **YES**, a huge celebration fires with confetti cannons, fanfare audio, and a celebratory keepsake card.
- 🎶 **Soft Romantic Lofi Background Audio**: Optional peaceful background melody with a toggle.
- 📱 **Mobile & Desktop Optimized**: Looks stunning whether she opens it on an iPhone, Android, or laptop.

---

## 🚀 How to Preview It Right Now

You can preview it in 1 click:
1. Navigate to:  
   `C:\Users\uzair\.gemini\antigravity\scratch\girlfriend-proposal\`
2. Double-click `index.html` to open it in your browser (Chrome, Edge, Safari, Firefox).

Or run a local preview server:
```powershell
cd C:\Users\uzair\.gemini\antigravity\scratch\girlfriend-proposal
python -m http.server 3000
```
Then visit `http://localhost:3000` in your browser.

---

## ✍️ How to Personalize & Customize

Open `script.js` in any text editor. At the very top, you'll find the `CONFIG` block:

```javascript
const CONFIG = {
  herName: "Sarah", // Change to her real name or pet name
  yourName: "Uzair", // Change to your name
  loveMessage: "...", // Write your own heartfelt message
  memories: [
    // Change images and captions to your favorite photos
    {
      image: "photo1.jpg", // can be a local image in this folder or web link
      title: "Our First Date",
      caption: "The day my life changed forever...",
      rotation: "-2deg"
    },
    ...
  ],
  ...
};
```

### Adding Your Own Photos:
1. Drop your favorite photos of the two of you into this folder:  
   `C:\Users\uzair\.gemini\antigravity\scratch\girlfriend-proposal\`
2. In `script.js`, change `image: "photo1.jpg"`, `image: "photo2.jpg"`, etc.

---

## 🌐 How to Publish to GitHub Pages (Live Website Link)

This folder is already initialized as a Git repository on the `main` branch!

### Step 1: Create a new repository on GitHub
1. Go to [github.com/new](https://github.com/new).
2. Name your repository (e.g., `for-my-favorite-person` or `special-surprise`).
3. Set it to **Public** (required for free GitHub Pages).
4. Leave "Add a README file" **unchecked** (we already have one).
5. Click **Create repository**.

---

### Step 2: Push your code to GitHub
Open PowerShell or your terminal and run these 2 commands (replace `YOUR_USERNAME` and `YOUR_REPO`):

```powershell
cd C:\Users\uzair\.gemini\antigravity\scratch\girlfriend-proposal
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

*(Alternatively, you can simply drag-and-drop the files into GitHub using their "Upload files" button on the webpage!)*

---

### Step 3: Turn on GitHub Pages (Takes 30 seconds!)
1. In your GitHub repository, click on **Settings** (top menu bar).
2. In the left sidebar, click **Pages**.
3. Under **Build and deployment > Branch**:
   - Select **`main`** from the dropdown.
   - Leave folder as **`/(root)`**.
   - Click **Save**.
4. Wait 30–60 seconds, refresh the page, and GitHub will display:  
   🎉 **"Your site is live at https://YOUR_USERNAME.github.io/YOUR_REPO/"**
5. Copy that link and send it to her! ❤️
