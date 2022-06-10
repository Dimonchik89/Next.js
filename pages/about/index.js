import Layout from "../../components/Layout/Layout"
import Router from "next/router"

const About = () => {
    const handleRoute = () => {
        Router.push("/post/25")
    }

    return (
        <Layout>
            <h1>About Page</h1>
            <button onClick={handleRoute}>Go 25 posts</button>
        </Layout>
    )
}
export default About;