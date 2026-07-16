# 🧪 Casos de Teste: Módulo de Checkout (Print-on-Demand)

**Técnica Utilizada:** BDD (Behavior Driven Development) - Gherkin
**Severidade:** Alta/Crítica (Impacto direto no faturamento e experiência do cliente)

---

## 🛒 CT-01: Validação de Frete Dinâmico por Peso Volumétrico
**Objetivo:** Garantir que a API de frete calcula o valor corretamente quando múltiplas camisetas são adicionadas, alterando a faixa de peso do pacote.

> **Dado** que o cliente possui 1 "Camiseta Algodão Branca" (peso base 200g) no carrinho
> **E** o CEP de destino é "04538-133" (São Paulo - SP)
> **Quando** o cliente altera a quantidade do item para "5" (peso total 1kg)
> **E** clica em "Calcular Frete"
> **Então** o sistema deve consultar a API da transportadora
> **E** retornar as opções de frete com o valor reajustado para a faixa de peso de 1kg
> **E** o valor total do pedido deve ser atualizado corretamente.

---

## 💥 CT-02: Concorrência de Estoque (Falta de matéria-prima durante o pagamento)
**Objetivo:** Evitar a venda de produtos sem estoque de estamparia (Overbooking). Validação do momento crítico entre o carrinho e a aprovação do cartão.

> **Dado** que o cliente está na tela de "Revisão do Pedido" com 1 "Moletom Preto Tam. M" no carrinho
> **E** o estoque de peças lisas no fornecedor para esse item é de exatamente 1 unidade
> **Quando** outro cliente finaliza a compra desse mesmo último item milissegundos antes
> **E** o primeiro cliente clica em "Confirmar Pagamento"
> **Então** o sistema deve bloquear a transação
> **E** exibir a mensagem: "Infelizmente, um dos itens do seu carrinho esgotou. Por favor, revise seu pedido."
> **E** o item deve constar como "Indisponível" no carrinho.

---

## 🎟️ CT-03: Bloqueio de Cupons de Desconto Cumulativos
**Objetivo:** Prevenir falhas lógicas que permitam ao usuário zerar o valor total da compra combinando cupons indevidamente.

> **Dado** que o cliente tem R$ 100,00 em produtos no carrinho
> **E** insere o cupom "BOASVINDAS10" (10% de desconto)
> **E** o desconto é aplicado com sucesso, reduzindo o subtotal para R$ 90,00
> **Quando** o cliente tenta inserir um segundo cupom "FRETEGRATIS"
> **Então** o sistema deve remover o desconto anterior ("BOASVINDAS10")
> **E** aplicar apenas o novo cupom ("FRETEGRATIS")
> **E** exibir a mensagem "Apenas um cupom promocional pode ser utilizado por compra".
