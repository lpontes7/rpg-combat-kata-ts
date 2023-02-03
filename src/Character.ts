const ENV_HEALTH = 1000;
const ENV_LEVEL = 1
const ENV_INITIAL_DAMAGE = 100
const ENV_INITIAL_HEALING = 50

export class Character {

  // public pra nao criar get e set, somente isso 
  constructor(
    public health: number = ENV_HEALTH,
    public level: number = ENV_LEVEL,
    public isAlive: boolean = true,
    public damage: number = ENV_INITIAL_DAMAGE,
    public healing: number = ENV_INITIAL_HEALING,
  ) { }


  attack(character: Character) {

    if (character == this)
      throw new Error("A Character cannot Deal Damage to itself");

    character.health -= this.calculateDamage(this, character)

    if (character.health <= 0)
      character.isAlive = false
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

}