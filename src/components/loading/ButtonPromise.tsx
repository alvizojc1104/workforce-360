import { Loader2 } from "lucide-react";

export default function ButtonPromise({ isPending }: { isPending: boolean }) {
	return isPending ? <Loader2 className="animate-spin" /> : null;
}
