import { FaGoogle } from "react-icons/fa6";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import app from "../firebase";

const OAuth = () => {
    const handleGoogleAuth = async () => {
        const auth = getAuth(app);
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({ prompt: "select_account" });
        try {
            const resultFromGoogle = await signInWithPopup(auth, provider);
            console.log(resultFromGoogle);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <button
            className="flex items-center justify-center gap-4 bg-primaryBlue rounded-md text-white py-2 px-3"
            onClick={handleGoogleAuth}
        >
            <FaGoogle />
            Continue with Google
        </button>
    );
};
export default OAuth;
