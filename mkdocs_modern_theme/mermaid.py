"""Custom fence formatter for mermaid diagrams."""


def fence_mermaid(source, language, css_class, options, md, **kwargs):
    """Format a mermaid code block as a <pre class="mermaid"> element.

    Called by pymdownx.superfences when it encounters a ```mermaid block.
    Returns raw HTML that mermaid.js will render client-side.
    """
    return f'<pre class="mermaid">{source}</pre>'
