# 📂 Floating Projects Sheet - Complete Guide

## Overview
A **persistent floating button** on the right side of the screen that opens a beautiful sheet component displaying your project portfolio. Perfect for quick access to your work from any page!

## ✨ Features

### 1. **Persistent Floating Button** 🎯
- Fixed position on the right side of screen
- Vertically centered
- Animated entrance (slides in from right)
- Teal color scheme (#39b6a6)
- Circular design with folder icon
- Smooth hover effects
- Rotates 180° when sheet opens

### 2. **Beautiful Sheet Component** 📋
- Slides in from the right
- Full-height overlay
- Smooth animations
- Scrollable content
- Professional design
- Dark mode support

### 3. **Project Cards** 🎨
Each project displays:
- **Title**: Bold, hover effect
- **Description**: Brief overview (2 lines max)
- **Tags**: Technology badges
- **Status Badge**: Active, Completed, or In Progress
- **Stats**: Stars and forks (if available)
- **Links**: GitHub and live demo buttons
- **Hover Effects**: Border color change, shadow

### 4. **Status Indicators** 🏷️
- **Active**: Green badge (ongoing projects)
- **Completed**: Blue badge (finished projects)
- **In Progress**: Yellow badge (work in progress)

### 5. **Interactive Elements** 🖱️
- Hover effects on cards
- Clickable GitHub links
- Clickable live demo links
- Smooth transitions
- Staggered animations

### 6. **Tooltip Hint** 💡
- Appears after 2 seconds
- Shows "View Projects" text
- Fades out when sheet opens
- Helps users discover the feature

## 🎨 Visual Design

### Floating Button
```
Position: Fixed right, vertically centered
Size: 56px × 56px (h-14 w-14)
Shape: Circular (rounded-full)
Color: Teal (#39b6a6)
Icon: FolderGit2
Shadow: Large, teal glow on hover
Animation: Rotates 180° when open
```

### Sheet Layout
```
┌─────────────────────────────────┐
│ ✨ My Projects                  │ ← Header
│ Explore my portfolio...         │ ← Description
├─────────────────────────────────┤
│ ┌─────────────────────────────┐ │
│ │ 🟢 Active                   │ │ ← Status Badge
│ │ Project Title               │ │
│ │ Description...              │ │
│ │ [Tag] [Tag] [Tag]          │ │
│ │ ⭐ 15  🔱 3  [GitHub] [Link]│ │
│ └─────────────────────────────┘ │
│ ┌─────────────────────────────┐ │
│ │ 🔵 Completed                │ │
│ │ Another Project             │ │
│ │ ...                         │ │
│ └─────────────────────────────┘ │
├─────────────────────────────────┤
│ 💻 Want to see more?            │ ← Footer
│ Check out my GitHub profile     │
└─────────────────────────────────┘
```

## 📊 Project Data Structure

```typescript
interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  stars?: number;        // Optional GitHub stars
  forks?: number;        // Optional GitHub forks
  link?: string;         // Optional live demo link
  githubLink?: string;   // Optional GitHub repo link
  status?: "active" | "completed" | "in-progress";
}
```

## 🎯 Current Projects Listed

1. **ZeroDesk AI Chatbot** (Completed)
   - RAG-based IT helpdesk chatbot
   - NextJS, FastAPI, Docker, NLP
   - 15 stars, 3 forks

2. **geoRAG** (Active)
   - Georock database RAG system
   - RAG, VectorRAG, GraphRAG, LLMs
   - 8 stars, 2 forks

3. **Image Sensitivity Predictor** (Completed)
   - Browser extension for social media
   - React, Flask, ML, Computer Vision
   - 12 stars, 4 forks

4. **Meeting Summarization Testbench** (Completed)
   - NLP evaluation tool
   - Python, Hugging Face, Django, NLP
   - 6 stars, 1 fork

5. **Social WordSmith** (Active)
   - Chat analysis tool
   - Streamlit, Pandas, Plotly
   - 20 stars, 5 forks

6. **Web-Scout** (Completed)
   - Web scraping tool
   - Django, Scrapy, MongoDB
   - 10 stars, 3 forks

7. **amotogs.com** (In Progress)
   - E-commerce webapp
   - NextJS, Supabase, E-commerce

8. **Class Overlapping Benchmark** (In Progress)
   - ML research project
   - Machine Learning, Research, Python

## 🔧 Technical Implementation

### Component Location
- **File**: `components/projects-sheet.tsx`
- **Integration**: `app/layout.tsx` (global)
- **Visibility**: All pages

### Key Technologies
- **Radix UI Sheet**: Accessible sheet component
- **Framer Motion**: Smooth animations
- **Lucide Icons**: Beautiful icons
- **Tailwind CSS**: Styling

### Animations
```typescript
// Button entrance
initial={{ x: 100, opacity: 0 }}
animate={{ x: 0, opacity: 1 }}
transition={{ delay: 1, duration: 0.5 }}

// Card stagger
initial={{ opacity: 0, x: 50 }}
animate={{ opacity: 1, x: 0 }}
transition={{ delay: index * 0.1 }}

// Button rotation
animate={{ rotate: open ? 180 : 0 }}
```

### Positioning
```css
/* Floating Button */
position: fixed;
right: 1.5rem;  /* 24px */
top: 50%;
transform: translateY(-50%);
z-index: 40;
```

## 🎨 Styling Details

### Status Colors
```typescript
const statusColors = {
  active: "bg-green-500/10 text-green-500 border-green-500/30",
  completed: "bg-blue-500/10 text-blue-500 border-blue-500/30",
  "in-progress": "bg-yellow-500/10 text-yellow-500 border-yellow-500/30",
};
```

### Card Hover Effect
```css
border: 2px solid border
hover:border-[#39b6a6]
hover:shadow-lg
hover:shadow-[#39b6a6]/10
```

### Badge Styling
```css
.badge-teal {
  background: rgba(57, 182, 166, 0.1);
  color: #39b6a6;
  border: 1px solid rgba(57, 182, 166, 0.3);
}
```

## 📱 Responsive Design

### Desktop
- Sheet width: `sm:max-w-xl` (640px)
- Button: Right side, centered
- Full project cards visible

### Mobile
- Sheet width: Full width
- Button: Slightly smaller
- Scrollable content
- Touch-friendly

## 🔄 Adding New Projects

### Step 1: Add to projects array
```typescript
const projects: Project[] = [
  // ... existing projects
  {
    id: 9,
    title: "Your New Project",
    description: "Brief description of your project",
    tags: ["Tag1", "Tag2", "Tag3"],
    stars: 10,
    forks: 2,
    status: "active",
    link: "https://your-demo-link.com",
    githubLink: "https://github.com/username/repo",
  },
];
```

### Step 2: Update links later
You can add or update links anytime:
```typescript
link: "https://your-new-link.com",
githubLink: "https://github.com/your-repo",
```

## 🎯 Customization Options

### Change Button Position
```typescript
// Left side instead of right
className="fixed left-6 top-1/2 -translate-y-1/2 z-40"
```

### Change Button Color
```typescript
// Use different color
className="bg-blue-500 hover:bg-blue-600"
```

### Adjust Animation Delay
```typescript
// Faster entrance
transition={{ delay: 0.5, duration: 0.5 }}
```

### Change Sheet Side
```typescript
// Open from left
<SheetContent side="left" className="...">
```

### Modify Card Layout
```typescript
// Add more information
<div className="mt-2">
  <p>Additional info here</p>
</div>
```

## 🎨 Color Scheme

### Primary Colors
- **Teal**: #39b6a6 (buttons, links, hover)
- **Green**: Status active
- **Blue**: Status completed
- **Yellow**: Status in progress

### Backgrounds
- **Card**: `bg-card`
- **Hover**: `hover:shadow-[#39b6a6]/10`
- **Badge**: `rgba(57, 182, 166, 0.1)`

## 🚀 Features Breakdown

### 1. Floating Button
- ✅ Always visible
- ✅ Smooth entrance animation
- ✅ Hover effects
- ✅ Rotation on open
- ✅ Teal color scheme
- ✅ Shadow effects

### 2. Sheet Component
- ✅ Slide-in animation
- ✅ Overlay backdrop
- ✅ Scrollable content
- ✅ Close button
- ✅ Responsive width

### 3. Project Cards
- ✅ Title and description
- ✅ Technology tags
- ✅ Status badges
- ✅ GitHub stats
- ✅ Action buttons
- ✅ Hover effects

### 4. Animations
- ✅ Button entrance
- ✅ Sheet slide-in
- ✅ Card stagger
- ✅ Tooltip fade
- ✅ Hover transitions

### 5. Interactivity
- ✅ Click to open/close
- ✅ External links
- ✅ Smooth scrolling
- ✅ Touch-friendly

## 🎯 User Experience

### Discovery
1. User lands on any page
2. Floating button appears after 1 second
3. Tooltip shows "View Projects" after 2 seconds
4. User clicks button

### Interaction
1. Sheet slides in from right
2. Projects appear with stagger animation
3. User can scroll through projects
4. Click GitHub or demo links
5. Close sheet with X or backdrop click

### Navigation
- Button always accessible
- Works on all pages
- Quick access to portfolio
- No page reload needed

## 🔮 Future Enhancements (Optional)

1. **Search/Filter**: Add search bar for projects
2. **Categories**: Group by technology or type
3. **Sorting**: Sort by stars, date, or status
4. **Project Details**: Expand card for more info
5. **Animations**: More complex transitions
6. **Stats**: Real-time GitHub stats
7. **Favorites**: Mark favorite projects
8. **Share**: Share individual projects

## 📁 Files Created/Modified

### New Files
1. `components/projects-sheet.tsx` - Main component

### Modified Files
1. `app/layout.tsx` - Added ProjectsSheet component

## 🎉 Key Benefits

1. **Always Accessible**: Available on every page
2. **Quick Overview**: See all projects at a glance
3. **Professional Look**: Modern, polished design
4. **Easy Updates**: Simple to add/modify projects
5. **Responsive**: Works on all devices
6. **Animated**: Smooth, engaging interactions
7. **Informative**: Shows status, stats, and links
8. **Discoverable**: Tooltip helps users find it

## 🐛 Troubleshooting

### Button Not Showing
- Check if component is imported in layout
- Verify z-index is high enough
- Check for CSS conflicts

### Sheet Not Opening
- Verify Sheet component is installed
- Check console for errors
- Ensure Radix UI is properly configured

### Links Not Working
- Verify URLs are correct
- Check target="_blank" is set
- Ensure rel="noopener noreferrer"

### Animations Laggy
- Reduce number of animated elements
- Simplify transitions
- Check device performance

---

**Your portfolio now has a beautiful, persistent floating button that showcases all your projects in an elegant sheet component!** 📂✨

The teal color scheme matches your portfolio perfectly, and the smooth animations create a professional, modern experience. Users can quickly access your project portfolio from any page with just one click! 🚀
