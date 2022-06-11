import { NextPageContext } from "next";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import { MyPost } from "../../interfaces/post";
import classes from "../../styles/post.module.scss";

interface PostPsgeProps {
    serverPost: MyPost
}

const Post = ({serverPost}: PostPsgeProps) => {
    const [post, setPost] = useState(serverPost);
    const router = useRouter()

    useEffect(() => {
        async function load() {
            const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${router.query.id}`)
            const data = await response.json()
            setPost(data);
        }
        if(!post) {
            load()
        }
    }, [])

    if(!post) {
        return (
            <Layout>
                <p>Loading...</p>
            </Layout>
        )
    }

    return (
        <Layout>
            <h1 className={classes?.title}>{post?.title}</h1>
            <hr/>
            <p>
                {post.body}
            </p>
        </Layout>
    )
}

interface PostNextPageContent extends NextPageContext {
    query: {
        id: string
    }
}

Post.getInitialProps = async ({query, req}: PostNextPageContent) => {
    if(!req) {
        return {serverPost: null}
    }
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${query.id}`)
    const serverPost: MyPost = await response.json();
    return {
        serverPost
    }
}

// export async function getServerSideProps({query, req}) {
//     const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${query.id}`)
//     const serverPost = await response.json()
//     return {props: {serverPost}}
// }

export default Post;