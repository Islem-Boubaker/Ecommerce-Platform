import { UserCircle } from "lucide-react";

function LoginIcon() {
    return (
        <div className="cursor-pointer hover:opacity-80 transition-opacity">
            <UserCircle 
                className="w-8 h-8 text-bold text-black hover:text-gray-900" 
                strokeWidth={1.5}
            />
        </div>
    );
}
export default LoginIcon
