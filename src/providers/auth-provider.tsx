import { store } from "@/store";
import { Provider } from "react-redux";

interface AuthProviderProps {
	children: React.ReactNode;
}
export default function AuthProvider({ children }: AuthProviderProps) {
	return <Provider store={store}>{children}</Provider>;
}
