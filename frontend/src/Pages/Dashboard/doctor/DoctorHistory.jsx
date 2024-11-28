import { useEffect, useState } from "react";
import UserHistoryWrapper from "./Components/DoctorHistory";
import { useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";

export default function DoctHistoriesPage() {
    const { user, getToken } = useContext(AuthContext);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchToken = async () => {
            try {
                const Token = await getToken();
                setToken(Token);
            } catch (error) {
                console.error("Error fetching token:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchToken();
    }, [getToken]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (!user || !token) {
        return (
            <div className="text-center mt-10">
                <h2 className="text-xl font-semibold">Unable to load data</h2>
                <p className="text-gray-600">Please try again later.</p>
            </div>
        );
    }

    return <UserHistoryWrapper userId={user._id} Token={token} />;
}
