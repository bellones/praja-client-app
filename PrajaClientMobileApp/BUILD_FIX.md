# Solução para Erro "Command PhaseScriptExecution failed"

## Problema
Erro: `Command PhaseScriptExecution failed with a nonzero exit code` durante "Bundle React Native code and images"

## Soluções (tente na ordem)

### 1. Limpar Build do Xcode
No Xcode:
1. `Product` → `Clean Build Folder` (Shift + Cmd + K)
2. Feche completamente o Xcode (Cmd + Q)
3. Reabra o workspace: `PrajaClientMobileApp.xcworkspace`

### 2. Iniciar Metro Bundler ANTES de compilar
**IMPORTANTE:** O Metro bundler precisa estar rodando antes de compilar no Xcode.

```bash
# Terminal 1: Iniciar Metro bundler
yarn start

# Terminal 2: Compilar no Xcode ou usar:
yarn ios
```

### 3. Verificar variáveis de ambiente
Certifique-se de que o `.xcode.env.local` está correto:

```bash
cat ios/.xcode.env.local
# Deve mostrar: export NODE_BINARY=/usr/local/bin/node
```

### 4. Limpar DerivedData
```bash
rm -rf ~/Library/Developer/Xcode/DerivedData/*
```

### 5. Reinstalar Pods
```bash
cd ios
rm -rf Pods Podfile.lock
bundle exec pod install
cd ..
```

### 6. Verificar se o Node está acessível
```bash
which node
node --version
# Deve retornar o caminho e versão do Node
```

### 7. Build via linha de comando (alternativa)
Se o Xcode continuar falhando, tente compilar via CLI:

```bash
# Terminal 1: Metro bundler
yarn start

# Terminal 2: Build
yarn ios
```

### 8. Verificar logs detalhados
No Xcode, vá em:
- `View` → `Navigators` → `Show Report Navigator`
- Clique no build que falhou
- Expanda "Bundle React Native code and images"
- Veja a mensagem de erro completa

## Causas Comuns

1. **Metro bundler não está rodando** - Mais comum!
2. **Node não encontrado** - Verificar `.xcode.env.local`
3. **Cache corrompido** - Limpar DerivedData
4. **Pods desatualizados** - Reinstalar pods
5. **Permissões de scripts** - Scripts sem permissão de execução

## Checklist Rápido

- [ ] Metro bundler está rodando (`yarn start`)
- [ ] `.xcode.env.local` existe e está correto
- [ ] Build limpo no Xcode (Shift + Cmd + K)
- [ ] DerivedData limpo
- [ ] Pods instalados corretamente
- [ ] Node acessível (`which node` funciona)

