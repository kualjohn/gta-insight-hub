# Google Preferred Sources button

## Changes
- Add Google’s exact publisher script inside the document head.
- Create a reusable `PreferredSourceButton` that renders the exact Google element with the default light theme.
- Place it below each blog article’s content and in the global footer, with the requested sentence above the article instance.
- Ensure the Google publisher script is prompted to process newly mounted buttons after client-side navigation.

## Verification
- Check two different blog posts through client-side navigation and confirm the preferred-source element exists on both.
- Confirm the footer instance appears site-wide and no unrelated content or styling changes.
