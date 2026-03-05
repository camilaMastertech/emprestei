# Como colaborar no Emprestei

## Pré-requisitos

- Node.js 20+
- npm

## Setup local

```bash
npm install
npm run dev
```

## Fluxo de trabalho

1. Atualize a branch principal:
```bash
git checkout main
git pull
```
2. Crie uma branch para sua tarefa:
```bash
git checkout -b codex/minha-feature
```
3. Faça commits pequenos e claros:
```bash
git add .
git commit -m "feat: descrição curta"
```
4. Envie a branch:
```bash
git push -u origin codex/minha-feature
```
5. Abra um Pull Request para `main`.

## Padrão de commits (Conventional Commits)

- `feat:` nova funcionalidade
- `fix:` correção de bug
- `chore:` manutenção
- `docs:` documentação
- `refactor:` melhoria sem mudança de comportamento

## Critérios para merge

- Build passando (`npm run build`)
- Revisão de pelo menos 1 pessoa
- Sem conflitos com `main`
