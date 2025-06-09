# Font Files

## Dank Mono Font Files

Place your Dank Mono font files in this directory with the following names:

- `DankMono-Regular.woff2`
- `DankMono-Regular.woff`
- `DankMono-Bold.woff2`
- `DankMono-Bold.woff`
- `DankMono-Italic.woff2`
- `DankMono-Italic.woff`

These files are referenced in `src/styles/fonts.css` and will be loaded as the primary monospace font for code blocks, terminal elements, and technical content.

## Font Loading Strategy

The fonts are configured with:
- `font-display: swap` for optimal loading performance
- Fallback fonts for graceful degradation
- WOFF2 format prioritized for modern browsers
- WOFF format as fallback for older browsers

## Usage

The fonts are available through CSS custom properties:
- `--font-primary`: Noto Sans (Google Fonts)
- `--font-mono`: Dank Mono (local files)

And utility classes:
- `.font-primary`
- `.font-mono`
- `.font-terminal`
- `.font-code`
- `.font-technical`
