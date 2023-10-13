import fastify, { FastifyInstance } from "fastify";
import {z} from 'zod'
import { prisma } from "../lib/prisma"
export async function memoriesRoutes(app: FastifyInstance) {
    app.get('/memories', async () => {
     const memory = await prisma.memory.findMany({
        where:{
            isPublic: true
        }
     })
     return memory.map(memory =>{
        return {
            id: memory.id,
            coverUrl: memory.coverUrl,
            isPublic: memory.isPublic,
            
        }
     })
    })
    // Busca de memorias com base no id e validacao com zod
    app.get('/memories/:id', async (request) =>{
        const paramsSchema = z.object({
            id: z.string().uuid(),
            
        })
        const paramContent = z.object({
            isPublic: z.coerce.string()
            
        })
        
        const {id} = paramsSchema.parse(request.params)
        const memory = await prisma.memory.findUniqueOrThrow({
            where: {

                id: id,
               
            }
        })
        return memory;
    })

// Criacao de memorias
app.post('/memories',async (request) => {
    const bodySchema = z.object({
        content: z.string(),
        coverUrl: z.string(),
        isPublic: z.coerce.boolean().default(false),
    })
    const {content, coverUrl, isPublic} = bodySchema.parse(request.body)
    const memory= await prisma.memory.create({
        data:{
            content,
            coverUrl,
             userId: "8ad997a5-538b-451e-b8ab-22616d30e1ec"
        },
    })
    return memory;

})
app.delete('/memories/:id', async (request) =>{
    const paramsSchema = z.object({
        id: z.string().uuid(),
        
    })
    // aQUI ESTOU PEGANDO REQUEST.PARAMS PASSANDO PRA PARAMSCHEMA E FAZER O ZOD VALIDAR SE SIM ELE VAI RETORNAR O id
    const {id} = paramsSchema.parse(request.params)
    const memory = await prisma.memory.delete({
        where: {
            id: id
        },
    })
    
})
app.put('/memories/:id', async (request) =>{
    const paramsSchema = z.object({
        id: z.string().uuid(),
        
    })
    const bodySchema = z.object({
        content: z.string(),
        coverUrl: z.string(),
        isPublic: z.coerce.boolean().default(false),
    })
    const {id} = paramsSchema.parse(request.params)
    const {content, coverUrl, isPublic} = bodySchema.parse(request.body)
    const memory = await prisma.memory.update({
        where: {
            id,
        },
            data:{
                content, 
                coverUrl,
                isPublic,
            }
    })
    return memory; 
    
})
}