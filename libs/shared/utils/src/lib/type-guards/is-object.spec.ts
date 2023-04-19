import {
  isObject,
  isObjectGuard,
} from './is-object';

const object1 = {
  a: 'hello',
  b: 5,
  c: true,
};
const object2 = {
  b: 5,
  c: true,
};
const object3 = {
  a: 'hello',
  b: 5,
  c: {
    e: 'hi',
  },
  d: ['hey', 'howdy'],
  g: {
    h: 'whatsup',
  },
};
const object4 = {
  a: 'hello',
  b: 5,
  c: {
    e: 'hi',
  },
  d: ['hey', 'howdy'],
  f: [7],
};
const structure1 = {
  a: String,
  b: Number,
  c: Boolean,
};
const structure2 = {
  a: { __type: String, __required: false },
  b: Number,
  c: Boolean,
};
const structure3 = {
  a: String,
  b: Number,
  c: {
    e: String,
  },
  d: [String],
  f: { __required: false, __type: String },
  g: { __required: false, __type: { h: String } },
};

describe('sharedUtilsP', () => {
  it('should check simple object structure', () => {
    expect(isObject(object1, structure1)).toStrictEqual(true);
    expect(isObject(object2, structure1)).toStrictEqual(false);
  });

  it ('should create a guard', () => {
    const guard = isObjectGuard(structure1);
    expect(guard(object1)).toStrictEqual(true);
  });

  it('should check optional properties', () => {
    expect(isObject(object2, structure2)).toStrictEqual(true);
  });

  it('should check complex nested structures', () => {
    expect(isObject(object3, structure3)).toStrictEqual(true);
    expect(isObject(object4, structure3)).toStrictEqual(false);
  });
});
