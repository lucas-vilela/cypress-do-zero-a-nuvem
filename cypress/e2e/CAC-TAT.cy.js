describe('Central de Atendimento ao Cliente', () => {

  beforeEach(() => {
    cy.visit('./src/index.html')
  })

  it('Verifica o título da aplicação', () => {
    // cy.visit('./src/index.html')
    cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')
  })

  it('Preenche campos e envia o formulário', () => {
    cy.get('#firstName').as('primeiroNome').should('be.visible').type('Lucas', { delay: 0 })
    cy.get('@primeiroNome').should('have.value', 'Lucas')
    cy.get('#lastName').as('ultimoNome').should('be.visible').type('Vilela', { delay: 0 })
    cy.get('@ultimoNome').should('have.value', 'Vilela')
    cy.get('#email').as('email').should('be.visible').type('vilelalucas500@gmail.com', { delay: 0 })
    cy.get('@email').should('have.value', 'vilelalucas500@gmail.com')
    cy.get('#open-text-area').as('comoAjudar').should('be.visible').type('Ajudando', { delay: 0 })
    cy.get('@comoAjudar').should('have.value', 'Ajudando')

    cy.contains('button', 'Enviar').click()

    cy.get('.success > strong').as('msgSucesso').should('be.visible').should('have.text', 'Mensagem enviada com sucesso.')

  });

  it('Exibe a mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    cy.get('#firstName').as('primeiroNome').should('be.visible').type('Lucas', { delay: 0 })
    cy.get('@primeiroNome').should('have.value', 'Lucas')
    cy.get('#lastName').as('ultimoNome').should('be.visible').type('Vilela', { delay: 0 })
    cy.get('@ultimoNome').should('have.value', 'Vilela')
    cy.get('#email').as('email').should('be.visible').type('vilelalucas500@gmail,com', { delay: 0 })
    cy.get('@email').should('have.value', 'vilelalucas500@gmail,com')
    cy.get('#open-text-area').as('comoAjudar').should('be.visible').type('Ajudando', { delay: 0 })
    cy.get('@comoAjudar').should('have.value', 'Ajudando')

    cy.contains('button', 'Enviar').click()

    cy.get('.error > strong').as('msgSucesso').should('be.visible').should('have.text', 'Valide os campos obrigatórios!')

  });

  it('Campo telefone continua vazio quando preenchido com um valor não numérico', () => {
    cy.get('#phone')
      .type('abcde')
      .should('have.value', '')
  });

  it('Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.get('#firstName').as('primeiroNome').should('be.visible').type('Lucas', { delay: 0 })
    cy.get('@primeiroNome').should('have.value', 'Lucas')
    cy.get('#lastName').as('ultimoNome').should('be.visible').type('Vilela', { delay: 0 })
    cy.get('@ultimoNome').should('have.value', 'Vilela')
    cy.get('#email').as('email').should('be.visible').type('vilelalucas500@gmail.com', { delay: 0 })
    cy.get('@email').should('have.value', 'vilelalucas500@gmail.com')
    cy.get('#open-text-area').as('comoAjudar').should('be.visible').type('Ajudando', { delay: 0 })
    cy.get('@comoAjudar').should('have.value', 'Ajudando')
    cy.get('#phone-checkbox').check()

    cy.contains('button', 'Enviar').click()

    cy.get('.phone-label-span').should('be.visible').should('contain.text', 'obrigatório')
    cy.get('.error > strong').as('msgSucesso').should('be.visible').should('have.text', 'Valide os campos obrigatórios!')

  });

  it('Preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    cy.get('#firstName').as('primeiroNome').should('be.visible').type('Lucas', { delay: 0 })
    cy.get('@primeiroNome').should('have.value', 'Lucas')
    cy.get('@primeiroNome').clear().should('have.value', '')

    cy.get('#lastName').as('ultimoNome').should('be.visible').type('Vilela', { delay: 0 })
    cy.get('@ultimoNome').should('have.value', 'Vilela')
    cy.get('@ultimoNome').clear().should('have.value', '')

    cy.get('#email').as('email').should('be.visible').type('vilelalucas500@gmail.com', { delay: 0 })
    cy.get('@email').should('have.value', 'vilelalucas500@gmail.com')
    cy.get('@email').clear().should('have.value', '')

    cy.get('#open-text-area').as('comoAjudar').should('be.visible').type('Ajudando', { delay: 0 })
    cy.get('@comoAjudar').should('have.value', 'Ajudando')
    cy.get('@comoAjudar').clear().should('have.value', '')
  });

  it('Exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    cy.contains('button', 'Enviar').click()
    cy.get('.error > strong').as('msgSucesso').should('be.visible').should('have.text', 'Valide os campos obrigatórios!')
  });

  it('Envia o formuário com sucesso usando um comando customizado', () => {
    cy.fillMandatoryFieldsAndSubmit('Lucas', 'Vilela', 'email@email.com', 'Mensagem')
    // cy.fillMandatoryFieldsAndSubmit()
    cy.get('.success > strong').as('msgSucesso').should('be.visible').should('have.text', 'Mensagem enviada com sucesso.')
  });

  it('Seleciona um produto (YouTube) por seu texto', () => {
    cy.get('#product').select('YouTube').should('have.value', 'youtube')
  });

  it('Seleciona um produto (Mentoria) por seu valor (value)', () => {
    cy.get('#product').select('mentoria').should('have.value', 'mentoria')
  });

  it('Seleciona um produto (Blog) por seu índice', () => {
    cy.get('#product').select(1).should('have.value', 'blog')

  });

  it('Marca o tipo de atendimento "Feedback"', () => {
    cy.get('input[type="radio"][value="feedback"]').check().should('be.checked')
  });

  it('Marca cada tipo de atendimento', () => {
    cy.get('input[type="radio"]').each((el) => {
      cy.wrap(el).check().should('be.checked')
      cy.wait(500)
    })
  });

  it('Marca ambos checkboxes, depois desmarca o último', () => {
    cy.get('input[type="checkbox"]').each((el) => {
      cy.wrap(el).check().should('be.checked')
    })
    cy.get('input[type="checkbox"]').last().uncheck().should('not.be.checked')
  });

  it('Seleciona um arquivo da pasta fixtures', () => {
    cy.get('#file-upload').selectFile('cypress/fixtures/example.json').should((input) => {
      // console.log(input)
      expect(input[0].files[0].name).to.eq('example.json')
    })
  });

  it('Seleciona um arquivo simulando um drag-and-drop', () => {
    cy.get('#file-upload').selectFile('cypress/fixtures/example.json', { action: "drag-drop" }).should((input) => {
      // console.log(input)
      expect(input[0].files[0].name).to.eq('example.json')
    })
  });

  it('Seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
    cy.fixture("example.json").as('arquivoExemplo')
    cy.get('#file-upload').selectFile('@arquivoExemplo').should((input) => {
      // console.log(input)
      expect(input[0].files[0].name).to.eq('example.json')
    })
  });

  it('Verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
    cy.contains('a', 'Política de Privacidade').should('have.attr', 'href', 'privacy.html').and('have.attr', 'target', '_blank')
  });

  it('Acessa a página da política de privacidade removendo o target e então clicando no link', () => {
    cy.get('a[href="privacy.html"]').invoke('removeAttr', 'target').click()

    cy.contains('h1', 'CAC TAT - Política de Privacidade').should('not.be.visible')
  });

})