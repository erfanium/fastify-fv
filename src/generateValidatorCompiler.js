
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
        return { error: result }
      }

      validator.errors = null
    } catch (e) {
      validator = () => true
      validator.errors = e
    }

    return validator
  }
}
