# Solução Rápida para Erro de Build

## ⚡ Solução Rápida (Tente Primeiro)

### Passo 1: Limpar Tudo
```bash
# Limpar DerivedData
rm -rf ~/Library/Developer/Xcode/DerivedData/*

# Limpar build do iOS
cd ios
rm -rf build DerivedData
cd ..
```

### Passo 2: No Xcode
1. **Product → Clean Build Folder** (Shift + Cmd + K)
2. **Feche completamente o Xcode** (Cmd + Q)
3. **Reabra o workspace**: `PrajaClientMobileApp.xcworkspace` (NÃO o .xcodeproj)

### Passo 3: Iniciar Metro Bundler
**IMPORTANTE:** O Metro DEVE estar rodando antes de compilar!

```bash
# Em um terminal separado:
yarn start
```

### Passo 4: Compilar
No Xcode:
- **Product → Build** (Cmd + B)

Ou via linha de comando:
```bash
yarn ios
```

## 🔍 Se Ainda Não Funcionar

### Verificar Logs Detalhados no Xcode
1. `View` → `Navigators` → `Show Report Navigator`
2. Clique no build que falhou
3. Expanda "Bundle React Native code and images"
4. Veja a mensagem de erro completa
5. Procure por linhas que começam com `+` ou `error:`

### Executar Diagnóstico
```bash
./scripts/diagnose-build.sh
```

### Reinstalar Pods
```bash
cd ios
rm -rf Pods Podfile.lock
bundle exec pod install
cd ..
```

## 📋 Checklist

- [ ] DerivedData limpo
- [ ] Build limpo no Xcode (Shift + Cmd + K)
- [ ] Xcode fechado e reaberto
- [ ] Metro bundler rodando (`yarn start`)
- [ ] Workspace aberto (não o .xcodeproj)
- [ ] `.xcode.env.local` existe e está correto

## 💡 Dica Importante

O erro "Command PhaseScriptExecution failed" geralmente acontece quando:
- Metro bundler não está rodando
- Node não é encontrado pelo Xcode
- Cache do Xcode está corrompido

A solução mais comum é **garantir que o Metro está rodando** antes de compilar!

