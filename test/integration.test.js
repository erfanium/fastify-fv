'use strict'

const t = require('tap')
const fastify = require('fastify')
const FV = require('fastest-validator')
const fastifyFV = require('..')

const fv = new FV()
const test = t.test

test('package exports', (t) => {
  t.plan(1)
  t.isA(fastifyFV, Function)
})

test('validate valid data', async (t) => {
  t.plan(2)

  const app = fastify()
  app.register(fastifyFV, fv)

  app.route({
    method: 'POST',
    url: '/a',
    schema: {
      body: {
        name: 'string',
        age: { type: 'number', min: 18, max: 99 },
        category: 'string[]'
      }
    },
    async handler (req) {
      t.deepEqual(req.body, { name: 'erfan', age: 19, category: ['dev'] })
      return 'ok'
    }
  })

  const result = await app.inject({
    method: 'POST',
    path: '/a',
    body: { name: 'erfan', age: 19, category: ['dev'] }
  })

  t.equal(result.body, 'ok')
})

test('validate valid invalid', async (t) => {
  t.plan(2)

  const app = fastify()
  app.register(fastifyFV, fv)

  app.route({
    method: 'POST',
    url: '/b',
    schema: {
      body: {
        name: 'string',
        age: { type: 'number', min: 18, max: 99 },
        category: 'string[]'
      }
    },
    async handler (req) {
      return 'ok'
    }
  })

  const result = await app.inject({
    method: 'POST',
    path: '/b',
    body: { name: 'erfan', age: 19, category: 'dev' }
  })

  t.equal(result.statusCode, 400)
  t.deepEqual(JSON.parse(result.body), { statusCode: 400, error: 'Bad Request', message: "body The 'category' field must be an array." })
})
