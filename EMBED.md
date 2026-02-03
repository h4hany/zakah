# Embedding Instructions

## Quick Start

1. **Include the CSS and JS files:**

```html
<link rel="stylesheet" href="https://your-cdn.com/zakat-widget.css">
<script src="https://your-cdn.com/zakat-widget.js"></script>
```

2. **Optional: Configure the widget:**

```html
<script>
  window.ZakatWidgetConfig = {
    language: "en", // "en" | "ar"
    position: "bottom-right", // "bottom-right" | "bottom-left"
    theme: {
      primary: "#C9A24D",
      dark: "#212325",
      surface: "#E7E9EB",
      radius: "16px",
      font: "Outfit",
      logo: "https://your-site.com/logo.png"
    }
  };
</script>
<script src="https://your-cdn.com/zakat-widget.js"></script>
```

## How It Works

1. The script automatically creates a floating button
2. Clicking the button opens the widget in a modal
3. The widget uses Shadow DOM for complete style isolation
4. All routing is internal (doesn't affect your URL)

## API

```javascript
// Open widget programmatically
window.ZakatWidget.open();

// Close widget programmatically
window.ZakatWidget.close();

// Re-initialize (if needed)
window.ZakatWidget.init();
```

## Notes

- The widget is completely isolated from your website's styles
- No conflicts with existing CSS/JS
- Works with any framework (React, Vue, Angular, vanilla JS)
- Mobile responsive


