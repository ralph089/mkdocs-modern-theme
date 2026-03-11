______________________________________________________________________

## title: pymdownx Extensions

# pymdownx Extensions

## Copy to Clipboard

Every code block should have a copy button on hover.

```python
def hello(name):
    return f"Hello, {name}!"

result = hello("world")
print(result)
```

## Code Block Title

```python title="main.py"
def main():
    print("Hello from main.py")

if __name__ == "__main__":
    main()
```

## Line Numbers

```python linenums="1"
import os
import sys

def process():
    return os.getcwd()

result = process()
```

## Line Highlighting

```python hl_lines="2 3"
import os

PATH = os.environ["PATH"]
HOME = os.environ["HOME"]

print(PATH, HOME)
```

## Task List

- [x] Install dependencies
- [x] Configure database
- [ ] Write unit tests
- [ ] Deploy to production

## Critic Markup

This is an {++important addition++} to the document.

This {--is no longer relevant--} text was removed.

Please {==review this section==} carefully.

{>>This needs a second opinion.\<<}

The API changed from {~~XML~>JSON~~} format.

## Math (Arithmatex)

Inline math: $E = mc^2$ appears within text.

Display math:

$$
\int_{-\infty}^{\infty} e^{-x^2} dx = \sqrt{\pi}
$$
