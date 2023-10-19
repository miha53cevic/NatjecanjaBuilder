import { useAuth0 } from "@auth0/auth0-react";
import AuthRequiredPage from "../../pages/AuthRequired";

export interface Props {
    children: React.ReactNode,
}

function RequireAuth({ children }: Props) {
    const { isLoading, isAuthenticated } = useAuth0();

    if (isLoading) return <p>Učitvanje</p>;
    else if (isAuthenticated) return children;
    else return <AuthRequiredPage />;
}

export default RequireAuth;