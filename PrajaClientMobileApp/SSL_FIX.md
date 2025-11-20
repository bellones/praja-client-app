# Solução para Erro SSL do CocoaPods

## Problema
Erro: `SSL_connect returned=1 errno=0 peeraddr=[...]:443 state=error: certificate verify failed`

## Solução

O problema ocorre quando o React Native CLI tenta instalar os Pods. A solução é instalar os Pods manualmente antes de rodar o app.

### Opção 1: Instalar Pods manualmente (Recomendado)

```bash
# Instalar pods primeiro
cd ios
bundle exec pod install
cd ..

# Depois rodar o app
yarn ios
```

### Opção 2: Usar script npm

```bash
# Instalar pods e rodar
yarn ios:pod

# Ou apenas instalar pods
yarn pod:install
```

### Opção 3: Script de instalação

```bash
./scripts/install-pods.sh
```

## Se o erro persistir

### Atualizar certificados do sistema

```bash
# macOS
sudo update-ca-certificates

# Ou reinstalar certificados via Homebrew
brew install ca-certificates
```

### Verificar proxy/VPN

Se você estiver usando VPN ou proxy, pode estar interferindo. Tente:
1. Desconectar VPN temporariamente
2. Verificar configurações de proxy do sistema
3. Tentar em outra rede

### Limpar cache do CocoaPods

```bash
rm -rf ~/Library/Caches/CocoaPods
pod cache clean --all
pod repo update
```

## Nota

Os Pods já foram instalados com sucesso quando executados diretamente. O problema é apenas com o React Native CLI tentando executar o `pod install` automaticamente.

