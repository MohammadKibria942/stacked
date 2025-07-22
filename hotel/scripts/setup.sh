#!/usr/bin/env bash
set -e
uv venv .venv
source .venv/bin/activate
uv pip install -r requirements.txt
python - <<'PY'
from pathlib import Path
(Path('hotel.db')).touch()
PY
