# Cards

Cards display related links or content in a visual grid layout.

## Usage

Wrap a Markdown unordered list in a `<div class="cards">` container. Each list item becomes a card. Use bold links for titles and a second paragraph for descriptions.

```markdown
<div class="cards" markdown>

- **[Installation](../getting-started.md)**
  Get up and running in minutes.

- **[Configuration](../configuration.md)**
  Customize every aspect of the theme.

- **[Theming](../customization/theming.md)**
  Make the theme your own with CSS variables.

</div>
```

## Example

<div class="cards" markdown>

- **[Installation](../getting-started.md)**
  Get up and running in minutes.

- **[Configuration](../configuration.md)**
  Customize every aspect of the theme.

- **[Theming](../customization/theming.md)**
  Make the theme your own with CSS variables.

- **[Colors](../customization/colors.md)**
  Fine-tune the color palette for your brand.

</div>

## How it works

The `.cards` class applies a CSS grid layout to the child `<ul>`, turning each `<li>` into a card with:

- Rounded corners and a subtle border
- Elevation shadow that increases on hover
- Accent-colored border on hover
- Responsive grid that adapts from 1 to 3 columns

No JavaScript required — this is pure CSS styling of standard Markdown output.

## Requirements

Both `attr_list` and `md_in_html` extensions must be enabled for the `markdown` attribute to work on HTML wrapper divs:

```yaml
markdown_extensions:
  - attr_list
  - md_in_html
```
