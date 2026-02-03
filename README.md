# Zakat & Purification Widget Platform

A production-ready, embeddable React widget for calculating Zakat and Purification according to Islamic finance standards.

## Features

- 🕌 **Full Zakat Calculation** - Cash, gold, silver, investments, business assets
- 📊 **Excel Mode** - Upload and parse Excel files for bulk calculations
- 📝 **Smart Form Mode** - Comprehensive form for detailed calculations
- 🌐 **Multi-language** - English and Arabic with RTL support
- 🎨 **Customizable Theme** - Gold fintech design with configurable colors
- 📄 **PDF Export** - Branded reports with breakdowns
- 🔒 **Shadow DOM** - Complete style isolation from host website
- ⚡ **Lightweight** - Optimized for performance

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

## Build

```bash
npm run build
```

This will generate:
- `dist/zakat-widget.js` - The widget bundle
- `dist/zakat-widget.css` - The stylesheet

## Embedding the Widget

### Basic Usage

1. Include the widget script and CSS in your HTML:

```html
<link rel="stylesheet" href="https://your-cdn.com/zakat-widget.css">
<script src="https://your-cdn.com/zakat-widget.js"></script>
```

2. The widget will automatically initialize and show a floating button.

### Configuration

Configure the widget before the script loads:

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

### Manual Initialization

```javascript
window.ZakatWidget.init();
```

## Routes

All routes are internal (Memory Router) and don't affect the host URL:

- `/` - Home Screen
- `/excel` - Excel Mode
- `/form` - Form Mode

## Architecture

```
/src
  /widget
    bootstrap.ts      # Widget initialization
    shadowRoot.tsx    # Shadow DOM rendering
    config.ts         # Configuration management
    router.tsx        # Internal routing

  /app
    pages/
      Home.tsx        # Home screen
      ExcelMode.tsx   # Excel upload & calculation
      FormMode.tsx    # Full Zakat form
    components/
      AppLayout.tsx   # Main layout
      Header.tsx      # Header with language switcher
      ResultDrawer.tsx # Results panel

  /services
    zakatEngine.ts        # Zakat calculation logic
    purificationEngine.ts # Purification calculation
    excelParser.ts        # Excel file parsing
    pdfExporter.ts        # PDF generation
    themeService.ts       # Theme application
    localizationService.ts # i18n setup

  /i18n
    en.json          # English translations
    ar.json          # Arabic translations
```

## Zakat Calculation

The widget calculates Zakat based on:

- **Zakatable Assets**: Cash + Gold + Silver + Investments + Business Assets - Liabilities
- **Nisab**: Based on gold (87.48g) or silver (612.36g) standard
- **Zakat Rate**: 2.5% of zakatable assets if nisab is met

## Purification Calculation

- **Formula**: `profit * (haramRatio / 100)`
- Supports bulk calculations from Excel files

## PDF Export

Exports include:
- Date and authority
- Zakat breakdown
- Purification breakdown
- Total payable
- Branded header with logo

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## License

ISC

## Support

Built for Mosques, Fintech & Islamic Institutions


