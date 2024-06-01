/** @type {Array<{username: string, password: string, customerId: number}>} */
const users = [{ username: "admin", password: "admin", customerId: 1 }];
/** @type {Map<string, number>} */
const tokens = new Map();

export class UserLoginService {
  /**
   * Returns the customer ID if the user is valid, otherwise -1.
   *
   * @param {string} username
   * @param {string} password
   * @returns {number}
   */
  checkUser(username, password) {
    const user = users.find(
      (user) => user.username === username && user.password === password
    );

    return user ? user.customerId : -1;
  }

  /**
   * Creates a token for the given customer ID.
   *
   * @param {number} customerId
   * @returns {string}
   */
  createToken(customerId) {
    const token = crypto.randomUUID();
    tokens.set(token, customerId);
    return token;
  }

  /**
   * Checks if the token is valid and returns the customer ID.
   * If the token is invalid, returns -1.
   *
   * @param {string} token
   * @returns {number}
   */
  checkToken(token) {
    const customerId = tokens.get(token);
    return customerId ?? -1;
  }

  /**
   * Deletes the token.
   *
   * @param {string} token
   */
  deleteToken(token) {
    tokens.delete(token);
  }

  async deleteAllTokens() {
    return new Promise((resolve) => {
      tokens.clear();
      console.log("All tokens deleted");
      resolve(void 0);
    });
  }
}