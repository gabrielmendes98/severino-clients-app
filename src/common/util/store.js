class Store {
  constructor() {
    this.location = '';
    this.jwt = null;
  }

  setLocation(location) {
    this.location = location;
  }

  setJwt(jwt) {
    if (jwt) {
      this.jwt = `Bearer ${jwt}`;
    } else {
      this.jwt = null;
    }
  }
}

export default new Store();
