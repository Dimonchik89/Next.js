import Link from "next/link"
import Head from "next/head"
// import layoutstyle from "../../styles/layout.module.scss";
import classes from "../../styles/layout.module.scss";

const Layout = ({children, title = "Next.js"}) => {
    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name="keyworlds" content="next, react, javascript"/>
                <meta name="description" content="lerning next.js"/>
            </Head>
            <nav className={classes.navigate}>
                <p>
                    <Link href="/">
                        <a>Home</a>
                    </Link>
                </p>
                <p>
                    <Link href="/posts">
                        <a>Posts</a>
                    </Link>
                </p>
                <p>
                    <Link href="/about">
                        <a>About</a>
                    </Link>
                </p>
            </nav>
            <main className={classes.layoutWrapper}>
                {children}
            </main>
        </>
    )
}
export default Layout;