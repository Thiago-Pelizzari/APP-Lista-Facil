# 🛒 ListaFácil

Protótipo de aplicativo mobile de **lista de compras** desenvolvido em React Native com Expo. O app permite navegar entre telas, adicionar produtos com categoria, marcar itens como comprados e explorar sugestões por categoria — tudo em um único arquivo de código.

---

## 📱 Telas do Aplicativo

| Tela | Descrição |
|---|---|
| **Home** | Tela inicial com logotipo, descrição do app e botões de acesso rápido (Ver lista, Adicionar item, Categorias). |
| **Lista de Compras** | Exibe os itens cadastrados com checkbox interativo, badge de quantidade, categoria e local de compra. Permite excluir itens. |
| **Adicionar Item** | Formulário para cadastrar novos produtos com campos de nome, quantidade, local de compra e seletor visual de categoria. |
| **Categorias** | Grade com 6 categorias (Hortifruti, Laticínios, Limpeza, Bebidas, Carnes, Padaria) representadas por ícones coloridos. |
| **Detalhes da Categoria** | Ao clicar em uma categoria, exibe sugestões de produtos daquele grupo. |

---

## ✨ Funcionalidades

- ✅ Navegação completa entre 5 telas
- ✅ Adição dinâmica de itens na lista (persiste durante a sessão)
- ✅ Checkbox interativo com efeito de texto riscado ao marcar
- ✅ Exclusão de itens da lista
- ✅ Seletor de categoria em grade responsiva (3 colunas, adaptado para celular)
- ✅ Badge de categoria exibida na lista de compras
- ✅ Sugestões de produtos por categoria
- ✅ Design visual limpo em tons de verde e branco

---

## 🛠️ Tecnologias Utilizadas

- **React Native** — Framework para desenvolvimento mobile
- **Expo** — Plataforma para build e execução simplificada
- **@expo/vector-icons (Ionicons)** — Ícones vetoriais integrados ao Expo
- **JavaScript (ES6+)** — Linguagem de programação

> **Nota:** O app não utiliza bibliotecas externas de navegação. O roteamento entre telas é feito internamente com `useState` do React.

---

## 📂 Estrutura do Projeto

```
📁 APP Lista Fácil
├── App.js          # Código completo do aplicativo (telas, estilos e lógica)
├── app.json        # Configurações do Expo (nome, ícone, versão)
├── package.json    # Dependências do projeto
└── 📁 assets/      # Ícones e imagens padrão do Expo
```

---

## 🚀 Como Executar

### Opção 1 — Expo Snack (mais rápido, sem instalação)

1. Acesse [snack.expo.dev](https://snack.expo.dev)
2. Copie todo o conteúdo do arquivo `App.js`
3. Cole no editor do Snack substituindo o código padrão
4. O app será executado automaticamente no preview

### Opção 2 — Localmente com Expo CLI

```bash
# 1. Clone o repositório
git clone <url-do-repositorio>

# 2. Acesse a pasta do projeto
cd APP-Lista-Facil

# 3. Instale as dependências
npm install

# 4. Inicie o servidor Expo
npm start
```

Escaneie o **QR Code** exibido no terminal com o app **Expo Go** (disponível na Play Store e App Store) para visualizar no celular.

---

## 🎨 Paleta de Cores

| Cor | Hex | Uso |
|---|---|---|
| Verde Floresta | `#2E7D32` | Botões principais, destaques |
| Verde Folha | `#4CAF50` | Elementos secundários |
| Verde Claro | `#E8F5E9` | Fundos de badges e botões leves |
| Off-white | `#F5F7F6` | Fundo geral do app |
| Branco | `#FFFFFF` | Cards e formulários |
| Texto Escuro | `#1A3022` | Títulos e textos principais |

---

## 📋 Observações

- Este é um **protótipo funcional** sem banco de dados ou autenticação
- Os dados existem apenas em memória durante a sessão do app
- Itens adicionados são perdidos ao recarregar o aplicativo
- O foco do projeto é demonstrar a **navegação entre telas** e a **interface visual**

---

## 👤 Autor

Desenvolvido como projeto de estudo e prototipação de aplicativos mobile com React Native e Expo.
