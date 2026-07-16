
# 📋 Plano de Testes: E-commerce Print-on-Demand (PoD)

## 1. Introdução e Contexto do Negócio
Este documento define a estratégia de testes para o módulo de **Checkout e Processamento de Pedidos** de uma plataforma de E-commerce operando no modelo Print-on-Demand. O sistema gerencia a venda de vestuário, onde os produtos só são produzidos após a confirmação do pagamento, exigindo sincronia perfeita entre o carrinho, a validação de estoque de matéria-prima (camisetas lisas) e as APIs de frete.

## 2. Escopo dos Testes
Os testes focarão nas seguintes funcionalidades críticas:
* **Carrinho de Compras:** Adição/remoção de itens e atualização de quantidades.
* **Motor de Promoções:** Aplicação de cupons de desconto (simples e cumulativos).
* **Cálculo de Frete Dinâmico:** Integração com serviços de entrega baseando-se no peso volumétrico das peças e CEP de destino.
* **Checkout e Concorrência de Estoque:** Validação de disponibilidade de itens no exato momento da transação (evitando vendas sem estoque de matéria-prima).

## 3. Estratégia e Tipos de Testes
* **Testes Funcionais:** Garantir que as regras de negócio de cálculo de preços, aplicação de cupons e taxas de envio funcionem conforme os requisitos.
* **Teste de Limite (Boundary Value Analysis):** Testar o comportamento do sistema com o peso máximo permitido por pacote e o valor mínimo para aplicação de cupons de frete grátis.
* **Testes de Cenários de Exceção:** Simular falhas de rede durante o cálculo do frete e perda de estoque de um item entre a fase de carrinho e o clique final em "Pagar".

## 4. Riscos Mapeados
1. **Prejuízo Financeiro:** Cupons cumulativos aplicados incorretamente zerando o valor do pedido.
2. **Abandono de Carrinho:** Falha na comunicação com a API de frete impedindo a finalização da compra.
3. **Quebra de Confiança:** Cliente pagar por um produto (ex: Camiseta Preta, Tamanho G) que ficou sem estoque na base do fornecedor segundos antes do pagamento.

## 5. Critérios de Aceite (Definition of Done)
* Todos os casos de teste críticos (P1) devem ser executados com 100% de sucesso.
* Bugs de severidade Alta ou Crítica devem ser reportados e corrigidos antes da liberação (Release).
* O cálculo final do pedido (Valor das peças + Frete - Descontos) não pode apresentar divergência de centavos.
