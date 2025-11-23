#!/bin/bash

# Script para limpar completamente o projeto e resolver erros de build

echo "🧹 Limpando projeto React Native..."

# Limpar cache do Metro
echo "📦 Limpando cache do Metro..."
rm -rf $TMPDIR/react-*
rm -rf $TMPDIR/metro-*
rm -rf $TMPDIR/haste-*

# Limpar node_modules cache
echo "📦 Limpando cache do node_modules..."
rm -rf node_modules/.cache

# Limpar watchman
echo "👀 Limpando watchman..."
watchman watch-del-all 2>/dev/null || echo "Watchman não encontrado"

# Limpar builds do iOS
echo "🍎 Limpando builds do iOS..."
cd ios
rm -rf build
rm -rf DerivedData
rm -rf Pods
rm -rf Podfile.lock
rm -rf .xcode.env.local

# Limpar builds do Android
echo "🤖 Limpando builds do Android..."
cd ../android
rm -rf build
rm -rf .gradle
rm -rf app/build

cd ..

# Limpar yarn cache
echo "🧶 Limpando cache do Yarn..."
yarn cache clean

echo "✅ Limpeza concluída!"
echo ""
echo "📝 Próximos passos:"
echo "1. yarn install"
echo "2. cd ios && pod install"
echo "3. cd .. && yarn ios"

