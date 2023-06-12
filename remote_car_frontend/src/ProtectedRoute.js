import { Navigate } from "react-router-dom"
import API from "./Api"

export const ProtectedRoute = ({ children, protected_route, admin_route }) => {
    if (!API.IsLoggedIn()) {
        if (protected_route) {
            return <Navigate to="/login" />;
        }
    }
    else {
        const isAdmin = API.IsAdmin();
        if (!protected_route) {
            return isAdmin ? <Navigate to="/admin" /> : <Navigate to="/choose_car" />;
        }
        else {
            if (!(isAdmin === admin_route)) {
                return isAdmin ? <Navigate to="/admin" /> : <Navigate to="/choose_car" />;
            }
        }
    }
    return children;
};