import LoginPage from '../../views/LoginPage/LoginPage';

export default function LoginLayout() {
    return (
        <div className="flex items-center justify-center p-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl w-full">

                <div className="flex items-center justify-center">
                    <LoginPage />
                </div>

                <div className="hidden lg:flex items-center justify-center">
                    <img
                        className="rounded-4xl object-cover w-full h-full max-h-[570px]"
                        src="/img/comidalogin.jpg"
                        alt="comidalogin"
                    />
                </div>
            </div>
        </div>
    );
}