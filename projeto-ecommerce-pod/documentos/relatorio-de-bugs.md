#  Relatório de Bugs: Módulo de Checkout

## BUG-001: Acúmulo Indevido de Cupons Promocionais no Carrinho

**Status:** Aberto
**Severidade:** Crítica (Impacto direto no faturamento / Prejuízo financeiro)
**Prioridade:** Alta (Bloqueio de Release)
**Ambiente:** Homologação (Web - Google Chrome v115, Windows 10)
**Data do Reporte:** 16/07/2026

---

###  Pré-condições
* O usuário deve estar logado no sistema.
* O usuário deve ter pelo menos um produto adicionado ao carrinho (ex: Moletom Preto - R$ 100,00).
* Os cupons `BOASVINDAS10` (10% de desconto) e `FRETEGRATIS` (isento de taxa de entrega) devem estar ativos no banco de dados.

###  Passos para Reproduzir
1. Acesse a tela de Carrinho de Compras.
2. No campo "Código Promocional", digite `BOASVINDAS10` e clique em "Aplicar".
3. Verifique se o subtotal foi reduzido corretamente (de R$ 100,00 para R$ 90,00).
4. No mesmo campo "Código Promocional", digite `FRETEGRATIS` e clique em "Aplicar".
5. Observe o recálculo do valor total da compra.

###  Resultado Esperado
Conforme a regra de negócio (CT-03), o sistema deve permitir apenas um cupom por compra. Ao inserir o cupom `FRETEGRATIS`, o desconto de 10% anterior deveria ser removido, aplicando apenas a gratuidade do frete, e uma mensagem de alerta ("Apenas um cupom promocional pode ser utilizado") deveria ser exibida.

###  Resultado Atual (O Bug)
O sistema aceita a inserção do segundo cupom sem invalidar o primeiro. Os descontos estão se sobrepondo (Stacking), resultando no produto com 10% de desconto e, simultaneamente, com frete grátis. Nenhuma mensagem de erro é exibida.

---

###  Evidências
* **Log da Tela e Dados:** [Acessar evidencia-bug-001.md](../evidencias/evidencia-bug-001.md)
* **Console Log:** Falha na validação de exclusividade na requisição `POST /api/v1/checkout/apply-coupon`.


---

## 🚨 BUG-002: Tela de Checkout em Loading Infinito (Falha no Fallback da API de Frete)

**Status:** Aberto
**Severidade:** Alta (Impede a finalização da compra em cenários de instabilidade externa)
**Prioridade:** Alta
**Ambiente:** Homologação (Web - Chrome v115) / Mock API
**Data do Reporte:** 17/07/2026

---

###  Pré-condições
* O usuário deve estar logado e possuir itens no carrinho.
* A API da transportadora / Correios deve estar configurada para simular um Timeout (tempo de resposta superior a 5000ms) ou retornar um erro genérico (Status 503 - Service Unavailable).

###  Passos para Reproduzir
1. Acesse o carrinho de compras.
2. Prossiga para a tela de Checkout e insira um CEP válido para entrega.
3. Clique no botão "Calcular Frete".
4. Aguarde a comunicação com a API externa (simulando instabilidade).
5. Observe o comportamento da interface do usuário (UI) e o log da aba "Network" no navegador.

###  Resultado Esperado
Conforme o caso de teste (CT-04), ao detectar a falha de comunicação com a API externa após 5 segundos, o sistema deve interromper a busca e exibir automaticamente a opção de contingência: **"Frete Fixo Padrão - R$ 25,00 (Prazo estendido)"**, permitindo que o usuário conclua o pagamento sem bloqueios.

###  Resultado Atual (O Bug)
O sistema não possui tratamento adequado para o Timeout. A interface do usuário fica travada em um estado de "loading" (ícone girando infinitamente). O cliente fica impossibilitado de selecionar um método de entrega e não consegue avançar para a etapa de pagamento, forçando o abandono do carrinho.

---

###  Evidências
* **Comportamento da Interface:** O botão de "Continuar para Pagamento" permanece desabilitado (disabled).
* **Console Log / Network:** A requisição `GET /api/v1/shipping/calculate?cep=04538133` fica com status `(pending)` indefinidamente, sem acionar o mecanismo de Fallback (plano B) no Front-end.
