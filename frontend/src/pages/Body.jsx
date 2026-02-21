// `children` is a special React prop — whatever you put BETWEEN the opening
// and closing <Layout> tags gets passed in here and rendered inside the wrapper.
// This is React's version of a "slot" in HTML template languages.
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