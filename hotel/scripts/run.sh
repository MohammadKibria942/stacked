#!/usr/bin/env bash
set -e
source .venv/bin/activate
uvicorn hotel.src.api.main:app --reload
