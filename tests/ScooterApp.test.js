const Scooter = require("../src/Scooter");
const User = require("../src/User");
const ScooterApp = require("../src/ScooterApp");

describe("ScooterApp", () => {
  beforeAll(() => {
    scooterApp = new ScooterApp();
    logSpy = jest.spyOn(console, "log");
  });

  describe("ScooterApp constructor", () => {
    it("creates new ScooterApp instance", () => {
      expect(scooterApp).toBeInstanceOf(ScooterApp);
    });

    it("initialises the stations property", () => {
      expect(scooterApp.stations).toStrictEqual({
        Piccadily: [],
        Victoria: [],
        Oxford: [],
      });
    });

    it("initialises the registeredUsers property", () => {
      expect(scooterApp.registeredUsers).toStrictEqual({});
    });
  });
});

describe("ScooterApp user methods", () => {
  beforeAll(() => {
    newUser = scooterApp.registerUser("ScootDoggyDogg", "deathRow4Lyf", 22);
  });

  describe("registerUser()", () => {
    it("throws error if user is under 18", () => {
      expect(() => {
        scooterApp.registerUser("username", "password", 17);
      }).toThrowError();
    });

    it("throws error if user is already registered", () => {
      expect(() => {
        scooterApp.registerUser(
          newUser.username,
          newUser.password,
          newUser.age
        );
      }).toThrowError(`username ${newUser.username} is already in use`);
    });

    it("adds a new user to registeredUsers", () => {
      expect(newUser).toBeInstanceOf(User);
      expect(scooterApp.registeredUsers.ScootDoggyDogg).toBe(newUser);
    });

    it("console.logs when the user is registered", () => {
      scooterApp.registerUser("ScootyDoobyDoo", "jinkies", 32);
      expect(logSpy).toHaveBeenCalledWith(
        "user ScootyDoobyDoo has been registered"
      );
    });
  });

  describe("loginUser()", () => {
    it("console.logs if the username and password are correct", () => {
      scooterApp.loginUser(newUser.username, newUser.password);
      expect(logSpy).toHaveBeenCalledWith(
        `user ${newUser.username} has been logged in`
      );
    });

    it("throws error if username is incorrect", () => {
      expect(() => {
        scooterApp.loginUser("ScootLion", newUser.password);
      }).toThrowError();
    });
  });

  describe("logoutUser()", () => {
    it("console.logs if the username is correct", () => {
      scooterApp.logoutUser(newUser.username);
      expect(logSpy).toHaveBeenCalledWith(
        `user ${newUser.username} is logged out`
      );
    });

    it("throws error if username is incorrect", () => {
      expect(() => {
        scooterApp.logoutUser("ScootLion");
      }).toThrowError();
    });
  });
});

describe("ScooterApp scooter methods", () => {
  beforeAll(() => {
    newScooter = scooterApp.createScooter("Piccadily");
  });

  describe("createScooter()", () => {
    it("creates and returns a new scooter if station exists", () => {
      expect(newScooter).toBeInstanceOf(Scooter);
    });

    it("creates a new scooter at the correct station", () => {
      expect(newScooter.station).toBe("Piccadily");
      expect(scooterApp.stations.Piccadily[0]).toBe(newScooter);
    });

    it("console.logs if the scooter is created", () => {
      let newScooter2 = scooterApp.createScooter("Victoria");
      expect(logSpy).toHaveBeenCalledWith(
        `created new scooter #${newScooter2.serial}`
      );
    });

    it("throws error if station is incorrect", () => {
      expect(() => {
        scooterApp.createScooter("Deansgate");
      }).toThrowError();
    });
  });

  describe("rentScooter()", () => {
    it("removes the scooter from the station", () => {
      scooterApp.rentScooter(newScooter, newUser);
      expect(scooterApp.stations.Piccadily[0]).toBe(undefined);
    });

    it("updates the scooters user", () => {
      expect(newScooter.user).toBe(newUser);
    });

    it("console.logs when the scooter is rented", () => {
      expect(logSpy).toHaveBeenCalledWith(
        `scooter #${newScooter.serial} is rented`
      );
    });

    it("throws error if scooter is already rented", () => {
      expect(() => {
        scooterApp.rentScooter(newScooter, newUser);
        scooterApp.rentScooter(newScooter, newUser);
      }).toThrowError(`scooter #${newScooter.serial} already rented`);
    });
  });

  describe("dockScooter()", () => {
    it("adds scooter to station when docked", () => {
      scooterApp.dockScooter(newScooter, "Oxford");
      expect(scooterApp.stations.Oxford[0]).toBe(newScooter);
    });

    it("console.logs when the scooter is docked", () => {
      expect(logSpy).toHaveBeenCalledWith(`scooter #${newScooter.serial} is docked`);
    });

    it("throws error if scooter is already docked", () => {
      expect(() => {
        scooterApp.dockScooter(newScooter, newScooter.station);
      }).toThrowError(
        `scooter #${newScooter.serial} is already at ${newScooter.station}`
      );
    });

    it("throws error if station is not found", () => {
      expect(() => {
        scooterApp.dockScooter(newScooter, "Deansgate");
      }).toThrowError("no such station");
    });
  });
});
