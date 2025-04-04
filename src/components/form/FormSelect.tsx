import { Control, FieldValues, Path } from "react-hook-form";
import {
	FormField,
	FormItem,
	FormControl,
	FormMessage,
	FormLabel,
} from "@/components/ui/form";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../ui/select";

export type FormSelectOption = {
	value: string;
	label: string;
};

type FormSelectProps<T extends FieldValues> = {
	name: string;
	label?: string;
	control: Control<T>;
	placeholder: string;
	description?: string;
	disabled?: boolean;
	options: FormSelectOption[];
};

export function FormSelect<T extends FieldValues>({
	name,
	control,
	label,
	placeholder,
	disabled = false,
	options = [],
}: FormSelectProps<T>) {
	return (
		<FormField
			control={control}
			name={name as Path<T>}
			render={({ field }) => (
				<FormItem>
					<FormLabel>{label}</FormLabel>
					<FormControl>
						<Select
							onValueChange={field.onChange}
							defaultValue={field.value}
						>
							<SelectTrigger
								disabled={disabled}
								className="min-w-full"
							>
								<SelectValue placeholder={placeholder} />
							</SelectTrigger>
							<SelectContent>
								{options.map((option) => (
									<SelectItem
										key={option.value}
										value={option.value}
									>
										{option.label}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}
