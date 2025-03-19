/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Controller, Control, FieldValues, Path } from "react-hook-form";
import {
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

type GenericInputProps<T extends FieldValues> = {
	name: string;
	label?: string;
	control: Control<T>;
	defaultValue?: string | number;
	type?: React.HTMLInputTypeAttribute;
	placeholder?: string;
	description?: string;
	disabled?: boolean;
};

export function ReusableInput<T extends FieldValues>({
	name,
	label,
	control,
	defaultValue = "",
	type = "text",
	placeholder,
	description,
	disabled = false,
}: GenericInputProps<T>) {
	return (
		<FormField
			name={name as Path<T>}
			render={() => (
				<FormItem>
					{label && <FormLabel>{label}</FormLabel>}

					<FormControl>
						<Controller
							control={control}
							name={name as Path<T>}
							defaultValue={defaultValue as any}
							render={({ field }) => (
								<Input
									{...field}
									type={type}
									placeholder={placeholder}
									disabled={disabled}
								/>
							)}
						/>
					</FormControl>

					{description && (
						<p className="text-sm text-muted-foreground mt-1">
							{description}
						</p>
					)}

					<FormMessage />
				</FormItem>
			)}
		/>
	);
}
