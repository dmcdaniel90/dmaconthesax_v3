#!/bin/bash
# Custom dev script to bypass Netlify workspace detection
cd "$(dirname "$0")"
PORT=3000 pnpm run dev
