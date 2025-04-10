import { Link } from "react-router-dom"

const ErrorPage = () => {
  return (
    <div className="flex flex-col gap-3 justify-center items-center fixed top-0 left-0 w-full h-screen bg-[#1E1E1E] z-50">
        <h1 className="text-5xl font-semibold">Oops!</h1>
        <p className="text-lg">Something went wrong</p>
        <Link to="/" className="mt-3 relative px-5 py-1 inline-block before:absolute before:-inset-1 before:block before:-skew-y-3 before:bg-orange-500">
            <span className="relative text-white font-bold dark:text-gray-950"> Back to home</span>
        </Link>
    </div>
  )
}

export default ErrorPage