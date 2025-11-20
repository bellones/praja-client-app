#!/bin/bash

# Script de diagnóstico para problemas de build

echo "🔍 Diagnosticando problemas de build..."
echo ""

cd "$(dirname "$0")/.." || exit

echo "1. Verificando Node..."
if command -v node &> /dev/null; then
    echo "   ✅ Node encontrado: $(which node)"
    echo "   ✅ Versão: $(node --version)"
else
    echo "   ❌ Node não encontrado!"
    exit 1
fi

echo ""
echo "2. Verificando arquivos .xcode.env..."
if [ -f "ios/.xcode.env" ]; then
    echo "   ✅ ios/.xcode.env existe"
else
    echo "   ❌ ios/.xcode.env não encontrado!"
fi

if [ -f "ios/.xcode.env.local" ]; then
    echo "   ✅ ios/.xcode.env.local existe"
    echo "   📄 Conteúdo: $(cat ios/.xcode.env.local)"
else
    echo "   ⚠️  ios/.xcode.env.local não encontrado (criando...)"
    echo "export NODE_BINARY=$(which node)" > ios/.xcode.env.local
    echo "   ✅ Criado: ios/.xcode.env.local"
fi

echo ""
echo "3. Verificando scripts do React Native..."
if [ -f "node_modules/react-native/scripts/react-native-xcode.sh" ]; then
    echo "   ✅ react-native-xcode.sh existe"
    if [ -x "node_modules/react-native/scripts/react-native-xcode.sh" ]; then
        echo "   ✅ Script tem permissão de execução"
    else
        echo "   ⚠️  Adicionando permissão de execução..."
        chmod +x node_modules/react-native/scripts/react-native-xcode.sh
    fi
else
    echo "   ❌ react-native-xcode.sh não encontrado!"
fi

if [ -f "node_modules/react-native/scripts/xcode/with-environment.sh" ]; then
    echo "   ✅ with-environment.sh existe"
    if [ -x "node_modules/react-native/scripts/xcode/with-environment.sh" ]; then
        echo "   ✅ Script tem permissão de execução"
    else
        echo "   ⚠️  Adicionando permissão de execução..."
        chmod +x node_modules/react-native/scripts/xcode/with-environment.sh
    fi
else
    echo "   ❌ with-environment.sh não encontrado!"
fi

echo ""
echo "4. Verificando Metro Bundler..."
if lsof -ti:8081 &> /dev/null; then
    echo "   ✅ Metro está rodando na porta 8081"
else
    echo "   ⚠️  Metro NÃO está rodando!"
    echo "   💡 Execute 'yarn start' em outro terminal antes de compilar"
fi

echo ""
echo "5. Verificando Pods..."
if [ -d "ios/Pods" ]; then
    echo "   ✅ Pasta Pods existe"
    POD_COUNT=$(find ios/Pods -maxdepth 1 -type d | wc -l)
    echo "   📦 Encontrados $POD_COUNT pods"
else
    echo "   ❌ Pasta Pods não encontrada!"
    echo "   💡 Execute: cd ios && bundle exec pod install"
fi

echo ""
echo "6. Verificando workspace..."
if [ -f "ios/PrajaClientMobileApp.xcworkspace/contents.xcworkspacedata" ]; then
    echo "   ✅ Workspace existe"
else
    echo "   ❌ Workspace não encontrado!"
fi

echo ""
echo "✅ Diagnóstico completo!"
echo ""
echo "📝 Próximos passos se houver problemas:"
echo "   1. Certifique-se de que o Metro está rodando: yarn start"
echo "   2. Limpe o build no Xcode: Product → Clean Build Folder (Shift + Cmd + K)"
echo "   3. Feche e reabra o Xcode"
echo "   4. Tente compilar novamente"

