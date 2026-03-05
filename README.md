# Emprestei (MVP)

MVP mobile first para registrar objetos emprestados e compartilhar um link público por WhatsApp.

## Stack

- Vite
- React
- TypeScript
- Supabase (produção)
- `localStorage` como fallback local

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

## Persistência para produção (Supabase)

1. Crie um projeto no Supabase.
2. No SQL Editor, rode o script: `supabase/schema.sql`.
3. Copie `.env.example` para `.env` e preencha:

```bash
VITE_SUPABASE_URL=https://SEU-PROJETO.supabase.co
VITE_SUPABASE_ANON_KEY=SUA_CHAVE_ANON
```

4. Rode o app:

```bash
npm run dev
```

Sem as variáveis acima, o app volta automaticamente para `localStorage`.

## Publicar em produção (Vercel)

1. Acesse [vercel.com](https://vercel.com), faça login e clique em **Add New Project**.
2. Importe o repositório `camilaMastertech/emprestei`.
3. Em **Environment Variables**, adicione:
   - `VITE_SUPABASE_URL=https://sdpgsakcqumdrvxmjclt.supabase.co`
   - `VITE_SUPABASE_ANON_KEY=<sua chave publishable>`
4. Deploy:
   - Build command: `npm run build`
   - Output directory: `dist`
5. Após publicar, teste:
   - `/`
   - `/l/qualquer-slug-existente`

O arquivo `vercel.json` já está configurado para SPA rewrite e mantém as rotas do React funcionando direto no navegador.

## Regras implementadas

- Sem autenticação
- Dono fixo: `pilot-user`
- Persistência remota em Supabase quando configurado
- Fallback em `localStorage` (`emprestei.loans.v1`) quando Supabase não estiver configurado
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
