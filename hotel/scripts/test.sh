#!/usr/bin/env bash
set -e
source .venv/bin/activate
pytest --cov=hotel/src --cov=hotel/tests --cov-fail-under=70 -q
ruff hotel/src hotel/tests
pyre --source-directory hotel/src
