describe('=== RECIPE MODEL ===', () => {
  describe('registerUser() tests', () => {
    it('User should be registered with valid username and password.Object with username should be returned.', done => {
      let requester = sinon.stub(app.requester, 'post', (url, headers, data) => {
        return new Promise((resolve, reject) => {
          if (data.username && data.password) {
            resolve({ username: data.username });
          }
        });
      });

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
      requester.restore();
    });
  });
});