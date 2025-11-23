# Auth Store - Zustand

Este store gerencia o estado de autenticação da aplicação usando Zustand com persistência no AsyncStorage.

## Estrutura

- `types.ts` - Tipos TypeScript para User, Session e AuthState
- `authStore.ts` - Store Zustand com persistência
- `index.ts` - Exports centralizados

## Uso

### Exemplo de Login

```typescript
import { useAuthStore } from '../state';

const LoginScreen = () => {
  const setSession = useAuthStore((state) => state.setSession);

  const handleLogin = async () => {
    // Após fazer a requisição de login e receber a resposta
    const response = await loginAPI(email, password);
    
    // Salvar a sessão no store (será persistido automaticamente)
    setSession({
      access_token: response.access_token,
      user: response.user,
    });
  };

  return (
    // ... seu componente
  );
};
```

### Exemplo de Logout

```typescript
import { useAuthStore } from '../state';

const ProfileScreen = () => {
  const clearSession = useAuthStore((state) => state.clearSession);
  const user = useAuthStore((state) => state.user);

  const handleLogout = () => {
    clearSession(); // Remove a sessão e limpa o AsyncStorage
  };

  return (
    <View>
      <Text>Olá, {user?.name}</Text>
      <Button onPress={handleLogout} title="Sair" />
    </View>
  );
};
```

### Acessar dados da sessão

```typescript
import { useAuthStore } from '../state';

const MyComponent = () => {
  const accessToken = useAuthStore((state) => state.accessToken);
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  // Ou usar múltiplos valores de uma vez
  const { accessToken, user, isAuthenticated } = useAuthStore();
};
```

### Atualizar dados do usuário

```typescript
import { useAuthStore } from '../state';

const ProfileScreen = () => {
  const updateUser = useAuthStore((state) => state.updateUser);

  const handleUpdateName = (newName: string) => {
    updateUser({ name: newName });
  };
};
```

## Estrutura de Dados

### Session (resposta da API)
```typescript
{
  access_token: string;
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
  }
}
```

### AuthState (store)
```typescript
{
  accessToken: string | null;
  user: User | null;
  isAuthenticated: boolean;
  setSession: (session: Session) => void;
  clearSession: () => void;
  updateUser: (user: Partial<User>) => void;
}
```

## Persistência

O store usa `AsyncStorage` para persistir os dados automaticamente. Os dados são salvos com a chave `auth-storage` e são restaurados automaticamente quando o app é reiniciado.

