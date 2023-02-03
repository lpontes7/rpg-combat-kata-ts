import { Character } from "./character";
import { describe, expect, it } from "@jest/globals";
import { CharacterDistanceType } from './character'

describe("Character", () => {
  //Created
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

  //Attack 

  it("Should attack another character", () => {
    const character1 = new Character();
    const character2 = new Character();
    expect(() => character1.attack(character2)).not.toThrow();
  });

  it("Should not attack hiself", () => {
    const character = new Character();
    expect(() => character.attack(character)).toThrow();
  });

  it("Should damage subtracted from health when character is attacked", () => {
    const character1 = new Character();
    const character2 = new Character();
    const earlyHealth = character2.health

    character1.attack(character2)
    expect(character2.health).toBe(earlyHealth - character1.damage)
  });

  it("Should damage is reduced by 50%", () => {
    const character1 = new Character();
    const character2 = new Character();
    const earlyHealth = character2.health

    character1.level = 1
    character2.level = 6

    character1.attack(character2)

    expect(character2.health).toBe(earlyHealth - (character1.damage - (character1.damage * 50 / 100)));
  });


  it("Should damage is increased by 50%", () => {
    const character1 = new Character();
    const character2 = new Character();
    const earlyHealth = character1.health

    character1.level = 1
    character2.level = 6

    character2.attack(character1)

    expect(character1.health).toBe(earlyHealth - (character2.damage + (character2.damage * 50 / 100)));
  });

  it("Should die when health is 0", () => {
    const character1 = new Character();
    const character2 = new Character();

    for (let i = character1.damage; i <= 1000; i += character1.damage) {
      character1.attack(character2)
    }
    expect(character2.isAlive).toBe(false);
  });

  it("Should attack whit a Character (melee) another Character in initial position", () => {
    const character1 = new Character();
    const character2 = new Character();
    expect(() => character1.attack(character2)).not.toThrow();
  });

  it("Should attack whit a Character (Ranged) another Character in initial position", () => {
    const character1 = new Character();
    character1.typeAndRage = CharacterDistanceType.Ranged

    const character2 = new Character();
    expect(() => character1.attack(character2)).not.toThrow();
  });

  it("Should not attack whit a Character (melee) another Character in far position", () => {
    const character1 = new Character();
    const character2 = new Character();
    character2.position = 500
    expect(() => character1.attack(character2)).toThrow();
  });

  it("Should not attack whit a Character (Ranged) another Character in in far position", () => {
    const character1 = new Character();
    character1.typeAndRage = CharacterDistanceType.Ranged

    const character2 = new Character();
    character2.position = 500
    expect(() => character1.attack(character2)).toThrow();
  });

  it("Should attack whit a Character (melee) another Character in close position and not attack another Character in far position", () => {
    const character1 = new Character();

    const character2 = new Character();
    character2.position = 2

    const character3 = new Character();
    character2.position = 20

    expect(() => character1.attack(character2)).toThrow();
    expect(() => character1.attack(character3)).not.toThrow();
  });

  it("Should attack whit a Character (Ranged) another Character in close position and attack another Character in far position ", () => {
    const character1 = new Character();
    character1.typeAndRage = CharacterDistanceType.Ranged

    const character2 = new Character();
    character2.position = 2

    const character3 = new Character();
    character3.position = 20

    expect(() => character1.attack(character2)).not.toThrow();
    expect(() => character1.attack(character3)).not.toThrow();
  });

  it("Should attack whit a Character (melee) another Character in initial position", () => {
    const character1 = new Character();
    const character2 = new Character();
    expect(() => character1.attack(character2)).not.toThrow();
  });


  //Heal

  it("Should healing hiself", () => {
    const character = new Character();
    expect(() => character.heal()).not.toThrow();
  });

  it("Should not allow heal dead character", () => {
    const character1 = new Character();
    const character2 = new Character();

    for (let i = character1.damage; i <= 1000; i += character1.damage) {
      character1.attack(character2)
    }

    expect(() => character2.heal()).toThrow();
  });

  it("Should not healing increase health above 1000", () => {
    const character1 = new Character();

    character1.heal();
    expect(character1.health).toBe(1000);
  });
});
