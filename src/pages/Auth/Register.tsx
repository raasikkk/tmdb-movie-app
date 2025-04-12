import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { createUserWithEmailAndPassword } from "firebase/auth"
import auth from "../../config/firebase"
import { useDispatch } from "react-redux"
import { setUser } from "../../features/authSlice/authSlice"

const Register = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [error, setError] = useState("")

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")
        if (password != confirmPassword) {
            setError("Passwords don't match")
            return;
        }
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)
            dispatch(setUser({
                uid: userCredential.user.uid,
                email: userCredential.user.email,
            }))
            navigate("/")
        } catch (error) {
            console.log("Registration error:", error)
            setError("Registration failed")
        }
    }

  return (
    <div className="w-full container mx-auto px-5 flex justify-center mt-60 text-white">
        <div className="bg-[#2d2c2c] rounded-md shadow-lg w-full lg:w-1/2 flex flex-col gap-2 px-5 py-14 md:px-10">
            <h1 className="text-center text-3xl font-semibold">Register</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                {error && <p>{error}</p>}
                <div>
                    <label 
                        htmlFor="email"
                        className="text-lg"
                    >
                        Email
                    </label>
                    <input 
                        type="email" 
                        id="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-2 border rounded-md p-2 w-full"
                    />
                </div>
                <div>
                    <label 
                        htmlFor="password"
                        className="text-lg"
                    >
                        Password
                    </label>
                    <input 
                        type="password" 
                        id="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="mt-2 border rounded-md p-2 w-full"
                    />
                </div>
                <div>
                    <label 
                        htmlFor="confirm-password"
                        className="text-lg"
                    >
                        Confirm Password
                    </label>
                    <input 
                        type="password" 
                        id="confirm-password"
                        placeholder="Confirm your password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="mt-2 border rounded-md p-2 w-full "
                    />
                </div>

                <div className="flex justify-between flex-wrap gap-2 mt-10">
                    <button type="submit" className="text-start relative block before:absolute before:-inset-1 before:block before:-skew-y-3 before:bg-orange-500 cursor-pointer transition hover:-translate-y-1">
                        <span className="relative p-4 text-white font-bold"> Register</span>
                    </button>
                    <p className="text-center">Already have an account? <Link to="/auth/login" className="text-[#0084FF]">Login here</Link></p>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Register