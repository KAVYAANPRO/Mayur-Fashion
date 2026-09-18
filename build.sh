#!/bin/bash
set -e

# Build main frontend
cd Mayur-Fashion
npm install
npm run build
cd ..

# Build admin panel
cd admin-panel
npm install
npm run build
cd ..

# Copy admin build into frontend dist under /admin
mkdir -p Mayur-Fashion/dist/admin
cp -r admin-panel/dist/* Mayur-Fashion/dist/admin/
