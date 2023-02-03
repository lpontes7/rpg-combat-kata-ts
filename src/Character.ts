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
    character.health -= this.damage;

    if (character.health <= 0)
      character.isAlive = false
  }

  heal(character: Character) {

    if (!character.isAlive)
      throw new Error("Dead characters cannot be healed");

    character.health = this.maxHealingAsPossible(character.health, this.healing)
  }

  maxHealingAsPossible(health: number, healing: number) {
    return Math.min(Math.max(0, health + healing), ENV_HEALTH);
  }
}