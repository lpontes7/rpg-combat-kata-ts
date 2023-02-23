import { Character } from "./Character";

const ENV_MAX_ID = 1000;

export interface FactionDto {
  name: string;
}

export class Faction {
  private _name!: string;
  private _id!: number;

  constructor(name: string) {
    this.name = name;
    this._id = Math.floor(Math.random() * ENV_MAX_ID);
  }

  get name(): string {
    return this._name;
  }
  set name(value: string) {
    this._name = value;
  }

  get id(): number {
    return this._id;
  }

  //functions
  public isAllies(character: Character, outherCharacter: Character): boolean {
    let response = false;

    if (character.faction.length <= 0) return response;
    if (outherCharacter.faction.length <= 0) return response;

    response = character.faction.some((e) =>
      outherCharacter.faction.includes(e)
    );

    return response;
  }

  public addCharacterToFaction(character: Character): void {
    if (character.faction.includes(this))
      throw new Error("Character already belongs to this faction");

    character.faction.push(this);
  }

  public leaveFaction(character: Character): void {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const faction = this;

    if (character.faction.length <= 0)
      throw new Error("Character need be in one or more faction to leave any");

    character.faction = character.faction.filter(function (element) {
      return element.id !== faction.id;
    });
  }
}
