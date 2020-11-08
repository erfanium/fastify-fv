import fastify from 'fastify'
import FV from 'fastest-validator'
import fvPlugin from './fastest-validator'

const app = fastify()
const fv = new FV()

app.register(fvPlugin, fv)