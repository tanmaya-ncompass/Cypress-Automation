beforeEach(function(){
    let filename ='details9.json'
    cy.fixture(filename).then(function(data){
        this.data=data  
    })

})