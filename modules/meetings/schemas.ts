import {z} from "zod"



export const meetingsInsertSchema = z.object({
    name:z.string().min(1,{message:"Name is required"}),
    agentId:z.string().min(1,{message:"Agent is required"}),
});

export const meetingsUpdateSchame = meetingsInsertSchema.extend({
    id:z.string().min(1,{message:'ID is required'}),
})