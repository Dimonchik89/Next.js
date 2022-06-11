import { NextPageContext } from "next"
import Link from "next/link"
import { useEffect, useState } from "react"
import Layout from "../components/Layout/Layout"
import { MyPost } from "../interfaces/post"

interface PostsPageProps {
    serverPosts: MyPost[]
}

const Posts = ({serverPosts}: PostsPageProps) => {
    const [posts, setPosts] = useState(serverPosts);

    useEffect(() => {
        async function load() {
            const response = await fetch("https://jsonplaceholder.typicode.com/posts");
            const data: MyPost[] = await response.json();
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

export async function getStaticProps({req}: NextPageContext) {
    if(!req) {
        return {
            props: {serverPost: null}
        }
    }
    const response = await fetch("https://jsonplaceholder.typicode.com/posts")
    const serverPosts: MyPost[] = await response.json();
    return {
        props: {serverPosts}
    }
}

export default Posts