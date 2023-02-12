class Scooter {
  static nextSerial = 1;

  constructor(station) {
    this.station = station;
    this.user = null; // null if docked
    this.serial = Scooter.nextSerial;
    Scooter.nextSerial++;
    this.charge = 100;
    this.isBroken = false;
  }

  rent() {
    if (this.charge > 20 && !this.isBroken) {
      return true;
    } else {
      if (this.charge <= 20) {
        throw new Error("scooter needs to be charged");
      }
      if (this.isBroken) {
        throw new Error("scooter needs repair");
      }
    }
  }

  dock(station) {
    this.station = station;
    this.user = null;
  }

  async recharge() {
    while (this.charge < 100) {
      await new Promise((resolve) => setTimeout(resolve, 5000));
      if (this.charge <= 90) {
        this.charge = this.charge + 10;
      } else {
        this.charge = 100;
      }

      console.log(`New charge ${this.charge}`);
    }
  }

  async requestRepair() {
    await new Promise((resolve) => setTimeout(resolve, 5000));
    this.isBroken = false;
    console.log("repair completed");
  }
}

module.exports = Scooter;
