import { assign } from '../src/util'

describe('util', () => {
  describe('assign', () => {
    it('should assign multi object', () => {
      let ret = assign({}, {a: 1}, {b: 2, c: 3}, {c: 3})
      expect(ret).toEqual({a: 1, b: 2, c: 3})

      ret = assign({}, ...[{a: 1}, {b: 2, c: 3}, {c: 3}])
      expect(ret).toEqual({a: 1, b: 2, c: 3})
    })
  })
})
