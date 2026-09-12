# Homepage Content Depth Plan

## Goal
Expand the homepage to 800–1,000 visible words while preserving its current title, description, visual system, colours, fonts, and overall section structure. Keep one H1 containing “Milton” and use H2 for every section heading.

## Changes
1. Add five substantive sections immediately below the existing hero, in the requested order:
   - **Selling a Home in Milton:** 150–200 words explaining the seller journey from consultation and preparation through launch, showing, offer review, and closing without introducing market statistics.
   - **What Makes This Different:** 150–200 words covering free professional staging, the 1% listing option, cancel-anytime flexibility, and paid promotion across major platforms.
   - **Milton Neighbourhoods:** a concise introduction followed by descriptive internal links generated from every existing Milton neighbourhood record. The project currently contains 17 neighbourhood pages, so all 17 will be linked rather than omitting one.
   - **Frequently Asked Questions:** six seller-focused questions with 40–60-word answers, displayed on the page and emitted as FAQPage structured data.
   - **Latest Milton Market Updates:** the three newest published Milton-related posts, showing title, publication date, one-line excerpt, and article link.
2. Add a focused homepage data query for the latest published Milton posts, with loading and empty states that do not create extra headings.
3. Keep the existing homepage sections after the new content, without changing their wording or presentation.
4. Ensure the closing homepage call-to-action heading uses H2 so every section follows the requested heading hierarchy.

## Validation
- Open the rendered homepage and measure visible text inside `<main>`; adjust only the new copy until the total is between 800 and 1,000 words.
- Confirm exactly one H1, that it contains “Milton,” and capture the full ordered list of rendered headings.
- Confirm the three newest Milton market posts render with working links and that FAQPage structured data contains all six visible questions and answers.
- Confirm the existing title tag and meta description remain unchanged.
