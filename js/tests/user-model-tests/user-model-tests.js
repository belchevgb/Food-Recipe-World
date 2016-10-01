describe('=== RECIPE MODEL ===', () => {
  describe('registerUser() tests', () => {
    let requester,
      users = [];

    beforeEach(() => {
      requester = sinon.stub(app.requester, 'post', (url, headers, data) => {
        return new Promise((resolve, reject) => {
          if (Object.keys(data).length === 2 && (data.username && data.password)) {
            resolve({ username: data.username });
            users.push(data);
          } else {
            reject({
              error: "Invalid credentials."
            });
          }
        });
      });
    });

    afterEach(() => app.requester.post.restore());

    it('User should be registered with valid username and password.Object with username should be returned.', done => {
      let userData = {
        username: 'username',
        password: '123456'
      };

      app.userModel
        .registerUser(userData)
        .then(response => {
          expect(response.username).to.equal(userData.username);
        })
        .then(done, done);
    });

    it('User should NOT be registered if the data object has missing username or password', done => {
      let userData = {};

      app.userModel
        .registerUser(userData)
        .then(success => {
          done(new Error());
        }, error => {
          console.log(error);
          done();
        });
    });

    it('Expect app.requester.post() to be called once', done => {
      let userData = {
        username: 'username',
        password: '123456'
      };

      app.userModel
        .registerUser(userData)
        .then(() => {
          expect(app.requester.post.calledOnce).to.be.true;
        })
        .then(done, done);
    });

    it('Valid registration, should add the new user to all users', () => {
      let userData = {
        username: 'username',
        password: '123456'
      };

      app.userModel
        .registerUser(userData)
        .then(() => {
          expect(users.length).to.equal(1);
        });
    });
  });

  describe('loginUser() tests', () => {
    const authToken = '6sadadsfb9xcv7vc6xv00rw0we7vds9',
      users = [
        {
          username: 'username',
          password: '123456'
        }
      ];

    beforeEach(() => {
      sinon.stub(app.requester, 'post', (url, headers, data) => {
        return new Promise((resolve, reject) => {
          let doesExist = users.some(u => u.username === data.username && u.password === data.password);

          if (doesExist && Object.keys(data).length === 2 && data.username && data.password) {
            resolve({
              username: data.username,
              id: 213213215321,
              authToken
            });
          } else if (!doesExist) {
            reject({
              error: 'User not found.'
            });
          } else {
            reject({
              error: 'Invalid credentials.'
            });
          }
        });
      });
    });

    afterEach(() => {
      localStorage.clear();
      app.requester.post.restore();
    });

    it('Login with valid data, should return object with id, authToken and username', done => {
      let userData = {
        username: 'username',
        password: '123456'
      };

      app.userModel
        .loginUser(userData)
        .then(response => {
          expect(response.username).to.equal(userData.username);
          expect(response.id).to.exist;
          expect(response.authToken).to.exist;
        })
        .then(done, done);
    });

    it('Login with non existing user, should cause error', done => {
      let userData = {
        username: 'dsadsa',
        password: 'password'
      };

      app.userModel
        .loginUser(userData)
        .then(response => done(new Error()),
        reject => done());
    });

    it('Login with invalid creadentials should cause error', done => {
      let userData = {};

      app.userModel
        .loginUser(userData)
        .then(response => done(new Error()),
        reject => done());
    });
  });

  describe('addRecipeToFavorites() tests', () => {
    let users = [];
    const authToken = '6sadadsfb9xcv7vc6xv00rw0we7vds9';

    beforeEach(() => {
      users = [
        {
          username: 'username',
          authToken,
          favoriteRecipes: []
        }
      ];

      sinon.stub(app.requester, 'get', (url, headers) => {
        return new Promise((resolve, reject) => {
          resolve(users[0]);
        });
      });

      sinon.stub(app.requester, 'put', (url, headers, data) => {
        return new Promise((resolve, reject) => {
          users = [];
          users.push(data);
          resolve(users[0]);
        });
      });
    });

    afterEach(() => {
      app.requester.put.restore();
      app.requester.get.restore();
    });

    it('Adding recipe should add it to all user recipes', done => {
      app.requester
        .get()
        .then(response => {
          let recipe = {
            title: 'Chorba',
            id: '8989219',
            text: ''
          };

          return app.userModel.addRecipeToFavorites(recipe);
        })
        .then(() => {
          expect(users[0].favoriteRecipes).to.have.lengthOf(1);
        })
        .then(done, done);
    });
  });
});