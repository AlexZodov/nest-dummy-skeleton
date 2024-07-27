import { Injectable } from '@nestjs/common';
import { Unit1, Unit1NotFoundError } from '../domain';
import { Unit1Repository } from './interfaces';

type CreateUnit1Options = {
  id: string;
  type: string;
};

type UpdateUnit1Options = CreateUnit1Options;

@Injectable()
export class Unit1Service {
  constructor(private readonly repository: Unit1Repository) {}

  async create(options: CreateUnit1Options): Promise<Unit1> {
    const unit1 = new Unit1();

    unit1.id = options.id;
    unit1.type = options.type;

    return this.repository.save(unit1);
  }

  async update(options: UpdateUnit1Options): Promise<Unit1> {
    const fetchedUnit = await this.getUnitByIdOrNull(options.id);
    let unit;
    if (fetchedUnit) {
      if (options.type) {
        fetchedUnit.type = options.type;
      }
      unit = await this.repository.save(fetchedUnit);
    } else {
      unit = await this.create({
        id: options.id,
        type: options?.type ?? 'type-1',
      });
    }

    return unit;
  }

  async getUnitById(id: string): Promise<Unit1> {
    const user = await this.repository.findOne(id);

    if (!user) {
      throw new Unit1NotFoundError(id);
    }

    return user;
  }

  async getUnitByIdOrNull(id: string): Promise<Unit1 | undefined> {
    return await this.repository.findOne(id);
  }

  async deleteUnitById(id: string): Promise<void> {
    const unit = await this.getUnitById(id);

    await this.repository.delete(unit);
  }
}
