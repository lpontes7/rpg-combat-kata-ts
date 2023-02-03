const ENV_HEALTH = 1000;
const ENV_LEVEL = 1
const ENV_INITIAL_DAMAGE = 100
const ENV_INITIAL_HEALING = 50
const ENV_INITIAL_POSITION = 0

export enum CharacterDistanceType {
  Melee = 2,
  Ranged = 20,
}

export class Character {

  // public pra nao criar get e set, somente isso 
  constructor(
    public health: number = ENV_HEALTH,
    public level: number = ENV_LEVEL,
    public isAlive: boolean = true,
    public damage: number = ENV_INITIAL_DAMAGE,
    public healing: number = ENV_INITIAL_HEALING,
    public position: number = ENV_INITIAL_POSITION,
    public typeAndRage: CharacterDistanceType = CharacterDistanceType.Melee
  ) { }

  attack(target: Character) {

    if (target == this)
      throw new Error("A Character cannot Deal Damage to itself");

    this.targetDistance(target)
    target.health -= this.calculateDamage(this, target)

    if (target.health <= 0)
      target.isAlive = false
  }

  heal() {

    if (!this.isAlive)
      throw new Error("Dead characters cannot be healed");

    this.health = this.maxHealingAsPossible(this.health, this.healing)
  }

  private maxHealingAsPossible(health: number, healing: number) {
    return Math.min(Math.max(0, health + healing), ENV_HEALTH);
  }

  private calculateDamage(attacker: Character, target: Character): number {
    let finalDamage: number = attacker.damage

    if (target.level >= (attacker.level + 5))
      finalDamage -= ((attacker.damage * 50) / 100)

    if (target.level <= (attacker.level - 5))
      finalDamage += ((attacker.damage * 50) / 100)

    return finalDamage
  }

  private targetDistance(target: Character): void | never {
    const distance = Math.abs(this.position - target.position);
    if (distance > this.typeAndRage)
      throw new Error("Characters must be in range to deal damage to a target.");
  }
}