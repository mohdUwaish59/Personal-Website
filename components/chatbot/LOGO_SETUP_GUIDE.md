# 🎨 Logo Chat Icon Setup Guide

This guide will help you replace the default chat icon with your own logo/PNG image.

## 📁 Step 1: Add Your Logo

1. **Place your logo file** in the `public` folder of your Next.js project:
   ```
   public/
   ├── logo.png          # Your main logo
   ├── logo-small.png    # Optional: smaller version for better performance
   └── logo.svg          # Optional: SVG version if available
   ```

2. **Recommended logo specifications:**
   - **Format**: PNG with transparent background (recommended) or JPG
   - **Size**: 64x64px to 128x128px (square aspect ratio works best)
   - **File size**: Keep under 50KB for fast loading
   - **Background**: Transparent PNG works best for circular buttons

## 🔧 Step 2: Update the ChatWidget

The ChatWidget is already configured to use your logo! Just update the `logoSrc` path:

```tsx
// In components/chatbot/ChatWidget.tsx
<StyledLogoChatIcon 
  className={cn(styles.chatIcon, "relative z-10")}
  size={32}
  logoSrc="/your-logo.png"  // 👈 Change this to your logo path
  alt="Your Name - Chat"
  showBorder={true}
  borderColor="rgba(255, 255, 255, 0.3)"
/>
```

## 🎨 Step 3: Customize the Appearance

### Basic Logo Icon
```tsx
<LogoChatIcon 
  size={32}
  logoSrc="/logo.png"
  alt="Chat with us"
/>
```

### Styled Logo Icon (Recommended)
```tsx
<StyledLogoChatIcon 
  size={32}
  logoSrc="/logo.png"
  alt="Chat with us"
  showBorder={true}
  borderColor="rgba(255, 255, 255, 0.3)"
/>
```

### Available Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `logoSrc` | string | `"/logo.png"` | Path to your logo image |
| `alt` | string | `"Chat with us"` | Alt text for accessibility |
| `size` | number | `24` | Size in pixels (width & height) |
| `className` | string | `"h-6 w-6"` | Additional CSS classes |
| `showBorder` | boolean | `true` | Show border around logo (StyledLogoChatIcon only) |
| `borderColor` | string | `"rgba(255, 255, 255, 0.2)"` | Border color (StyledLogoChatIcon only) |

## 🎯 Step 4: Customize Button Background

You can customize the button background in the ChatWidget:

```tsx
<button
  onClick={handleToggle}
  className={cn(styles.chatButton, "group")}
  style={{
    // Option 1: Gradient background
    background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
    
    // Option 2: Solid color
    // backgroundColor: '#3b82f6',
    
    // Option 3: Your brand colors
    // background: 'linear-gradient(135deg, #your-color-1 0%, #your-color-2 100%)',
  }}
  aria-label="Open chat"
>
```

## 🔄 Step 5: Fallback Handling

The logo icon automatically handles loading errors:

1. **Loading state**: Shows a subtle pulse animation while loading
2. **Error fallback**: If your logo fails to load, it automatically falls back to the default chat icon
3. **Accessibility**: Includes proper alt text and ARIA labels

## 📱 Step 6: Test Your Logo

1. **Visit the test page**: Navigate to `/test-chatbot-icon` to see all icon variants
2. **Check the live widget**: Look at the bottom-right corner for your logo
3. **Test different scenarios**:
   - Logo loads correctly ✅
   - Logo works in light/dark mode ✅
   - Hover effects work ✅
   - Fallback works if logo fails to load ✅

## 🎨 Advanced Customization

### Custom Border Styles
```tsx
<StyledLogoChatIcon 
  logoSrc="/logo.png"
  showBorder={true}
  borderColor="rgba(59, 130, 246, 0.5)" // Blue border
  // Or use CSS custom properties
  style={{ 
    '--border-color': 'rgba(59, 130, 246, 0.5)',
    borderColor: 'var(--border-color)'
  }}
/>
```

### Responsive Sizing
```tsx
<StyledLogoChatIcon 
  logoSrc="/logo.png"
  className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10"
  size={40} // Base size
/>
```

### Multiple Logo Versions
```tsx
// Use different logos for different contexts
<StyledLogoChatIcon 
  logoSrc={isDarkMode ? "/logo-dark.png" : "/logo-light.png"}
  alt="Chat with us"
/>
```

## 🚀 Quick Start Example

1. Add your logo to `public/logo.png`
2. The ChatWidget will automatically use it!
3. Customize the path in `ChatWidget.tsx` if needed:

```tsx
logoSrc="/logo.png"  // Change this to your logo path
```

That's it! Your chatbot now uses your personal logo instead of the generic chat icon. 🎉

## 🐛 Troubleshooting

**Logo not showing?**
- Check the file path is correct
- Ensure the image file exists in the `public` folder
- Check browser console for loading errors
- Verify image format is supported (PNG, JPG, WebP, SVG)

**Logo looks blurry?**
- Use a higher resolution image (at least 64x64px)
- Ensure the image is square (1:1 aspect ratio)
- Consider using SVG for crisp scaling

**Logo doesn't fit well?**
- Adjust the `size` prop
- Use `object-cover` or `object-contain` CSS classes
- Consider creating a square version of your logo