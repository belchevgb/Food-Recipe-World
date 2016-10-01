describe('=== RECIPE MODEL ===', () => {
  describe('registerUser() tests', () => {
    let requester;

    beforeEach(() => {
      requester = sinon.stub(app.requester, 'post', (url, headers, data) => {
        return new Promise((resolve, reject) => {
          if (Object.keys(data).length === 2 || (data.username && data.password)) {
            resolve({ username: data.username });
          } else {
            reject({
              error: "Invalid credentials."
            });
          }
        });
      });
    });

    afterEach(() => requester.restore())

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
  });
});