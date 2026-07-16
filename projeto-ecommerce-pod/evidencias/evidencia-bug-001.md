#  Evidência: BUG-001 - Acúmulo Indevido de Cupons

**Data da captura:** 16/07/2026
**Ambiente:** Homologação (Web)

### Simulação do Carrinho de Compras (Mockup do Erro)

Abaixo está a representação dos dados na tela no momento em que o bug foi reproduzido. O sistema aceitou a inserção de dois cupons simultâneos, ignorando a regra de exclusividade (CT-03).

| Item | Qtd | Preço Unitário | Subtotal |
| :--- | :---: | :--- | :--- |
| Moletom Preto (Estampa Personalizada) - Tam. M | 1 | R$ 100,00 | R$ 100,00 |

**Cupons e Descontos Ativos no Front-end:**
* ❌ `BOASVINDAS10` (Ativo) -> - R$ 10,00
* ❌ `FRETEGRATIS` (Ativo) -> Frete R$ 0,00

**Resumo Final do Pedido (Cálculo Incorreto):**
* Subtotal dos Itens: R$ 100,00
* Descontos Aplicados: - R$ 10,00
* Frete (Correios - Sedex): R$ 0,00
* **Total a Pagar: R$ 90,00**

> ** Nota do QA para a equipe de Engenharia:** 
> O comportamento esperado era a invalidação do desconto de R$ 10,00 ao inserir o cupom de Frete Grátis,
>  ou o bloqueio do segundo cupom com uma mensagem de alerta. A API `POST /api/v1/checkout/apply-coupon` está retornando `status 200 OK` para ambas as requisições em sequência.
