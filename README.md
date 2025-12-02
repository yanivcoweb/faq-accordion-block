# FAQ Accordion Block

A fully accessible, SEO-optimized WordPress Gutenberg block for creating FAQ accordions with Schema.org markup.

## Features

✅ **Modern WordPress Standards**
- Built with ES6 imports and modern React
- Uses `useBlockProps` for proper block wrapper support
- Follows WordPress coding standards

✅ **Accessibility**
- Full ARIA attributes support (aria-expanded, aria-hidden, role)
- Keyboard navigation (Enter/Space to toggle)
- Focus management and visible focus indicators
- Screen reader friendly

✅ **SEO Optimized**
- Schema.org FAQPage markup built-in
- Proper semantic HTML structure
- Helps search engines understand your FAQ content

✅ **Security**
- XSS protection with limited formatting options
- Proper input sanitization
- WordPress security best practices

✅ **Performance**
- Optimized animations with requestAnimationFrame
- Efficient DOM queries
- Reduced motion support for accessibility

✅ **Developer Friendly**
- Clean, documented code
- CSS custom properties for easy theming
- Internationalization ready
- RTL support

## Installation

1. Upload the plugin folder to `/wp-content/plugins/`
2. Activate the plugin through the 'Plugins' menu in WordPress
3. Use the "FAQ Accordion" block in the Gutenberg editor

## Development

### Requirements
- Node.js 14.0+
- npm 6.0+
- WordPress 5.8+
- PHP 7.4+

### Setup

```bash
# Install dependencies
npm install

# Start development mode (with hot reload)
npm start

# Build for production
npm run build

# Lint JavaScript
npm run lint:js

# Format code
npm run format
```

## Usage

1. In the WordPress editor, add a new block
2. Search for "FAQ Accordion"
3. Enter your question in the first field
4. Enter your answer in the second field
5. Repeat for multiple FAQs

### Formatting Options

The block supports limited formatting to maintain security:
- **Question**: Bold, Italic
- **Answer**: Bold, Italic, Links

## Customization

### CSS Custom Properties

The plugin uses CSS custom properties for easy theming:

```css
:root {
    --faq-border-color: #e0e0e0;
    --faq-text-color: #0f3562;
    --faq-bg-color-closed: transparent;
    --faq-bg-color-open: #f9f9f9;
    --faq-transition-duration: 0.3s;
    --faq-border-radius: 3px;
    --faq-padding: 10px;
    --faq-margin-bottom: 10px;
}
```

Add these to your theme's CSS file and modify values as needed.

## Block Supports

- **Anchor**: Add custom anchor IDs for linking
- **Custom Class Name**: Add custom CSS classes
- **Alignment**: Wide and Full width options

## Accessibility Features

- Keyboard navigation with Enter and Space keys
- ARIA labels and states
- Focus indicators
- High contrast mode support
- Reduced motion support for users with vestibular disorders

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- IE11+ (with polyfills)

## Changelog

### Version 1.0.0
- Initial release
- Full accessibility support
- Schema.org markup
- Modern WordPress standards
- Security improvements
- Keyboard navigation
- RTL support

## Credits

Author: יניב ששון

## License

GPL-2.0-or-later

## Support

For issues and feature requests, please use the GitHub repository issue tracker.
