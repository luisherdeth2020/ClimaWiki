#!/bin/bash

echo "🔍 ClimaWiki - Project Health Check"
echo "===================================="
echo ""

# Check Node version
echo "✓ Node version: $(node --version)"
echo "✓ npm version: $(npm --version)"
echo ""

# Check dependencies
echo "📦 Checking dependencies..."
if [ -d "node_modules" ]; then
  echo "✓ Dependencies installed"
else
  echo "❌ Dependencies NOT installed. Run: npm install"
fi
echo ""

# Check project structure
echo "📁 Checking project structure..."
for dir in src/components src/islands src/layouts src/pages src/services src/stores src/types src/utils; do
  if [ -d "$dir" ]; then
    echo "✓ $dir exists"
  else
    echo "❌ $dir missing"
  fi
done
echo ""

# Check key files
echo "📄 Checking key files..."
for file in "src/services/weather.service.ts" "src/stores/locations.store.ts" "src/types/weather.ts"; do
  if [ -f "$file" ]; then
    echo "✓ $file exists"
  else
    echo "❌ $file missing"
  fi
done
echo ""

# Check build
echo "🏗️  Testing build..."
npm run build > /dev/null 2>&1
if [ $? -eq 0 ]; then
  echo "✓ Build successful"
else
  echo "❌ Build failed. Run: npm run build"
fi
echo ""

echo "✅ Health check complete!"
