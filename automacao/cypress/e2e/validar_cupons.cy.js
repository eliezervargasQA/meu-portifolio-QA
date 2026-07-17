/// <reference types="cypress" />

describe('Módulo de Checkout - E-commerce Print-on-Demand', () => {
  
  beforeEach(() => {
    // Simula o acesso à página de carrinho com um Moletom Preto já adicionado
    cy.visit('/carrinho')
    cy.get('.item-title').should('contain', 'Moletom Preto - Tam. M')
    cy.get('.subtotal').should('contain', 'R$ 100,00')
  })

  it('CT-03: Deve bloquear o uso de cupons cumulativos', () => {
    // Insere o primeiro cupom
    cy.get('#input-cupom').type('BOASVINDAS10')
    cy.get('#btn-aplicar-cupom').click()
    
    // Valida se o primeiro desconto foi aplicado
    cy.get('.desconto-ativo').should('contain', '- R$ 10,00')
    cy.get('.total-pedido').should('contain', 'R$ 90,00')

    // Tenta inserir o segundo cupom (Frete Grátis)
    cy.get('#input-cupom').clear().type('FRETEGRATIS')
    cy.get('#btn-aplicar-cupom').click()

    // Valida o comportamento esperado: O sistema deve avisar e barrar o acúmulo
    cy.get('.toast-error').should('be.visible')
      .and('contain', 'Apenas um cupom promocional pode ser utilizado')
    
    // O valor total não pode cair para R$ 90,00 com frete grátis ao mesmo tempo
    cy.get('.desconto-ativo').should('not.contain', '- R$ 10,00')
  })
})
