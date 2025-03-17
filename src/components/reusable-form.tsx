import { ZodSchema } from "zod";
import { useForm, SubmitHandler, FieldValues, Path } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ReusableFormProps<T extends FieldValues> {
	schema: ZodSchema<T>;
	fields: Array<{
		name: keyof T;
		label: string;
		type?: string;
		placeholder?: string;
	}>;
	onSubmit: SubmitHandler<T>;
}

export function ReusableForm<T extends FieldValues>({
	schema,
	fields,
	onSubmit,
}: ReusableFormProps<T>) {
	const form = useForm<T>({
		resolver: zodResolver(schema),
	});

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
				{fields.map((field) => (
					<FormField
						key={String(field.name)}
						control={form.control}
						name={field.name as Path<T>}
						render={({ field: formField }) => (
							<FormItem>
								<FormLabel htmlFor={String(field.name)}>
									{field.label}
								</FormLabel>
								<FormControl>
									<Input
										{...formField}
										id={String(field.name)}
										type={field.type || "text"}
										placeholder={field.placeholder || ""}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				))}
				<Button type="submit" className="w-full">
					Submit
				</Button>
			</form>
		</Form>
	);
}
