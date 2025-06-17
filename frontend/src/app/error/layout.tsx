export default function Layout({ children} : { children: React.ReactNode }) {
    return (
        <section style={{ padding: '20px', textAlign: 'center' }}>
            Esto es el loyout de error, que se aplica a todas las páginas de error.
            {children}
        </section>
    );
}