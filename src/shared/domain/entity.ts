export abstract class Entity {
  id: string;

  createdAt: Date;

  constructor(params: Pick<Entity, 'createdAt' | 'id'>) {
    this.id = params.id;
    this.createdAt = params.createdAt;
  }

  static generateId() {
    return crypto.randomUUID();
  }
}

