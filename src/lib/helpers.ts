export function writeFullName(
	firstName: string,
	lastName: string,
	suffix: string,
	middleName?: string
) {
	let fullName = [firstName, middleName, lastName].join(" ");
	if (suffix !== "None") {
		fullName += ` ${suffix}`;
	}
	return fullName;
}
