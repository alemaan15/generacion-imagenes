'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function SidebarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [randomNumber, setRandomNumber] = useState(0)
  useEffect(() => {
    //Generar un número al azar al cargar el componente
    setRandomNumber(Math.floor(Math.random() * 100));
  }, [])
  
  const links = [
    { name: "Generar imágenes", path: "/", icon: "🎨" },
    { name: "Número al azar", path: `/imagen/${randomNumber}`, icon: "🎲" },
    { name: "Repositorio", path: "/gallery", icon: "🖼️" },
  ]

  const pathname = usePathname()

  const isActive = (path: string) => {
    if(!path.includes("imagen")) return pathname === path;
    else return pathname.startsWith(path) || pathname.includes("imagen");
  };
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
