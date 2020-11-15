'use strict'

const t = require('tap')
const FV = require('fastest-validator')
const generateValidatorCompiler = require('../src/generateValidatorCompiler')

const fv = new FV()

const test = t.test

test('should generate validator', (t) => {
  t.plan(2)

  const compiler = generateValidatorCompiler(fv)
  const schema = {
    type: 'object',
    properties: {
      foo: 'string[]',
      bar: 'number'
    }
  }

  const validator = compiler({ schema })

  t.strictEqual(typeof validator, 'function')
  t.strictEqual(validator.errors, null)
})

test('handle error when schema is not valid', (t) => {
  t.plan(2)

  const compiler = generateValidatorCompiler(fv)
  const schema = {
    type: 'object',
    properties: {
      foo: 'st',
      bar: 'number'
    }
  }

  const validator = compiler({ schema })

  t.strictEqual(typeof validator, 'function')
  t.isA(validator.errors, Error)
})

test('generate validator and validate valid params', (t) => {
  t.plan(1)

  const compiler = generateValidatorCompiler(fv)
  const schema = {
    type: 'object',
    properties: {
      foo: 'string[]',
      bar: 'number'
    }
  }

  const validator = compiler({ schema })
  const result = validator({ foo: ['a'], bar: 5 })
  t.strictEqual(result, true)
})

test('generate validator and validate invalid params and format errors', (t) => {
  t.plan(3)

  const compiler = generateValidatorCompiler(fv)
  const schema = {
    type: 'object',
    properties: {
      foo: 'string[]',
      bar: 'number'
    }
  }

  const validator = compiler({ schema })
  const result = validator({ foo: 'a', bar: 5 })
  t.isA(result, Object)
  t.isA(result.error, Error)
  t.strictEqual(result.error.statusCode, 422)
})
