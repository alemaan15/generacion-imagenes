'use client';

import Link from "next/link";
import { useEffect, useState } from "react";

export default function SidebarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isCollapsed, setIsCollapsed] = useState(false);

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
          <Link href="/" className="navItem">
            🎨 {!isCollapsed && "Generar imágenes"}
          </Link>
          <Link href="/random" className="navItem">
            🎲 {!isCollapsed && "Número al azar"}
          </Link>
          <Link href="/gallery" className="navItem">
            🖼️ {!isCollapsed && "Repositorio"}
          </Link>
        </nav>
      </aside>

      <main className="content">{children}</main>
    </div>
  );
}
