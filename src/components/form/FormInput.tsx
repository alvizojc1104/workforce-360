import React, { InputHTMLAttributes } from "react";
import { Control, FieldValues, Path } from "react-hook-form";
import {
	FormField,
	FormItem,
	FormControl,
	FormMessage,
	FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface GenericInputProps<T extends FieldValues>
	extends InputHTMLAttributes<HTMLInputElement> {
	name: string;
	label?: string;
	control: Control<T>;
	type?: React.HTMLInputTypeAttribute;
	placeholder?: string;
	description?: string;
	disabled?: boolean;
	className?: string;
	accept?: InputHTMLAttributes<HTMLInputElement>["accept"];
}

export function FormInput<T extends FieldValues>({
	name,
	control,
	label,
	type = "text",
	placeholder,
	disabled = false,
	className,
	accept,
}: GenericInputProps<T>) {
	return (
		<FormField
			control={control}
			name={name as Path<T>}
			render={({ field }) => (
				<FormItem>
					<FormLabel>{label}</FormLabel>
					<FormControl>
						<Input
							className={className}
							{...field}
							type={type}
							placeholder={placeholder}
							disabled={disabled}
							accept={accept ? accept : undefined}
						/>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}
