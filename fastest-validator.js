'use strict'

const fp = require('fastify-plugin')
const generateValidatorCompiler = require('./src/generateValidatorCompiler')

function fVPlugin (fastify, fv, next) {
  const compiler = generateValidatorCompiler(fv)
  fastify.setValidatorCompiler(compiler)
  next()
}

module.exports = fp(fVPlugin, {
  fastify: '3.x',
  name: 'fastify-fv'
})
