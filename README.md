# Web Entregas - Sistema de Gestão de Entregas

## 🎨 Design System - MagicUI

Este projeto foi completamente redesenhado com o padrão **MagicUI**, oferecendo uma interface moderna, elegante e altamente funcional.

### ✨ Características do MagicUI Implementadas

- **Design System Consistente**: Componentes padronizados com tema unificado
- **Interface Limpa**: Removidos gradientes coloridos que interferiam com dados
- **Tipografia Moderna**: Fonte Inter para melhor legibilidade
- **Sistema de Cores**: Palette de cores semânticas e acessíveis
- **Componentes Interativos**: Botões, cards e formulários responsivos
- **Loading States**: Spinners e estados de carregamento elegantes
- **Navegação Intuitiva**: Header moderno com ícones Lucide React

### 🛠️ Tecnologias Utilizadas

- **React 18** - Framework principal
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Framework de estilos
- **Vite** - Build tool moderna
- **Framer Motion** - Animações fluidas
- **Lucide React** - Ícones modernos
- **Radix UI** - Componentes acessíveis
- **Lucide React** - Ícones modernos
- **Framer Motion** - Animações (preparado para uso)
- **Class Variance Authority** - Gerenciamento de variantes de componentes

### 📦 Componentes MagicUI Disponíveis

- `Button` - Botões com múltiplas variantes
- `Card` - Cartões com header, content e footer
- `Badge` - Badges para status e categorias
- `Table` - Tabelas responsivas e estilizadas
- `Input` - Campos de entrada padronizados
- `LoadingSpinner` - Indicadores de carregamento
- `BorderBeam` - Efeito de borda animada
- `Toast` - Notificações elegantes
- `Dialog` - Modais e diálogos

### 🎯 Páginas Atualizadas

1. **Login** - Interface moderna com animações
2. **Dashboard** - Cards interativos com estatísticas
3. **Entregas** - Tabela responsiva com badges de status
4. **Veículos** - Lista organizada com ícones
5. **Usuários** - Formulário de cadastro otimizado

### 🚀 Como Executar

```bash
# Instalar dependências
npm install

# Executar em modo desenvolvimento
npm run dev

# Build para produção
npm run build
```

### 🌟 Melhorias Implementadas

- ✅ Interface moderna e responsiva
- ✅ Sistema de design consistente
- ✅ Animações e transições suaves
- ✅ Componentes reutilizáveis
- ✅ Acessibilidade melhorada
- ✅ Loading states otimizados
- ✅ Formulários com validação visual
- ✅ Navegação intuitiva

### 📱 Responsividade

O sistema é totalmente responsivo, adaptando-se perfeitamente a:
- Desktop (1920px+)
- Laptop (1024px+)
- Tablet (768px+)
- Mobile (320px+)

### 🎨 Customização

O sistema utiliza CSS Variables para fácil customização:

```css
:root {
  --primary: 240 5.9% 10%;
  --secondary: 240 4.8% 95.9%;
  --accent: 240 4.8% 95.9%;
  --background: 0 0% 100%;
  --foreground: 240 10% 3.9%;
  /* ... mais variáveis */
}
```

Para mais detalhes sobre os componentes MagicUI, consulte o arquivo `MAGICUI_README.md`.

---

Desenvolvido com ❤️ usando MagicUI

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```

### 🔄 Principais Mudanças Implementadas

#### ✅ Sistema de Design
- Migração completa para MagicUI
- Remoção de gradientes coloridos que interferiam com dados
- Implementação de CSS Variables para tema consistente
- Configuração do Tailwind CSS com cores semânticas

#### ✅ Componentes UI
- Criação de biblioteca completa de componentes reutilizáveis
- Button com variantes (default, destructive, outline, secondary, ghost, link)
- Card system com header, content e footer
- Table responsiva com estilização moderna
- Badge system para status de entregas
- Loading spinners elegantes

#### ✅ Navegação e Layout
- Header moderno com ícones Lucide React
- MainLayout responsivo
- Navegação intuitiva com estados ativos

#### ✅ Páginas Redesenhadas
- **Login**: Interface clean com validação visual
- **Dashboard**: Cards informativos sem gradientes
- **Entregas**: Tabela moderna com badges de status
- **Veículos**: Lista organizada com ícones
- **Usuários**: Formulário de cadastro otimizado

#### ✅ Correções Técnicas
- Correção de CORS na API (porta 5174 adicionada)
- Remoção de imports CSS conflitantes
- Migração de lazy loading para imports diretos
- Correção de arquivos corrompidos
