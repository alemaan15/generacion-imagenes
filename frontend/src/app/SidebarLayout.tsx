'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function SidebarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const links = [
    { name: "Generar imágenes", path: "/", icon: "🎨" },
    { name: "Número al azar", path: "/random", icon: "🎲" },
    { name: "Repositorio", path: "/gallery", icon: "🖼️" },
  ]

  const pathname = usePathname()

  const isActive = (path: string) => pathname === path;
  return (
    <div className="layout">
      <aside className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
        
        <div className="menu-title">
        <h1 className="logo">{!isCollapsed && "IA Tools"}</h1>
        <button
          className="collapseButton"
          onClick={() => setIsCollapsed(!isCollapsed)}
          aria-label="Expandir o contraer menú"
        >
          {isCollapsed ? "➡️" : "⬅️"}
        </button> 
        
        </div>
        <nav className="nav">
          {
            links.map((link)=>{
              return (
                <Link
                  key={link.name}
                  href={link.path}
                  className={`navItem ${isActive(link.path) ? "active" : ""}`}
                >
                  {link.icon} {!isCollapsed && link.name}
                </Link>
              )
            })
          }
        </nav>
      </aside>
      <main className="content">{children}</main>
    </div>
  );
}
