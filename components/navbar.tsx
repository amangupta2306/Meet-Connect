import { SignedIn, UserButton } from "@clerk/nextjs"
import { MobileNav } from "./mobile-nav"

export const Navbar =()=>{
    return (
        <section className="fixed z-50 w-full flex items-center justify-between bg-slate-900 px-5 lg:px-9 py-5">
            <p className="text-white text-3xl font-semibold">Meet Connect</p>
            <div className="flex items-center gap-5">
                <SignedIn>
                    <UserButton/>
                </SignedIn>
                <MobileNav />
            </div>
        </section>
    )
}