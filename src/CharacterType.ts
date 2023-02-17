const ENV_HEALTH_MAX = 1000;
const ENV_HEALTH_MIN = 0;
const ENV_LEVEL = 1
const ENV_INITIAL_DAMAGE = 100
const ENV_INITIAL_HEALING = 50
const ENV_INITIAL_POSITION = 0
const ENV_MAX_ID = 1000

export interface CharacterTypeDto {
  name: string;
  distanceRange: number
}

export enum CharacterTypeDistance {
  Melee = 2,
  Ranged = 20,
}

export enum CharacterTypeName {
  'Melee',
  'Ranged'
}

export class CharacterType {
  private _name!: string;
  private _distanceRange!: number;

  constructor(props: CharacterTypeDto) {
    this.name = props.name;
    this.distanceRange = props.distanceRange;
  }

  get name(): string {
    return this._name;
  }
  set name(value: string) {
    this._name = this.validateTypeName(value)
  }

  get distanceRange(): number {
    return this._distanceRange;
  }
  set distanceRange(value: number) {
    this._distanceRange = this.validateTypeAndDistance(value)
  }


  //validate
  private validateTypeName(inputData: string) {
    const isValid = Object.values(CharacterTypeName).includes(inputData);
    if (!isValid)
      throw new Error("CharactersType name must be 'Melee' or 'Ranged'.");
    return (inputData)
  }

  private validateTypeAndDistance(inputData: number) {
    const isValid = Object.values(CharacterTypeDistance).includes(inputData);
    if (!isValid)
      throw new Error("CharactersType name must be '2 to Melee' or '20 to Ranged'.");

    if (inputData == 2 && this.name != 'Melee')
      throw new Error("CharactersType name must be '2 to Melee' or '20 to Ranged'.");

      if (inputData == 20 && this.name != 'Ranged')
      throw new Error("CharactersType name must be '2 to Melee' or '20 to Ranged'.");

    return inputData;
  }

  //functions
  public targetDistance(characterPosition: number, characterRange: number, targetPosition: number): void | never {
    const distance = Math.abs(characterPosition - targetPosition);
    if (distance > characterRange)
      throw new Error("Characters must be in range to deal damage to a target.");
  }

}