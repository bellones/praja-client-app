#!/bin/bash

# Script para instalar Pods contornando problemas de SSL

echo "📦 Instalando CocoaPods dependencies..."

cd "$(dirname "$0")/.." || exit

# Ir para pasta ios
cd ios || exit

# Tentar instalar pods diretamente
echo "🔧 Executando pod install..."
bundle exec pod install

if [ $? -eq 0 ]; then
    echo "✅ Pods instalados com sucesso!"
else
    echo "❌ Erro ao instalar pods. Tentando alternativas..."
    
    # Limpar cache
    echo "🧹 Limpando cache..."
    rm -rf ~/Library/Caches/CocoaPods
    rm -rf Pods Podfile.lock
    
    # Tentar novamente
    echo "🔄 Tentando novamente..."
    bundle exec pod install --repo-update
    
    if [ $? -eq 0 ]; then
        echo "✅ Pods instalados com sucesso na segunda tentativa!"
    else
        echo "❌ Ainda há erros. Verifique a conexão de internet e certificados SSL."
        echo "💡 Dica: Tente atualizar os certificados do sistema ou verificar configurações de proxy."
    fi
fi

