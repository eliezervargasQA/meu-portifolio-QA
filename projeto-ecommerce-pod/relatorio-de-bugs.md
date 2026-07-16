#  Relatório de Bugs: Módulo de Checkout

## BUG-001: Acúmulo Indevido de Cupons Promocionais no Carrinho

**Status:** Aberto
**Severidade:** Crítica (Impacto direto no faturamento / Prejuízo financeiro)
**Prioridade:** Alta (Bloqueio de Release)
**Ambiente:** Homologação (Web - Google Chrome v115, Windows 10)
**Data do Reporte:** 16/07/2026

---

### 📌 Pré-condições
* O usuário deve estar logado no sistema.
* O usuário deve ter pelo menos um produto adicionado ao carrinho (ex: Moletom Preto - R$ 100,00).
* Os cupons `BOASVINDAS10` (10% de desconto) e `FRETEGRATIS` (isento de taxa de entrega) devem estar ativos no banco de dados.

###  Passos para Reproduzir
1. Acesse a tela de Carrinho de Compras.
2. No campo "Código Promocional", digite `BOASVINDAS10` e clique em "Aplicar".
3. Verifique se o subtotal foi reduzido corretamente (de R$ 100,00 para R$ 90,00).
4. No mesmo campo "Código Promocional", digite `FRETEGRATIS` e clique em "Aplicar".
5. Observe o recálculo do valor total da compra.

### ✅ Resultado Esperado
Conforme a regra de negócio (CT-03), o sistema deve permitir apenas um cupom por compra. Ao inserir o cupom `FRETEGRATIS`, o desconto de 10% anterior deveria ser removido, aplicando apenas a gratuidade do frete, e uma mensagem de alerta ("Apenas um cupom promocional pode ser utilizado") deveria ser exibida.

### ❌ Resultado Atual (O Bug)
O sistema aceita a inserção do segundo cupom sem invalidar o primeiro. Os descontos estão se sobrepondo (Stacking), resultando no produto com 10% de desconto e, simultaneamente, com frete grátis. Nenhuma mensagem de erro é exibida.

---

### 📎 Evidências
* **Log da Tela e Dados:** [Acessar evidencia-bug-001.md](../evidencias/evidencia-bug-001.md)
* **Console Log:** Falha na validação de exclusividade na requisição `POST /api/v1/checkout/apply-coupon`.
