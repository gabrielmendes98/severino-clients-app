class Store {
  constructor() {
    this.location = '';
    this.jwt = null;
  }

  setLocation(location) {
    this.location = location;
  }

  setJwt(jwt) {
    this.jwt = jwt;
  }
}

export default new Store();
