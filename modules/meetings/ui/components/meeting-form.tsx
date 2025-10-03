"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useTRPC } from "@/trpc/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { MeetingGetOne } from "../../types";
import { meetingsInsertSchema } from "../../schemas";
import { CommandSelect } from "@/components/command-select";
import { Divide } from "lucide-react";
import { GeneratedAvatar } from "@/components/generated-avatar";
import { NewAgentDialog } from "@/modules/agents/ui/views/components/new-agent-dialog";
interface MeetingFormProps {
	onSuccess?: (id?: string) => void;
	onCancel?: () => void;
	initialValues?: MeetingGetOne;
}
export const MeetingForm = ({
	onSuccess,
	onCancel,
	initialValues,
}: MeetingFormProps) => {
	const [openAgentDialog, setOpenAgentDialog] = useState(false);
	const [agentSearch, setAgentSearch] = useState("");
	const trpc = useTRPC();
	const agents = useQuery(
		trpc.agents.getMany.queryOptions({
			pageSize: 100,
			search: agentSearch,
		})
	);
	const queryClient = useQueryClient();
	const createMeeting = useMutation(
		trpc.meetings.create.mutationOptions({
			onSuccess: async (data) => {
				await queryClient.invalidateQueries(
					trpc.meetings.getMany.queryOptions({})
				);

				onSuccess?.(data.id);
			},
			onError: (error) => {
				toast.error(error.message);
			},
		})
	);

	const updateMeeting = useMutation(
		trpc.meetings.update.mutationOptions({
			onSuccess: async () => {
				await queryClient.invalidateQueries(
					trpc.meetings.getMany.queryOptions({})
				);
				if (initialValues?.id) {
					await queryClient.invalidateQueries(
						trpc.meetings.getOne.queryOptions({ id: initialValues.id })
					);
				}
				onSuccess?.();
			},
			onError: (error) => {
				toast.error(error.message);
			},
		})
	);

	const form = useForm<z.infer<typeof meetingsInsertSchema>>({
		resolver: zodResolver(meetingsInsertSchema),
		defaultValues: {
			name: initialValues?.name ?? "",
			agentId: initialValues?.agentId ?? "",
		},
	});

	const isEdit = !!initialValues?.id;
	const isPending = createMeeting.isPending || updateMeeting.isPending;

	const onSubmit = (values: z.infer<typeof meetingsInsertSchema>) => {
		if (isEdit) {
			updateMeeting.mutate({ ...values, id: initialValues.id });
		} else {
			createMeeting.mutate(values);
		}
	};

	return (
        <>
        <NewAgentDialog
        open={openAgentDialog}
        onOpenChange={setOpenAgentDialog}
        />
		<Form {...form}>
			<form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
				<FormField
					name="name"
					control={form.control}
					render={({ field }) => (
						<FormItem>
							<FormLabel>Name</FormLabel>
							<FormControl>
								<Input placeholder="e.g. Math Meeting" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					name="agentId"
					control={form.control}
					render={({ field }) => (
						<FormItem>
							<FormLabel>Agent</FormLabel>
							<FormControl>
								<CommandSelect
									options={(agents.data?.items ?? []).map((agent) => ({
										id: agent.id,
										value: agent.id,
										children: (
											<div className="flex items-center gap-x-2">
												<GeneratedAvatar
													seed={agent.name}
													variant="botttsNeutral"
													className="border size-6"
												/>
												<span>{agent.name}</span>
											</div>
										),
									}))}
									onSelect={field.onChange}
									onSearch={setAgentSearch}
									value={field.value}
									placeholder="Select an agent"
								/>
							</FormControl>
                            <FormDescription>
                                Not found what you&apos;re looking for?{''}
                                <button className=" cursor-pointer text-primary hover:underline" type="button" onClick={()=>setOpenAgentDialog(true)}>
                                       Create new agent
                                </button>

                            </FormDescription>
							<FormMessage />
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
        </>
	);
};
