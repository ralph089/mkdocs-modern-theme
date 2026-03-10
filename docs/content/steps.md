# Steps

Steps display sequential instructions with numbered indicators and a connecting line.

## Usage

Wrap an ordered list in a `<div class="steps">` container:

```markdown
<div class="steps" markdown>

1. **Install the theme**

    ```bash
    pip install mkdocs-modern-theme
    ```

2. **Configure mkdocs.yml**

    Set `theme: name: modern` in your config.

3. **Start developing**

    Run `mkdocs serve` and open your browser.

</div>
```

## Example

<div class="steps" markdown>

1. **Install the theme**

    ```bash
    pip install mkdocs-modern-theme
    ```

2. **Configure mkdocs.yml**

    Set `theme: name: modern` in your config file.

3. **Start developing**

    Run `mkdocs serve` and open your browser.

</div>

## How it works

The `.steps` class styles the child `<ol>` with:

- A vertical border line connecting all steps
- Numbered circles using CSS counters (accent-colored)
- Generous spacing between steps for readability

Each step can contain any Markdown content — paragraphs, code blocks, lists, admonitions, etc.

## Requirements

Both `attr_list` and `md_in_html` extensions must be enabled for the `markdown` attribute to work on HTML wrapper divs:

```yaml
markdown_extensions:
  - attr_list
  - md_in_html
```
