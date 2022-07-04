export default interface UserState {
	uid: string;
	email: string | null;
	error?: string | null;
	isLoading?: boolean;
}
