
const ENV_HEALTH_MAX = 1000;
const ENV_HEALTH_MIN = 0;
const ENV_LEVEL = 1
const ENV_INITIAL_DAMAGE = 100
const ENV_INITIAL_HEALING = 50
const ENV_INITIAL_POSITION = 0
const ENV_MAX_ID = 1000

export class Prop {
  private _health!: number;
  private _name!: string;
  private _destroyed!: boolean;
  private _position!: number;

  constructor(name: string, health: number) {
    this.name = name;
    this.health = health;
    this.destroyed = false;
    this.position = ENV_INITIAL_POSITION;
  }

  set name(value: string) {
    this._name = value
  }

  get health(): number {
    return this._health;
  }
  set health(value: number) {
    this._health = this.validateIsDestroyed(value)
  }

  get destroyed(): boolean {
    return this._destroyed;
  }
  set destroyed(value: boolean) {
    this._destroyed = value
  }

  get position(): number {
    return this._position;
  }
  set position(value: number) {
    this._position = value
  }

  //validate
  private validateIsDestroyed(health: number) {
    let finalHealth = health
    if (health <= 0) {
      this.destroyed = true
      finalHealth = ENV_HEALTH_MIN
    }
    return (finalHealth)
  }

}