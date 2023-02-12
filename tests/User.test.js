const User = require("../src/User");

describe("User", () => {
  beforeAll(() => {
    user1 = new User({
      username: "ScootyMcScooterson",
      password: "ScootinDownTheStreetInMy64",
      age: 99,
    });
  });

  describe("User constructor", () => {
    it("creates new User instance", () => {
      expect(user1).toBeInstanceOf(User);
    });

    it("initialises the username property", () => {
      expect(user1).toHaveProperty("username");
      expect(user1.username).toBe("ScootyMcScooterson");
    });

    it("initialises the password property", () => {
      expect(user1).toHaveProperty("password");
      expect(user1.password).toBe("ScootinDownTheStreetInMy64");
    });

    it("initialises the age property", () => {
      expect(user1).toHaveProperty("age");
      expect(user1.age).toBe(99);
    });

    it("initialises the loggedIn property", () => {
      expect(user1).toHaveProperty("loggedIn");
      expect(user1.loggedIn).toBe(false);
    });
  });

  describe("login()", () => {
    it("logs user in if password is correct", () => {
      user1.login(user1.password);
      expect(user1.loggedIn).toBe(true);
    });

    it("throws error if password is incorrect", () => {
      expect(() => {
        user1.login("incorrectPassword");
      }).toThrowError("incorrect password");
    });
  });

  describe("logout()", () => {
    it("logs user out", () => {
      user1.logout();
      expect(user1.loggedIn).toBe(false);
    });
  });
});
