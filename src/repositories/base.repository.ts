import {
  QueryFilter,
  HydratedDocument,
  Model,
  UpdateQuery,
} from 'mongoose';

export class BaseRepository<T extends object> {
  protected readonly model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }

  public async create(data: Partial<T>): Promise<HydratedDocument<T>> {
    return this.model.create(data);
  }

  public async findById(
    id: string,
  ): Promise<HydratedDocument<T> | null> {
    return this.model.findById(id).exec();
  }

  public async findOne(
    filter:  QueryFilter<T>,
  ): Promise<HydratedDocument<T> | null> {
    return this.model.findOne(filter).exec();
  }

  public async findMany(
    filter: QueryFilter<T> = {},
  ): Promise<HydratedDocument<T>[]> {
    return this.model.find(filter).exec();
  }

  public async updateById(
    id: string,
    update: UpdateQuery<T>,
  ): Promise<HydratedDocument<T> | null> {
    return this.model
      .findByIdAndUpdate(id, update, {
        new: true,
        runValidators: true, //runs schema validators during updates.
      })
      .exec();
  }

  public async count(
    filter: QueryFilter<T> = {},
  ): Promise<number> {
    return this.model.countDocuments(filter).exec();
  }
}
