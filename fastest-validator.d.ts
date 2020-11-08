import { FastifyPlugin } from 'fastify'

export interface FV {
   compile: (schema: any) => (data: any) => true | any[]
}

declare const fvPlugin: FastifyPlugin<FV>

export default fvPlugin