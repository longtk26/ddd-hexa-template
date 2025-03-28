import crypto from 'node:crypto';

export interface BaseEntityProps {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface CreateEntityProps<T> {
  id: string;
  props: T;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}

export abstract class BaseEntity<EntityProps extends Record<string, any>> {
  private props: Omit<EntityProps, keyof BaseEntityProps>;
  protected _id: string;
  private _createdAt: Date;
  private _updatedAt: Date;
  private _deletedAt: Date | null;

  constructor({
    id,
    createdAt,
    updatedAt,
    deletedAt,
    props,
  }: CreateEntityProps<Omit<EntityProps, keyof BaseEntityProps>>) {
    this.setId(id || crypto.randomUUID());
    const now = new Date();
    this._createdAt = createdAt || now;
    this._updatedAt = updatedAt || now;
    this._deletedAt = deletedAt || null;
    this.props = props;
    this.validate();
  }

  get id(): string {
    return this._id;
  }

  private setId(id: string) {
    this._id = id;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  get deletedAt(): Date | null {
    return this._deletedAt;
  }

  get isDeleted(): boolean {
    return this._deletedAt !== null;
  }

  set setCreatedAt(createdAt: Date) {
    this._createdAt = createdAt;
  }

  set setUpdatedAt(updatedAt: Date) {
    this._updatedAt = updatedAt;
  }

  set setDeletedAt(deletedAt: Date | null) {
    this._deletedAt = deletedAt;
  }

  public getProps(): Readonly<BaseEntityProps> {
    const privateProps = Object.entries(this)
      .filter(([key]) => key.startsWith('_'))
      .reduce(
        (acc, [key, value]) => ({
          ...acc,
          [key.slice(1)]: value,
        }),
        {},
      );

    return Object.freeze({
      ...this.props,
      ...privateProps,
      id: this._id,
      createdAt: this._createdAt,
      updatedAt: this._updatedAt,
      deletedAt: this._deletedAt,
    }) as Readonly<BaseEntityProps>;
  }

  public toResponse(): EntityProps & BaseEntityProps {
    // props can be nested or object, should flatten it
    const plainProps = Object.entries(this.getProps()).reduce(
      (acc, [key, value]) => {
        if (
          typeof value === 'object' &&
          value !== null &&
          !(value instanceof Date)
        ) {
          const nestedEntries = Object.entries(value).reduce(
            (nestedAcc, [subKey, subValue]) => ({
              ...nestedAcc,
              [`${key}.${subKey}`]: subValue,
            }),
            {},
          );
          return { ...acc, ...nestedEntries };
        }
        return { ...acc, [key]: value };
      },
      {},
    );

    return {
      id: this._id,
      createdAt: this._createdAt,
      updatedAt: this._updatedAt,
      deletedAt: this._deletedAt,
      ...plainProps,
    } as EntityProps & BaseEntityProps;
  }

  public abstract validate(): void;

  public abstract resetEntity(entity: EntityProps): BaseEntity<EntityProps>;
}
