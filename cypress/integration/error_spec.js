describe('This sections consists of tests for error handling on UI', () => {
  it('A proper error message should be displayed on UI in case of failure', () => {
    // Visit the index.html in browser
    cy.visit('http://localhost:8080');
    // Type a test username in input box
    cy
      .get('.element-userinput')
      .find('input[id="username"]')
      .type('username_xyz_yzx_zxy');

    // Start cypress server
    cy.server();
    // Mock server response for error
    cy
      .route({
        url: '/?username=**',
        response: 'fixture:check-error.json',
        status: 422,
      }).as('getUserData');

    // Simulate a form submission
    cy
      .get('button[id="do-req"]')
      .click();
    // Wait for promise to resolve
    cy
      .wait('@getUserData')
      .then(() => {
      // Loader should be hidden
      cy
        .get('#loader-wrapper')
        .should('have.css', 'visibility', 'hidden');
      // A proper error message is displayed on UI
      cy
        .get('p.progress-text')
        .should('contain', 'Oops, something went wrong!')
    });
  });
})