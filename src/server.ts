import fastify  from "fastify";
import { memoriesRoutes } from "./routes/memories";

 const app = fastify();
 app.register(memoriesRoutes)

 app.listen({
    // O listen e um metodo que recebe um objecto de configuracoes em um objecto. E devolve uma promise 
    // Algo que pode demorar acontecer e concatenar o then() que permite ouvir e depois fazer algo
    port:3333,
 }).then(() =>{
    console.log(" 🚀 HTTP Server running on http://localhost:3333")
 })