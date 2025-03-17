import UserPage from "../../views/UserPage/UserPage";
import Recommendations from "./components/Recomendations";

export default function ProfileLayout() {
    return (
        <div className="flex flex-col md:flex-row w-full px-4">
            <div className="w-full">
                <UserPage />
            </div>
            <div className="w-full">
                <Recommendations />
            </div>
        </div>
    );
}