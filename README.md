# fastify-fv

Fastify plugin to support fastest-validator

## usage

```js
const fastify = require('fastify')
const FV = require('fastest-validator')
const fvPlugin = require('fastify-fv')

const app = fastify()
const fv = new FV()

app.register(fastifyFV, fv) // register the plugin

app.route({
  method: 'POST',
  url: '/a',
  schema: {
    body: { // fastest-validator schema
      name: 'string',
      age: { type: 'number', min: 18, max: 99 },
      category: 'string[]',
    },
  },
  async handler(req) {
    // code
  },
})

app.listen(3000)
```
