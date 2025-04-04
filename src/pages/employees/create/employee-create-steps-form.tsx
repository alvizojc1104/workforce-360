import { useCreateProfile } from "@/hooks/use-create-profile";
import {
	Stepper,
	StepperIndicator,
	StepperItem,
	StepperSeparator,
	StepperTitle,
	StepperTrigger,
} from "@/components/ui/stepper";
import PersonalInformationForm from "./personal-information-form";
import { FormSelectOption } from "@/components/form/FormSelect";
import AddressForm from "./address-form";
import SubmitForm from "./submit-form";
import AccountSetup from "./account-setup";
const steps = [
	{
		step: 1,
		title: "Account Setup",
	},
	{
		step: 2,
		title: "Personal Information",
	},
	{
		step: 3,
		title: "Contact Information",
	},
	{
		step: 4,
		title: "Submit",
	},
];
export default function EmployeeCreateFormSteps({
	nationalities,
	regions,
}: {
	regions: FormSelectOption[];
	nationalities: FormSelectOption[];
}) {
	const { currentStep, setCurrentStep, setData, data } = useCreateProfile();

	return (
		<div className="px-4">
			<div className="flex flex-col items-start gap-4">
				<div className="w-full max-w-5xl mt-8">
					<Stepper value={currentStep}>
						{steps.map(({ step, title }) => (
							<StepperItem
								key={step}
								step={step}
								className="not-last:flex-1 max-md:items-start"
							>
								<StepperTrigger className="rounded max-md:flex-col">
									<StepperIndicator />
									<div className="text-center md:text-left">
										<StepperTitle>{title}</StepperTitle>
									</div>
								</StepperTrigger>
								{step < steps.length && (
									<StepperSeparator className="max-md:mt-3.5 md:mx-4" />
								)}
							</StepperItem>
						))}
					</Stepper>
				</div>
				<div className="w-full p-4 rounded-md h-fit">
					{currentStep === 1 && <AccountSetup />}
					{currentStep === 2 && (
						<PersonalInformationForm
							data={data || {}}
							setData={setData}
							setCurrentStep={setCurrentStep}
							nationalities={nationalities}
							currentStep={currentStep}
						/>
					)}
					{currentStep === 3 && (
						<AddressForm
							setData={setData}
							setCurrentStep={setCurrentStep}
							regions={regions}
							currentStep={currentStep}
						/>
					)}
					{currentStep === 4 && (
						<SubmitForm
							currentStep={currentStep}
							data={data || {}}
						/>
					)}
				</div>
			</div>
		</div>
	);
}
