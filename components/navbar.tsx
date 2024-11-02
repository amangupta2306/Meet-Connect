import { SignedIn, UserButton } from "@clerk/nextjs"
import { Menu } from "lucide-react"

export const Navbar =()=>{
    return (
        <section className="fixed z-50 w-full flex items-center justify-between bg-slate-900 px-10 py-5">
            <p className="text-white text-4xl font-semibold">ZOOM</p>
            <div className="flex items-center gap-5">
                <SignedIn>
                    <UserButton/>
                </SignedIn>
                <Menu className="h-7 w-7 text-white cursor-pointer md:hidden "/>
            </div>
        </section>
    )
}