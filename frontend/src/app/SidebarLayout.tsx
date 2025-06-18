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
          <Link href="/" className={`navItem ${isActive("/") ? "active" : ""}`}>
            🎨 {!isCollapsed && "Generar imágenes"}
          </Link>
          <Link href="/random" className={`navItem ${isActive("/random") ? "active" : ""}`}>
            🎲 {!isCollapsed && "Número al azar"}
          </Link>
          <Link href="/gallery" className={`navItem ${isActive("/gallery") ? "active" : ""}`}>
            🖼️ {!isCollapsed && "Repositorio"}
          </Link>
        </nav>
      </aside>

      <main className="content">{children}</main>
    </div>
  );
}
