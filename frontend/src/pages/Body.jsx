
function Layout({ children }) {
    return (
        <main className="page-wrapper">
            <div className="page-content">
                {children}
            </div>
        </main>
    );
}

export default Layout;