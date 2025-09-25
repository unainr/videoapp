import { ResponsiveDialog } from "@/components/responsive-dialog";
import { NewAgentDialogProps } from "@/types";
import { AgentForm } from "./agent-form";


export const NewAgentDialog = ({open,onOpenChange}:NewAgentDialogProps) => { 
return(
    <ResponsiveDialog
    title="New Agent"
    description="Create a new Agent"
    open={open}
    onOpenChange={onOpenChange}
    >

    <AgentForm
    onSuccess={()=>onOpenChange(false)}
    onCancel={()=>onOpenChange(false)}
    />
    </ResponsiveDialog>
)
 }