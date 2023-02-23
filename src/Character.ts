import { CharacterType, CharacterTypeDto } from "./CharacterType";
import { Faction } from "./Faction";
import { Prop } from "./Props";

const ENV_HEALTH_MAX = 1000;
const ENV_HEALTH_MIN = 0;
const ENV_LEVEL = 1;
const ENV_INITIAL_DAMAGE = 100;
const ENV_INITIAL_HEALING = 50;
const ENV_INITIAL_POSITION = 0;

export class Character {
  private _health!: number;
  private _level!: number;
  private _isAlive!: boolean;
  private _damage!: number;
  private _healing!: number;
  private _position!: number;
  private _characterType!: CharacterType;
  private _faction: Faction[] = [];

  constructor(characterType: CharacterTypeDto) {
    this.health = ENV_HEALTH_MAX;
    this.level = ENV_LEVEL;
    this.isAlive = true;
    this.damage = ENV_INITIAL_DAMAGE;
    this.healing = ENV_INITIAL_HEALING;
    this.position = ENV_INITIAL_POSITION;
    this.characterType = new CharacterType(characterType);
  }

  get health(): number {
    return this._health;
  }
  private set health(value: number) {
    this._health = this.maxAndMinHealth(value);
  }

  get level(): number {
    return this._level;
  }
  set level(value: number) {
    this._level = value;
  }

  get isAlive(): boolean {
    return this._isAlive;
  }
  private set isAlive(value: boolean) {
    this._isAlive = value;
  }

  get damage(): number {
    return this._damage;
  }
  private set damage(value: number) {
    this._damage = value;
  }

  get healing(): number {
    return this._healing;
  }
  private set healing(value: number) {
    this._healing = value;
  }

  get position(): number {
    return this._position;
  }
  set position(value: number) {
    this._position = value;
  }

  get characterType(): CharacterType {
    return this._characterType;
  }
  private set characterType(props: CharacterTypeDto) {
    const character = new CharacterType(props);
    this._characterType = character;
  }

  get faction(): Faction[] {
    return this._faction;
  }
  set faction(factions: Faction[]) {
    this._faction = factions;
  }

  attackCharacter(target: Character) {
    if (target == this)
      throw new Error("A Character cannot Deal Damage to itself");

    this.characterType.targetDistance(
      this.position,
      this.characterType.distanceRange,
      target.position
    );

    if (this.faction.length > 0) {
      const allies = this.faction[0].isAllies(this, target);

      if (allies) throw new Error("Allies cannot Deal Damage to one another");
    }

    target.health -= this.calculateDamage(this, target);
  }

  attackProps(target: Prop) {
    this.characterType.targetDistance(
      this.position,
      this.characterType.distanceRange,
      target.position
    );
    target.health -= this.damage;
  }

  heal(healed: Character) {
    if (!this.isAlive) throw new Error("Dead characters cannot be healed");

    if (healed != this) {
      if (healed.faction.length <= 0) {
        throw new Error("A Character can only Heal itself");
      } else {
        const isAllies = healed.faction[0].isAllies(this, healed);
        if (!isAllies) throw new Error("Characters isn't Allies");
      }
    }

    this.health = this.maxHealingAsPossible(this.health, this.healing);
  }

  private calculateDamage(attacker: Character, target: Character): number {
    let finalDamage: number = attacker.damage;

    if (target.level >= attacker.level + 5)
      finalDamage -= (attacker.damage * 50) / 100;

    if (target.level <= attacker.level - 5)
      finalDamage += (attacker.damage * 50) / 100;

    return finalDamage;
  }

  private maxHealingAsPossible(health: number, healing: number) {
    return Math.min(Math.max(0, health + healing), ENV_HEALTH_MAX);
  }

  //validate
  private maxAndMinHealth(value: number) {
    let finalHealh = value;
    if (value <= ENV_HEALTH_MIN) {
      finalHealh = ENV_HEALTH_MIN;
      this.isAlive = false;
    }
    return finalHealh;
  }
}
