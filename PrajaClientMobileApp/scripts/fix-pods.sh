#!/bin/bash

# Script para corrigir problemas com Pods e module maps

echo "🔧 Corrigindo problemas com Pods..."

cd "$(dirname "$0")/.." || exit

echo "📦 Limpando Pods..."
cd ios
rm -rf Pods Podfile.lock build DerivedData

echo "🧹 Limpando cache do CocoaPods..."
rm -rf ~/Library/Caches/CocoaPods

echo "📥 Reinstalando Pods..."
bundle exec pod install --repo-update

echo "✅ Pods reinstalados!"
echo ""
echo "📝 Próximos passos:"
echo "1. No Xcode: Product → Clean Build Folder (Shift + Cmd + K)"
echo "2. Feche e reabra o Xcode"
echo "3. Tente compilar novamente"

