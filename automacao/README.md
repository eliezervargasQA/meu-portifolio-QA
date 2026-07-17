#  Automação de Testes - Checkout PoD

Esta seção contém a Prova de Conceito (PoC) da automação dos testes de interface (E2E) utilizando **Cypress**. 

O script `validar_cupons.cy.js` automatiza o cenário manual **CT-03**, garantindo que a regressão desse fluxo seja rápida e eficiente. Caso o **BUG-001** volte a ocorrer em futuras atualizações do sistema, este script falhará no pipeline de CI/CD (Integração Contínua), impedindo que o erro chegue em produção.

##  Como executar localmente
Para rodar este projeto em sua máquina:
1. Tenha o Node.js instalado.
2. Execute `npm install` na pasta raiz de automação para instalar o Cypress.
3. Execute `npx cypress open` para abrir a interface de testes ou `npm run test` para rodar em modo headless.
