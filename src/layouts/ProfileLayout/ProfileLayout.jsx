import UserPage from "../../views/UserPage/UserPage";
import PublishedReviews from "./components/PublishedReviews";
import { useEffect,  } from "react";

export default function ProfileLayout({onLogout, onUserUpdate, checkTokenValidity}) {

    useEffect(() => {
        checkTokenValidity();
    }, []);



    return (
        <div className="flex flex-col md:flex-row w-full px-4 items-baseline justify-center mb-4">
            <div className="w-full px-4">
                <UserPage  onLogout={onLogout} onUserUpdate={onUserUpdate}/>
            </div>
            <div className="w-full px-4">
                <PublishedReviews/>
            </div>
        </div>
    );
}