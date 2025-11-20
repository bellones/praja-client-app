# Solução de Problemas - Build iOS

## Erro: "Command PhaseScriptExecution failed with a nonzero exit code"

Este erro geralmente ocorre durante o build do iOS. Siga estes passos na ordem:

### 1. Limpeza Completa

```bash
# Execute o script de limpeza
./scripts/clean-build.sh

# Ou manualmente:
rm -rf ios/build ios/DerivedData
rm -rf node_modules/.cache
watchman watch-del-all
yarn cache clean
cd ios && pod deintegrate && pod install
```

### 2. Verificar Node e NPM/Yarn

```bash
# Verificar se o Node está no PATH
which node
node --version

# Verificar se o .xcode.env.local está correto
cat ios/.xcode.env.local
# Deve conter: export NODE_BINARY=/caminho/para/node
```

### 3. Limpar e Reinstalar Dependências

```bash
# Limpar node_modules
rm -rf node_modules
rm -rf yarn.lock

# Reinstalar
yarn install

# Reinstalar pods
cd ios
pod deintegrate
pod install
cd ..
```

### 4. Limpar Build do Xcode

No Xcode:
1. Product → Clean Build Folder (Shift + Cmd + K)
2. Feche o Xcode completamente
3. Abra novamente

### 5. Verificar Scripts de Build

No Xcode:
1. Selecione o projeto
2. Vá em Build Phases
3. Verifique o script "Bundle React Native code and images"
4. Certifique-se de que o caminho do Node está correto

### 6. Verificar Permissões

```bash
# Dar permissão de execução aos scripts
chmod +x node_modules/react-native/scripts/*
chmod +x ios/Pods/Target\ Support\ Files/Pods-*/Pods-*-resources.sh
```

### 7. Rebuild Completo

```bash
# Parar Metro bundler se estiver rodando
# Pressione Ctrl+C no terminal onde está rodando

# Limpar tudo
./scripts/clean-build.sh

# Reinstalar dependências
yarn install
cd ios && pod install && cd ..

# Iniciar Metro bundler
yarn start --reset-cache

# Em outro terminal, buildar
yarn ios
```

### 8. Se ainda não funcionar

```bash
# Verificar logs detalhados
cd ios
xcodebuild -workspace PrajaClientMobileApp.xcworkspace \
  -scheme PrajaClientMobileApp \
  -configuration Debug \
  -sdk iphonesimulator \
  -derivedDataPath build 2>&1 | tee build.log

# Procurar por erros específicos
grep -i error build.log
```

### Problemas Comuns

#### Node não encontrado
```bash
# Criar/atualizar .xcode.env.local
echo "export NODE_BINARY=$(which node)" > ios/.xcode.env.local
```

#### Pods desatualizados
```bash
cd ios
pod repo update
pod install
```

#### Cache do Metro corrompido
```bash
rm -rf $TMPDIR/react-*
rm -rf $TMPDIR/metro-*
yarn start --reset-cache
```

#### Watchman com problemas
```bash
watchman watch-del-all
watchman shutdown-server
```

