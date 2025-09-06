#!/bin/bash
# Custom dev script to bypass Netlify workspace detection
cd "$(dirname "$0")"
pnpm run dev
