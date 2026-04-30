# CarePlus Go — Jornada Gamificada do Cuidado Contínuo

Projeto desenvolvido para o **Challenge Care Plus** — 2º semestre de Engenharia de Software — FIAP
Sprint 2 & 3 · Disciplina: Web Development

## Sobre

Aplicação web mobile-first que transforma o cuidado com a saúde em uma experiência gamificada. Beneficiários completam missões diárias, acumulam pontos e trocam por recompensas reais como consultas gratuitas e descontos no plano.

Migrado do protótipo HTML/CSS/Bootstrap (Sprint 2) para React + Vite com roteamento, persistência de dados e componentes reutilizáveis.

## Integrantes

| Nome | RM |
|------|----|
| Nicolas Forcione de Oliveira e Souza | RM566998|
| Enrico Dellatorre da Fonseca | RM566824 |
| Alexandre Constantino Furtado Junior | RM567188 |
| Leonardo Batista de Souza | RM568558 |
| Matheus Freitas dos Santos | RM56737 |

## Como Rodar

```bash
npm install
npm run dev
```
Acesse em: http://localhost:5173

## Tecnologias

- React 18 + Vite 5
- React Router DOM v6
- CSS Custom Properties (Design System)
- localStorage para persistência de dados

## Estrutura

```
src/
├── components/   BottomNav, MissionCard, ConquestModal
├── data/         appData.json
├── hooks/        useLocalStorage.js
├── pages/        Splash, Onboarding, Lgpd, HealthConnect, Home, Missoes, Carteira, Perfil
└── styles/       global.css
```
