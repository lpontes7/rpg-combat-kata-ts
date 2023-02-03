import { Character } from "./Character";
import { describe, expect, it } from "@jest/globals";

describe("Character", () => {
  it("Should created with 1000 health", () => {
    const character = new Character();
    expect(character.health).toBe(1000);
  });

  it("Should created level 1", () => {
    const character = new Character();
    expect(character.level).toBe(1);
  });

  it("Should created alive", () => {
    const character = new Character();
    expect(character.isAlive).toBe(true);
  });

  it("Should attack another character", () => {
    const character1 = new Character();
    const character2 = new Character();
    expect(() => character1.attack(character2)).not.toThrow();
  });

  it("Should attack hiself", () => {
    const character = new Character();
    expect(() => character.attack(character)).not.toThrow();
  });

  it("Should damage subtracted from health when character is attacked", () => {
    const character1 = new Character();
    const character2 = new Character();
    const earlyHealth = character2.health

    character1.attack(character2)
    expect(character2.health).toBe(earlyHealth - character1.damage)
  });

  it("Should die when health is 0", () => {
    const character1 = new Character();
    const character2 = new Character();

    for (let i = character1.damage; i <= 1000; i += character1.damage) {
      character1.attack(character2)
    }
    expect(character2.isAlive).toBe(false);
  });

  it("Should heal another characters", () => {
    const character = new Character();
    const character2 = new Character();
    expect(() => character.heal(character2)).not.toThrow();
  });

  it("Should healing hiself", () => {
    const character = new Character();
    expect(() => character.heal(character)).not.toThrow();
  });

  it("Should not allow heal dead character", () => {
    const character1 = new Character();
    const character2 = new Character();

    for (let i = character1.damage; i <= 1000; i += character1.damage) {
      character1.attack(character2)
    }

    expect(() => character1.heal(character2)).toThrow();
  });

  it("Should not healing increase health above 1000", () => {
    const character1 = new Character();
    const character2 = new Character();
    character1.heal(character2);
    expect(character2.health).toBe(1000);
  });
});
