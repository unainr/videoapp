import React from "react";
import { GeneratedAvatar } from "@/components/generated-avatar";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { agentsInsertSchema } from "@/modules/agents/schemas";
import { AgentGetOne } from "@/modules/agents/types";
import { useTRPC } from "@/trpc/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
interface AgentFormProps {
	onSuccess?: () => void;
	onCancel?: () => void;
	initialValues?: AgentGetOne;
}
export const AgentForm = ({
	onSuccess,
	onCancel,
	initialValues,
}: AgentFormProps) => {
	const trpc = useTRPC();
	const queryClient = useQueryClient();
	const createAgent = useMutation(
		trpc.agents.create.mutationOptions({
			onSuccess: async () => {
               await queryClient.invalidateQueries(
                    trpc.agents.getMany.queryOptions({}),
                )
               
                onSuccess?.()
            },
			onError: (error) => {
                toast.error(error.message)
            },
		})
	);

const updateAgent = useMutation(
		trpc.agents.update.mutationOptions({
			onSuccess: async () => {
               await queryClient.invalidateQueries(
                    trpc.agents.getMany.queryOptions({}),
                )
                if(initialValues?.id){
                   await queryClient.invalidateQueries(
                        trpc.agents.getOne.queryOptions({id:initialValues.id})
                    )
                }
                onSuccess?.()
            },
			onError: (error) => {
                toast.error(error.message)
            },
		})
	);


	const form = useForm<z.infer<typeof agentsInsertSchema>>({
		resolver: zodResolver(agentsInsertSchema),
		defaultValues: {
			name: initialValues?.name ?? "",
			instructions: initialValues?.instructions ?? "",
		},
	});

	const isEdit = !!initialValues?.id;
	const isPending = createAgent.isPending || updateAgent.isPending;

	const onSubmit = (values: z.infer<typeof agentsInsertSchema>) => {
		if (isEdit) {
			updateAgent.mutate({...values,id:initialValues.id});
		} else {
			createAgent.mutate(values);
		}
	};

	return (
		<Form {...form}>
			<form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
				<GeneratedAvatar
					seed={form.watch("name")}
					variant="botttsNeutral"
					className="border size-16"
				/>

				<FormField
					name="name"
					control={form.control}
					render={({ field }) => (
						<FormItem>
							<FormLabel>Name</FormLabel>
							<FormControl>
								<Input placeholder="e.g. Math tutor" {...field} />
							</FormControl>
                            <FormMessage/>
						</FormItem>
					)}
				/>

				<FormField
					name="instructions"
					control={form.control}
					render={({ field }) => (
						<FormItem>
							<FormLabel>Instructions</FormLabel>
							<FormControl>
								<Textarea
									placeholder="Answer questions and help with assignments"
									{...field}
								/>
							</FormControl>
                            <FormMessage/>
						</FormItem>
					)}
				/>
				<div className="flex justify-between gap-x-2 ">
					{onCancel && (
						<Button
							variant={"ghost"}
							disabled={isPending}
							type="button"
							onClick={() => onCancel()}>
							Cancel
						</Button>
					)}

				<Button disabled={isPending} type="submit">
					{isEdit ? "Update" : "Create"}
				</Button>
				</div>
			</form>
		</Form>
	);
};
