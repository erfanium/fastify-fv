module.exports = function generateValidatorCompiler (fv) {
  return ({ schema: _schema }) => {
    let validator
    let schema = _schema
    if (schema.properties) schema = schema.properties // normalize the schema

    try {
      const check = fv.compile(schema)
      validator = (value) => {
        const result = check(value)
        if (result === true) return true
        const message = (result[0] && result[0].message) || 'Validation Error'
        const e = new Error(message)
        e.statusCode = 422
        return { error: e }
      }

      validator.errors = null
    } catch (e) {
      validator = () => true
      validator.errors = e
    }

    return validator
  }
}
