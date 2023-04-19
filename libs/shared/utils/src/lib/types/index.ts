export type Primitive = string | number | boolean;

export type MaybeUndefined<T> = T | undefined;
export type MaybeNull<T> = T | null;

export type PrimitiveNullable = MaybeNull<Primitive>;

export type Serializable = MaybeNull<MaybeUndefined<Primitive>> | {
  [key: string]: Serializable | Array<Serializable>
};
