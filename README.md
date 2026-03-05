# Emprestei (MVP)

MVP mobile first para registrar objetos emprestados e compartilhar um link público por WhatsApp.

## Stack

- Vite
- React
- TypeScript
- `localStorage` para persistência

## Como rodar

```bash
npm install
npm run dev
```

Abra o endereço mostrado no terminal (normalmente `http://localhost:5173`).

## Rotas

- `/` tela principal com:
  - bloco "Registrar novo empréstimo"
  - bloco "Meus empréstimos"
- `/l/:slug` página pública do empréstimo (somente leitura + ações por WhatsApp)

## Regras implementadas

- Sem autenticação
- Dono fixo: `pilot-user`
- Persistência em `localStorage` (`emprestei.loans.v1`)
- Status calculado:
  - `active`
  - `overdue` (quando hoje > `due_at` e status salvo ainda é `active`)
  - `returned`

## Fluxo principal

1. Registrar empréstimo com foto, objeto, categoria, pessoa, telefone e prazo em dias.
2. Salvar gera:
   - `created_at`
   - `due_at` (`created_at` + X dias)
   - `status = active`
   - `slug` público de 8 caracteres
3. Após salvar, aparece o botão "Compartilhar no WhatsApp" com:
   - `Te emprestei [objeto]. Prazo: [data]. Registro: [baseUrl]/l/[slug]`
4. Na lista, é possível:
   - marcar como devolvido
   - enviar lembrete no WhatsApp

## Página pública

Mostra foto, nome, categoria, datas e status, com botões:

- "Pedir prorrogação" (abre WhatsApp para o dono)
- "Confirmar devolução" (abre WhatsApp para o dono)

## Observação

O telefone do dono está fixo em `src/types.ts`:

- `OWNER_WHATSAPP = "5511999999999"`

Se quiser, troque para o número real que receberá as mensagens da página pública.
