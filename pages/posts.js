import Link from "next/link"
import { useEffect, useState } from "react"
import Layout from "../components/Layout/Layout"

const Posts = ({serverPosts}) => {
    const [posts, setPosts] = useState(serverPosts);

    useEffect(() => {
        async function load() {
            const response = await fetch("https://jsonplaceholder.typicode.com/posts");
            const data = await response.json();
            setPosts(data);
        }
        if(!posts) {
            load()
        }
    }, [])

    if(!posts) {
        return (
            <Layout>
                <p>Loading...</p>
            </Layout>
        )
    }

    return (
        <Layout>
            <h1>Posts Page</h1>
            <ul>
                {posts.map(post => {
                    return (
                        <li key={post.id}>
                            {/* <Link key={post.id} href={`/post/${post.id}`}> */}
                            <Link href={"/post/[id]"} as={`/post/${post.id}`}>
                                <a>{post.title}</a>
                            </Link>
                        </li>
                    )
                })}
            </ul>
        </Layout>
    )
}

export async function getStaticProps({req}) {
    if(!req) {
        return {
            props: {serverPost: null}
        }
    }
    const response = await fetch("https://jsonplaceholder.typicode.com/posts")
    const serverPosts = await response.json();
    return {
        props: {serverPosts}
    }
}

export default Posts