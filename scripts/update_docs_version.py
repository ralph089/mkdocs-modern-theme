#!/usr/bin/env python3
"""Update install version tags in documentation files.

Called by python-semantic-release via build_command after the version
is bumped but before the release commit is created.

Usage: python scripts/update_docs_version.py <version>
"""

import re
import subprocess
import sys

DOCS_FILES = [
    "docs/getting-started.md",
    "docs/index.md",
    "README.md",
]

PATTERNS = [
    # Git install URLs: ...mkdocs-modern-theme.git@v1.2.3 or v{version}
    (re.compile(r"mkdocs-modern-theme\.git@v(?:[\d]+\.[\d]+\.[\d]+|\{version\})"),
     "mkdocs-modern-theme.git@v{version}"),
    # Inline version references: `v1.2.3` or `v{version}`
    (re.compile(r"Replace `v(?:[\d]+\.[\d]+\.[\d]+|\{version\})`"),
     "Replace `v{version}`"),
]


def main() -> None:
    if len(sys.argv) != 2:
        print(f"Usage: {sys.argv[0]} <version>", file=sys.stderr)
        sys.exit(1)

    version = sys.argv[1]

    for path in DOCS_FILES:
        with open(path) as f:
            text = f.read()
        new_text = text
        for pattern, template in PATTERNS:
            new_text = pattern.sub(template.format(version=version), new_text)
        if text != new_text:
            with open(path, "w") as f:
                f.write(new_text)
            print(f"Updated {path} → v{version}")
        else:
            print(f"No changes in {path}")

    subprocess.run(["git", "add", *DOCS_FILES], check=True)


if __name__ == "__main__":
    main()
