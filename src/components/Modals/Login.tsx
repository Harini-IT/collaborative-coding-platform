import React, {   useState } from "react";
import { authModalState } from "@/atoms/authModalAtom";
import { GoogleAuthProvider, signInWithPopup, GithubAuthProvider, setPersistence, browserLocalPersistence, browserSessionPersistence } from "firebase/auth";
import { FcGoogle } from "react-icons/fc";
import { VscGithub } from "react-icons/vsc";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useSetRecoilState } from "recoil";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/firebase";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

type LoginProps = {};

const Login: React.FC<LoginProps> = () => {
    const setAuthModalState = useSetRecoilState(authModalState);
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    const router = useRouter();
    const googleProvider = new GoogleAuthProvider();
    const githubProvider = new GithubAuthProvider();

    const handleClick = (e:React.MouseEvent<HTMLAnchorElement>) =>  setAuthModalState((prev) => ({ ...prev, type: 'register' }));
    const handlePwd = (e:React.MouseEvent<HTMLAnchorElement>) =>   setAuthModalState((prev) => ({ ...prev, type: 'forgotPassword' }));
  


    const [inputs, setInputs] = useState({ email: '', password: '' });
    const [signInWithEmailAndPassword,  loading, error] = useSignInWithEmailAndPassword(auth);

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!inputs.email || !inputs.password) return toast.error("Please fill all");

        try {
            await setPersistence(auth, rememberMe ? browserLocalPersistence : browserSessionPersistence);
            const user = await signInWithEmailAndPassword(inputs.email, inputs.password);
            if (!user) return;
            toast.success("Login Successful!");
            router.push('/');
        } catch (err: any) {
            toast.error(err.message, { position: "top-center", theme: "dark" });
        }
    };

    const googleSignIn = () => signInWithPopup(auth, googleProvider);
    const gitSignIn = () => signInWithPopup(auth, githubProvider);

    const handleChangeInput = (e:React.ChangeEvent<HTMLInputElement>) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    const handleRememberMeChange = () => {
        setRememberMe((prev) => !prev);
    };


    return (
        <>
            <h1 className="text-white mx-20 font-bold text-2xl">Login</h1>
            <form className="space-y-6 px-6 py-4" onSubmit={handleLogin} autoComplete="on">
                <div>
                    <label htmlFor="email" className="text-sm font-medium block m-2 text-gray-300">
                        Your Email
                    </label>
                    <input
                        onChange={handleChangeInput}
                        type="email"
                        name="email"
                        id="email"
                        autoComplete="username"
                        className="input my-2"
                        placeholder="name@company.com"
                    />
                </div>

                <div>
                    <label htmlFor="password" className="text-sm font-medium block m-2 text-gray-300">
                        Your password
                    </label>
                    <div className="relative">
                        <input
                            onChange={handleChangeInput}
                            type={showPassword ? "text" : "password"}
                            name="password"
                            id="password"
                            autoComplete="current-password"
                            className="input my-2"
                            placeholder="********"
                        />
                        <span
                            className="absolute right-3 top-5 cursor-pointer text-gray-200 pr-5"
                            onClick={togglePasswordVisibility}
                        >
                            {showPassword ? <AiFillEyeInvisible fontSize={'22'} /> : <AiFillEye fontSize={'22'} />}
                        </span>
                    </div>
                </div>

                <div className="flex items-center">
                    <input
                        type="checkbox"
                        id="rememberMe"
                        checked={rememberMe}
                        onChange={handleRememberMeChange}
                        className="mr-2 " style={{transform:'scale(1.5)'}}
                    />
                    <label htmlFor="rememberMe" className="text-md text-gray-300">Remember Me</label>
                </div>

                <button
                    type="submit"
                    className="btn flex "
                >
                    {loading ? "Loading" : "Login"}
                </button>

                <button className="flex w-full justify-end">
                    <a
                        href="#"
                        className="text-sm block text-white hover:underline w-full text-right"
                        onClick={handlePwd}
                    >
                        Forgot Password?
                    </a>
                    
                </button>

                <div className="text-sm font-medium text-gray-500">
                    New User?{" "}
                    <a href="#"
                        className="text-blue-700 hover:underline"
                        onClick={handleClick}>
                        Create Account
                    </a>
                </div>
            </form>

            <div className="w-[90] bg-white m-2 text-dark-layer-2 flex justify-center items-center rounded-lg text-center mt-5">
                <FcGoogle size={"27"} />
                <button onClick={googleSignIn} className="px-5 py-2 font-medium">
                    Login with Google
                </button>
            </div>

            <div className="w-[90] bg-white m-2 text-dark-layer-2 flex justify-center items-center rounded-lg text-center mt-5">
                <VscGithub size={"27"} />
                <button onClick={gitSignIn} className="px-5 py-2 font-medium">
                    Login with GitHub
                </button>
            </div>
        </>
    );
};

export default Login;
