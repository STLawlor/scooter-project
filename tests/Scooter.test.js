const Scooter = require("../src/Scooter");
jest.setTimeout(7000);

describe("Scooter", () => {
  beforeAll(() => {
    scooter1 = new Scooter("Piccadily");
    scooter2 = new Scooter("Oxford");
    logSpy = jest.spyOn(console, "log");
  });

  describe("Scooter constructor", () => {
    it("creates new Scooter instance", () => {
      expect(scooter1).toBeInstanceOf(Scooter);
    });

    it("initialises the station property", () => {
      expect(scooter1.station).toBe("Piccadily");
    });

    it("initialises the user property", () => {
      expect(scooter1.user).toBe(null);
    });

    it("initialises the charge property", () => {
      expect(scooter1.charge).toBe(100);
    });

    it("initialises the isBroken property", () => {
      expect(scooter1.isBroken).toBe(false);
    });

    it("initialises the serialNum property", () => {
      let serialNumType = typeof scooter1.serialNum;
      expect(serialNumType).toBe("number");
    });

    it("increments the nextSerial static property", () => {
      expect(scooter2.serialNum).toBe(scooter1.serialNum + 1);
    });
  });

  describe("rent()", () => {
    it("returns true if scooter is charged and not broken", () => {
      let scooterAvialable = scooter1.rent();
      expect(scooterAvialable).toBe(true);
    });

    it("throws error if scooters charge is below 21", () => {
      scooter1.charge = 20;
      expect(() => {
        scooter1.rent();
      }).toThrowError("scooter needs to be charged");
    });

    it("throws error if scooter is broken", () => {
      scooter1.charge = 100;
      scooter1.isBroken = true;
      expect(() => {
        scooter1.rent();
      }).toThrowError("scooter needs repair");
    });
  });

  describe("dock(station)", () => {
    it("updates the scooters station", () => {
      scooter1.dock("Victoria");
      expect(scooter1.station).toBe("Victoria");
    });

    it("updates the scooters user", () => {
      expect(scooter1.user).toBe(null);
    });
  });

  describe("async recharge()", () => {
    it("updates the scooters charge", async () => {
      scooter1.charge = 90;
      await scooter1.recharge();
      expect(scooter1.charge).toBe(100);
    });

    it("console.logs the new charge", async () => {
      scooter1.charge = 90;
      await scooter1.recharge();
      expect(logSpy).toHaveBeenCalledWith("New charge 100");
    });
  });

  describe("async requestRepair()", () => {
    it("updates the scooter isBroken property", async () => {
      await scooter1.requestRepair();
      expect(scooter1.isBroken).toBe(false);
    });

    it("console.logs when completed", async () => {
      scooter1.isBroken = true;
      await scooter1.requestRepair();
      expect(logSpy).toHaveBeenCalledWith("repair completed");
    });
  });
});
