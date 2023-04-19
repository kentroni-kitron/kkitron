import { PrimitiveConstructor } from '../constants';

export type ObjectStructureValue = (
  PrimitiveConstructor |
  ObjectStructure |
  Array<PrimitiveConstructor | ObjectStructure>
);

export type ObjectStructureValueWithRequired = ObjectStructureValue | {
  __required: boolean,
  __type: ObjectStructureValue,
};

export type ObjectStructure = {
  [key: string]: ObjectStructureValueWithRequired,
};

const checkPair = (
  structureItem: ObjectStructureValueWithRequired,
  input: unknown
): boolean => {
  if ('__required' in structureItem && '__type' in structureItem) {
    if (!structureItem.__required) {
      if (input === undefined) {
        return true;
      }
    }

    structureItem = structureItem.__type;
  }

  if (structureItem === String) {
    return typeof input === 'string';
  } else if (structureItem === Number) {
    return typeof input === 'number';
  } else if (structureItem === Boolean) {
    return typeof input === 'boolean';
  } else if (
    Array.isArray(structureItem) &&
    Array.isArray(input)
  ) {
    return input.every(item => {
      return checkPair(structureItem[0], item);
    });
  } else if (
    typeof structureItem === 'object' &&
    typeof input === 'object'
  ) {
    return Object.keys(structureItem).every(key => {
      return checkPair(structureItem[key], input[key]);
    });
  }

  return false;
};

/**
 * Validates if a given value matches the expected structure.
 * 
 * @template T - The expected type of the value being validated.
 * @param input - The value to validate.
 * @param structure - The expected structure of the value.
 * @example
 * // Returns true
 * isObject({ name: 'John', age: 30 }, { name: String, age: Number });
 * @example
 * // Strill returns true, as the 'age' value is optional
 * isObject({ name: 'John' }, { name: {}, age: { __required: false, __type: Number } });
 */
export const isObject = <T>(input: unknown, structure: ObjectStructure): input is T => {
  return checkPair(structure, input);
};

/**
 * Creates a typeguard for a specified structure. Use for greater declarativeness.
 * 
 * @template T - The expected type of the value being validated.
 * @param structure - The expected structure of the value.
 * @returns isObject typeguard
 */
export const isObjectGuard = <T>(structure: ObjectStructure) => (input: unknown): input is T => {
  return isObject<T>(input, structure);
};
