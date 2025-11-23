#!/bin/bash

# Script para limpar node_modules e outros arquivos do controle de versão do Git

echo "🔍 Verificando arquivos rastreados pelo Git..."

# Verificar se há node_modules sendo rastreado
TRACKED_NODE_MODULES=$(git ls-files | grep node_modules | wc -l | tr -d ' ')

if [ "$TRACKED_NODE_MODULES" -gt 0 ]; then
  echo "⚠️  Encontrados $TRACKED_NODE_MODULES arquivos de node_modules sendo rastreados!"
  echo "🗑️  Removendo node_modules do índice do Git..."
  git rm -r --cached node_modules 2>/dev/null || true
  git rm -r --cached **/node_modules 2>/dev/null || true
  echo "✅ node_modules removido do índice do Git"
else
  echo "✅ Nenhum arquivo de node_modules está sendo rastreado pelo Git"
fi

# Verificar outros arquivos comuns que não deveriam estar no git
echo ""
echo "🔍 Verificando outros arquivos que não deveriam estar no Git..."

# Verificar build folders
BUILD_FILES=$(git ls-files | grep -E "(build/|ios/build/|android/build/|DerivedData/)" | wc -l | tr -d ' ')
if [ "$BUILD_FILES" -gt 0 ]; then
  echo "⚠️  Encontrados $BUILD_FILES arquivos de build sendo rastreados!"
fi

# Verificar Pods
PODS_FILES=$(git ls-files | grep "Pods/" | wc -l | tr -d ' ')
if [ "$PODS_FILES" -gt 0 ]; then
  echo "⚠️  Encontrados $PODS_FILES arquivos de Pods sendo rastreados!"
  echo "🗑️  Removendo Pods do índice do Git..."
  git rm -r --cached ios/Pods 2>/dev/null || true
  echo "✅ Pods removido do índice do Git"
fi

echo ""
echo "📊 Resumo:"
echo "   - Arquivos de node_modules rastreados: $TRACKED_NODE_MODULES"
echo "   - Arquivos de build rastreados: $BUILD_FILES"
echo "   - Arquivos de Pods rastreados: $PODS_FILES"

if [ "$TRACKED_NODE_MODULES" -eq 0 ] && [ "$BUILD_FILES" -eq 0 ] && [ "$PODS_FILES" -eq 0 ]; then
  echo ""
  echo "✅ Tudo limpo! Nenhum arquivo desnecessário está sendo rastreado."
else
  echo ""
  echo "💡 Execute 'git status' para ver as mudanças e depois 'git commit' para salvar."
fi

