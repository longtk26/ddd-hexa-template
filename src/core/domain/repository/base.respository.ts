import { BaseEntity } from '../entities/base.entity';

interface IInputData<T> {
  create: (entity: BaseEntity<T>) => Promise<BaseEntity<T>>;
  update: (id: string, entity: BaseEntity<T>) => Promise<BaseEntity<T>>;
  delete: (id: string) => Promise<string | null>;
  createMany: (entities: BaseEntity<T>[]) => Promise<BaseEntity<T>[]>;
}

interface IOutputData<T> {
  findAll: () => Promise<T[]>;
  findById: (id: string) => Promise<T>;
}

interface ITransactionRepository {
  transaction: <U>(callback: () => Promise<U>) => Promise<U>;
}

interface IBaseRepository<T>
  extends IInputData<T>,
    IOutputData<T>,
    ITransactionRepository {}

export type {
  IInputData,
  IOutputData,
  IBaseRepository,
  ITransactionRepository,
};
