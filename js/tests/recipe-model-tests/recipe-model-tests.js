describe('=== RECIPE MODEL ===', () => {
    const recipes = [{id: 1}, {id: 2}];

    describe('getGuestRecipes() should', () => {
      let requester;
      const expectedUrl = 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/random?limitLicense=false&number=5';
      const expectedHeaders = {
                'X-Mashape-Key' : 'V2EOYfYF8omshB2WdzCKxcFB920ap1NPUwGjsnorkyZhQvt7Q0'
              };

      beforeEach(() => {
          requester = sinon.stub(app.requester, 'get', (actualUrl, actualHeaders) => {
              return new Promise((resolve, reject) => {
                  if(actualHeaders['X-Mashape-Key'] !== expectedHeaders['X-Mashape-Key']) {
                      reject({
                          error: `Invalid get request headers! -> ${actualHeaders}`
                      });
                  } else if (actualUrl !== expectedUrl) {
                      reject({
                          error: `Invalid get request url! -> ${actualUrl}`
                      });
                  } else {
                      resolve(recipes);
                  }
              });
          });
      });

      afterEach(() => app.requester.get.restore());

      it('return the requested recipes', done => {
          app.recipeModel
              .getGuestRecipes()
              .then(response => {
                  expect(response).to.eql(recipes);
              })
              .then(done, done);
      });
      it('app.requester.get to be called ony once', done => {
          app.recipeModel
              .getGuestRecipes()
              .then(response => {
                  expect(app.requester.get.calledOnce).to.be.true;
              })
              .then(done, done);
      });
      it('request recipes with correct headers', done => {
          app.recipeModel
                .getGuestRecipes()
                .then(response => {
                    expect(response).to.eql(recipes);
                })
                .then(done, done);
      });
      it('not return recipes when requesting with incorrect headers', done => {
          let url = {};
          let headers = sinon.stub(app.headers, 'getSpoonacularHeaders', (sendData) => {
              return {};
          });

          app.recipeModel
                .getGuestRecipes(url, headers)
                .then(success => {
                    done(new Error());
                }, error => {
                    console.log(error);
                    done();
                });
          app.headers.getSpoonacularHeaders.restore();
      });
    });

    describe('getRecipes() should', () => {
      let requester;
    
      beforeEach(() => {
          requester = sinon.stub(app.requester, 'get', (url, headers) => {
              return new Promise((resolve, reject) => {
                  resolve(recipes);
              });
          });
      });

      afterEach(() => app.requester.get.restore());
        
      it('return recipes', done => {  
          const data = {
              searchRecipeQuery: 'asd',
              searchRecipeDiet: '',
              searchRecipeNumberOfRecipes: 1,
              searchRecipeCuisine: ''
          };   

          app.recipeModel
              .getRecipes(data)
              .then(response => {
                  expect(response).to.eql(recipes);
              })
              .then(done, done);      
      });
      it('show notification when no search query is provided', done => {  
          const data = '';   
          let notificator = sinon.stub(app.notificator, 'showNotification');
          
          app.recipeModel
              .getRecipes(data)
              .then(response => {
                  expect(notificator.calledOnce).to.be.true;
              })
              .then(done, done);

          app.notificator.showNotification.restore();
      });
    });

    describe('getSearchedRecipeById() should', () => {
        let requester;
    
        beforeEach(() => {
            requester = sinon.stub(app.requester, 'get', (url, headers) => {
                return new Promise((resolve, reject) => {
                    resolve(recipes[0]);
                });
            });
        });

        afterEach(() => app.requester.get.restore());
        
        it('return rearched recipe', done => {  
            let recipeId = 1;

            app.recipeModel
                .getSearchedRecipeById(recipeId)
                .then(response => {
                    expect(response).to.eql(recipes[0]);
                })
                .then(done, done);      
        });
        // it('show notification when no search query is provided', done => {
        //     let recipeId = null;  
        //     let notificator = sinon.stub(app.notificator, 'showNotification');

        //     app.recipeModel
        //         .getSearchedRecipeById(recipeId)
        //         .then(() => {
        //             expect(notificator.calledOnce).to.be.true;
        //         })
        //         .then(done, done);

        //     app.notificator.showNotification.restore();
        // });
    });
    describe('getRecipeById() should', () => {
        let requester;
 
        beforeEach(() => {
            requester = sinon.stub(app.requester, 'get', (url, headers) => {
                return new Promise((resolve, reject) => {
                    resolve(recipes[0]);
                });
            });
        });

        afterEach(() => app.requester.get.restore());
        
        it('return rearched recipe', done => {  
            let recipeId = 1;
            
            app.recipeModel
                .getSearchedRecipeById(recipeId)
                .then(response => {
                    expect(response).to.eql(recipes[0]);
                })
                .then(done, done);      
        });
    });
});