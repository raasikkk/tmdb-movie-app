import { Instagram, Linkedin, Github } from "lucide-react"
import { Link } from "react-router-dom"


const Footer = () => {
  return (
    <div className="bg-neutral-900 p-5 mt-5 mb-16 md:mb-0">
        <div className="container mx-auto flex justify-between flex-wrap items-center gap-3">
            <p className="text-center ">Build by Zhankeldyuly Rasul - raasikkk</p>
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