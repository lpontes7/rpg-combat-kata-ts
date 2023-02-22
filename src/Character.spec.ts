import { Character } from "./Character";
import { describe, expect, it } from "@jest/globals";
import { Faction } from "./Faction";
import { Prop } from "./Props";

const ENV_HEALTH_MAX = 1000;
const ENV_HEALTH_MIN = 0;
const ENV_LEVEL = 1
const ENV_INITIAL_DAMAGE = 100
const ENV_INITIAL_HEALING = 50
const ENV_INITIAL_POSITION = 0
const ENV_MAX_ID = 1000


let mockCharacterTypeMelee = {
  name: 'Melee',
  distanceRange: 2
}

let mockCharacterTypeRanged = {
  name: 'Ranged',
  distanceRange: 20
}

describe("Character", () => {
  //Created
  it("Should created with 1000 health", () => {
    const character = new Character(mockCharacterTypeMelee);
    expect(character.health).toBe(1000);
  });

  it("Should created level 1", () => {
    const character = new Character(mockCharacterTypeMelee);
    expect(character.level).toBe(1);
  });

  it("Should created alive", () => {
    const character = new Character(mockCharacterTypeMelee);
    expect(character.isAlive).toBe(true);
  });

  it("Should not created with CharacterType Melee with wrong distance", () => {

    const mockCharacterTypeMeleeWrongDistance = {
      name: 'Melee',
      distanceRange: 20
    }

    expect(() => {
      new Character(mockCharacterTypeMeleeWrongDistance)
    }).toThrow()
  })

  it("Should not created with CharacterType Ranged with wrong distance", () => {

    const mockCharacterTypeMeleeWrongDistance = {
      name: 'Ranged',
      distanceRange: 2
    }

    expect(() => {
      new Character(mockCharacterTypeMeleeWrongDistance)
    }).toThrow()
  });

  it("Should not created with CharacterType with wrong name", () => {

    const mockCharacterTypeMeleeWrongName = {
      name: 'Meleee',
      distanceRange: 2
    }

    expect(() => {
      new Character(mockCharacterTypeMeleeWrongName)
    }).toThrow()
  })

  it("Should not created with CharacterType with wrong distance", () => {

    const mockCharacterTypeMeleeWrongName = {
      name: 'Melee',
      distanceRange: 100
    }

    expect(() => {
      new Character(mockCharacterTypeMeleeWrongName)
    }).toThrow()
  })

  //attack

  it("Should attack another character", () => {
    const character1 = new Character(mockCharacterTypeMelee);
    const character2 = new Character(mockCharacterTypeMelee);
    expect(() => character1.attackCharacter(character2)).not.toThrow();
  });

  it("Should not attack hiself", () => {
    const character = new Character(mockCharacterTypeMelee);
    expect(() => character.attackCharacter(character)).toThrow();
  });

  it("Should damage subtracted from health when character is attacked", () => {
    const character1 = new Character(mockCharacterTypeMelee);
    const character2 = new Character(mockCharacterTypeMelee);
    const earlyHealth = character2.health

    character1.attackCharacter(character2)
    expect(character2.health).toBe(earlyHealth - character1.damage)
  });

  it("Should damage is reduced by 50%", () => {
    const character1 = new Character(mockCharacterTypeMelee);
    const character2 = new Character(mockCharacterTypeMelee);
    const earlyHealth = character2.health

    character1.level = 1
    character2.level = 6

    character1.attackCharacter(character2)

    expect(character2.health).toBe(earlyHealth - (character1.damage - (character1.damage * 50 / 100)));
  });


  it("Should damage is increased by 50%", () => {
    const character1 = new Character(mockCharacterTypeMelee);
    const character2 = new Character(mockCharacterTypeMelee);
    const earlyHealth = character1.health

    character1.level = 1
    character2.level = 6

    character2.attackCharacter(character1)

    expect(character1.health).toBe(earlyHealth - (character2.damage + (character2.damage * 50 / 100)));
  });

  it("Should die when health is 0", () => {
    const character1 = new Character(mockCharacterTypeMelee);
    const character2 = new Character(mockCharacterTypeMelee);

    while (character2.isAlive){
      character1.attackCharacter(character2)
    }

    expect(character2.isAlive).toBe(false);
  });

  it("Should attack whit a Character (melee) another Character in initial position", () => {
    const character1 = new Character(mockCharacterTypeMelee);
    const character2 = new Character(mockCharacterTypeMelee);
    expect(() => character1.attackCharacter(character2)).not.toThrow();
  });

  it("Should attack whit a Character (Ranged) another Character in initial position", () => {
    const character1 = new Character(mockCharacterTypeRanged);

    const character2 = new Character(mockCharacterTypeMelee);
    expect(() => character1.attackCharacter(character2)).not.toThrow();
  });

  it("Should not attack whit a Character (melee) another Character in far position", () => {
    const character1 = new Character(mockCharacterTypeMelee);
    const character2 = new Character(mockCharacterTypeMelee);
    character2.position = 500
    expect(() => character1.attackCharacter(character2)).toThrow();
  });

  it("Should not attack whit a Character (Ranged) another Character in in far position", () => {
    const character1 = new Character(mockCharacterTypeRanged);

    const character2 = new Character(mockCharacterTypeMelee);
    character2.position = 500
    expect(() => character1.attackCharacter(character2)).toThrow();
  });

  it("Should attack whit a Character (melee) another Character in close position and not attack another Character in far position", () => {
    const character1 = new Character(mockCharacterTypeMelee);

    const character2 = new Character(mockCharacterTypeMelee);
    character2.position = 2

    const character3 = new Character(mockCharacterTypeMelee);
    character2.position = 20

    expect(() => character1.attackCharacter(character2)).toThrow();
    expect(() => character1.attackCharacter(character3)).not.toThrow();
  });

  it("Should attack whit a Character (Ranged) another Character in close position and attack another Character in far position ", () => {
    const character1 = new Character(mockCharacterTypeRanged);
    const character2 = new Character(mockCharacterTypeMelee);
    character2.position = 2

    const character3 = new Character(mockCharacterTypeMelee);
    character3.position = 20

    expect(() => character1.attackCharacter(character2)).not.toThrow();
    expect(() => character1.attackCharacter(character3)).not.toThrow();
  });

  it("Should attack whit a Character (melee) another Character in initial position", () => {
    const character1 = new Character(mockCharacterTypeMelee);
    const character2 = new Character(mockCharacterTypeMelee);
    expect(() => character1.attackCharacter(character2)).not.toThrow();
  });

  //Heal

  it("Should healing hiself", () => {
    const character = new Character(mockCharacterTypeMelee);
    expect(() => character.heal(character)).not.toThrow();
  });

  it("Should not have more than the maximum health", () => {
    const character = new Character(mockCharacterTypeMelee);
    character.heal(character)
    
    expect(character.health).toBe(ENV_HEALTH_MAX);
  });

  it("Should not have less than the minimum health", () => {
    const character1 = new Character(mockCharacterTypeMelee);
    const character2 = new Character(mockCharacterTypeMelee);

    while (character1.isAlive){
      character1.attackCharacter(character2)
    }

    expect(character2.health).toBe(ENV_HEALTH_MIN);
  });


  it("Should not allow heal dead character", () => {
    const character1 = new Character(mockCharacterTypeMelee);
    const character2 = new Character(mockCharacterTypeMelee);

    for (let i = character1.damage; i <= 1000; i += character1.damage) {
      character1.attackCharacter(character2)
    }

    expect(() => character2.heal(character2)).toThrow();
  });

  it("Should not healing increase health above 1000", () => {
    const character1 = new Character(mockCharacterTypeMelee);

    character1.heal(character1);
    expect(character1.health).toBe(1000);
  });

  //Faction

  it("Should not belong any faction when character is created ", () => {
    const character1 = new Character(mockCharacterTypeMelee);

    expect(character1.faction.length).toBe(0);
  });

  it("Should join one Faction", () => {
    const character1 = new Character(mockCharacterTypeMelee);

    const faction = new Faction("TROPA")
    faction.addCharacterToFaction(character1)

    expect(character1.faction.length).toBe(1);
    expect(character1.faction[0].name).toBe('TROPA')
  });

  it("Should join one and more Factions", () => {
    const character1 = new Character(mockCharacterTypeMelee);

    const faction1 = new Faction("TROPA")
    const faction2 = new Faction("BONDE")

    faction1.addCharacterToFaction(character1)
    faction2.addCharacterToFaction(character1)

    expect(character1.faction.length).toBe(2);
    expect(character1.faction[0].name).toBe('TROPA')
    expect(character1.faction[1].name).toBe('BONDE')
  });

  it("Should not join a faction that already belongs", () => {
    const character1 = new Character(mockCharacterTypeMelee);

    const faction1 = new Faction("TROPA")
    faction1.addCharacterToFaction(character1)

    expect(() => faction1.addCharacterToFaction(character1)).toThrow();
  });

  it("Should not leave a faction if dosn't belong any", () => {
    const character1 = new Character(mockCharacterTypeMelee);

    const faction1 = new Faction("TROPA")

    expect(() => faction1.leaveFaction(character1)).toThrow();
  });

  it("Should leave a one faction", () => {
    const character1 = new Character(mockCharacterTypeMelee);

    const faction1 = new Faction("TROPA")

    faction1.addCharacterToFaction(character1)
    faction1.leaveFaction(character1)

    expect(character1.faction.length).toBe(0)
  });

  it("Should leave one and more faction", () => {
    const character1 = new Character(mockCharacterTypeMelee);

    const faction1 = new Faction("TROPA")
    const faction2 = new Faction("BONDE")
    const faction3 = new Faction("CRIAS")

    faction1.addCharacterToFaction(character1)
    faction2.addCharacterToFaction(character1)
    faction3.addCharacterToFaction(character1)

    faction1.leaveFaction(character1)
    faction2.leaveFaction(character1)

    expect(character1.faction.length).toBe(1);
    expect(character1.faction[0].name).toBe('CRIAS')
  });

  it("Should be considered allies because belongin to the same faction", () => {
    const character1 = new Character(mockCharacterTypeMelee);
    const character2 = new Character(mockCharacterTypeMelee);

    const faction1 = new Faction("TROPA")

    faction1.addCharacterToFaction(character1)
    faction1.addCharacterToFaction(character2)

    expect(faction1.isAllies(character1, character2)).toBe(true);
    expect(character1.faction[0].name).toBe('TROPA')
    expect(character2.faction[0].name).toBe('TROPA')
  });

  it("Should not be considered allies", () => {
    const character1 = new Character(mockCharacterTypeMelee);
    const character2 = new Character(mockCharacterTypeMelee);

    const faction1 = new Faction("TROPA")

    faction1.addCharacterToFaction(character1)

    expect(faction1.isAllies(character1, character2)).toBe(false);
    expect(character1.faction[0].name).toBe('TROPA')
    expect(character2.faction.length).toBe(0)
  });

  it("Should not be considered allies", () => {
    const character1 = new Character(mockCharacterTypeMelee);
    const character2 = new Character(mockCharacterTypeMelee);

    const faction1 = new Faction("TROPA")

    faction1.addCharacterToFaction(character2)

    expect(faction1.isAllies(character1, character2)).toBe(false);
    expect(character2.faction[0].name).toBe('TROPA')
    expect(character1.faction.length).toBe(0)
  });

  it("Should not deal damage to one another allie", () => {
    const character1 = new Character(mockCharacterTypeMelee);
    const character2 = new Character(mockCharacterTypeMelee);

    const faction1 = new Faction("TROPA")

    faction1.addCharacterToFaction(character1)
    faction1.addCharacterToFaction(character2)

    expect(faction1.isAllies(character1, character2)).toBe(true);
    expect(() => character1.attackCharacter(character2)).toThrow();
  });

  it("Should can heal one allie", () => {
    const character1 = new Character(mockCharacterTypeMelee);
    const character2 = new Character(mockCharacterTypeMelee);

    const faction1 = new Faction("TROPA")

    faction1.addCharacterToFaction(character1)
    faction1.addCharacterToFaction(character2)

    expect(faction1.isAllies(character1, character2)).toBe(true);
    expect(() => character1.heal(character2)).not.toThrow();
  });

  it("Should not can heal someone thats not allie", () => {
    const character1 = new Character(mockCharacterTypeMelee);
    const character2 = new Character(mockCharacterTypeMelee);

    const faction1 = new Faction("TROPA")
    const faction2 = new Faction("BONDE")

    faction1.addCharacterToFaction(character1)
    faction2.addCharacterToFaction(character2)

    expect(faction1.isAllies(character1, character2)).toBe(false);
    expect(() => character1.heal(character2)).toThrow();
  });

  it("Should not can heal someone because don't belongs any faction", () => {
    const character1 = new Character(mockCharacterTypeMelee);
    const character2 = new Character(mockCharacterTypeMelee);

    expect(() => character1.heal(character2)).toThrow();
  });


  //Props
  it("Should attack whit a Character (melee) a one prop in initial position", () => {
    const character1 = new Character(mockCharacterTypeMelee);
    const prop = new Prop('Tree', 2000);
    expect(() => character1.attackProps(prop)).not.toThrow();
  });

  it("Should not attack whit a Character (melee) a one prop in long position", () => {
    const character1 = new Character(mockCharacterTypeMelee);
    const prop = new Prop('Tree', 2000);
    prop.position = 200
    expect(() => character1.attackProps(prop)).toThrow();
  });

  it("Should attack whit a Character (melee) and destroid one prop", () => {
    const character1 = new Character(mockCharacterTypeMelee);
    const prop = new Prop('Tree', 2000);

    while (prop.health > 0) {
      character1.attackProps(prop)
    }

    expect(prop.destroyed).toBe(true);
  });
});
