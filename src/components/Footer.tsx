import { Instagram, Linkedin, Github } from "lucide-react"
import { Link } from "react-router-dom"


const Footer = () => {
  return (
    <div className="bg-neutral-900 p-5 mt-20 mb-16 md:mb-0 text-white">
        <div className="container mx-auto flex justify-between flex-wrap items-center gap-3">
            <p className="text-center ">
                Built by 
                 <span className="font-semibold"> Zhankeldyuly Rasul </span> 
                 - <span className="relative inline-block before:absolute before:-inset-1 before:block before:-skew-y-3 before:bg-orange-500 hover:scale-105 transition cursor-pointer">
                    <span className="relative text-white font-bold"> raasikkk</span>
                   </span>
            </p>
            
            <div className="flex items-center justify-center gap-3">
                <Link to="https://www.instagram.com/raasikkk/">
                    <Instagram />
                </Link>
                <Link to="https://www.linkedin.com/in/rasul-zhankeldyuly/">
                    <Linkedin />
                </Link>
                <Link to="https://github.com/raasikkk">
                    <Github />
                </Link>
            </div>
        </div>
    </div>
  )
}

export default Footer