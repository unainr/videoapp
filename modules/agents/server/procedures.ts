import { db } from "@/drizzle/db";
import { agents } from "@/drizzle/schema";
import { createTRPCRouter, baseProcedure } from "@/trpc/init";

export const agentsRouter = createTRPCRouter({
  getMany:baseProcedure.query(async()=>{
    const data = await db.select().from(agents)
    return data;
  })  
})
