import Link from "next/link"
import Layout from "../components/Layout/Layout"

const Error = () => {
    return (
        <Layout>
            <h1>Error Page</h1>
            <p>Go <Link href="/"><a>home</a></Link> page</p>
        </Layout>
    )
}
export default Error