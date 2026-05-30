import React from 'react'
import Link from "next/link";
import Image from "next/image";
import logo from "@/public/logo.png"

function Footer() {
  return (
    <div>
       {/* Footer */}
      <footer style={{ background: "#0D0D0D", borderTop: "4px solid #F5C518" }}>
        <div className="max-w-7xl mx-auto px-4 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
          
            <Link href="/" className="flex items-center gap-2 flex-shrink-0">
          <Image src={logo} alt="Logo" className="w-16 h-10 rounded-full" />
          <span className="font-display text-white text-lg font-bold tracking-tight">
            Alausa <span style={{ color: "#F5C518" }}>Directory</span>
          </span>
        </Link>
          
          <div className="flex gap-4 text-sm">
            {["/ministries", "/agencies", "/parastatals", "/contact"].map((href) => (
              <Link key={href} href={href} className="text-gray-400 hover:text-white capitalize">
                {href.replace("/", "")}
              </Link>
            ))}
          </div>
          <p className="text-gray-600 text-xs">© {new Date().getFullYear()} Alausa Directory</p>
        </div>
      </footer>
    </div>
  )
}

export default Footer
