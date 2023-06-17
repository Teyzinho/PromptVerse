"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Form from "@components/Form";

const CreatePrompt = () => {
  const router = useRouter();
  const {data: session} = useSession();

  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    title:"",
    prompt: "",
    tag: "",
  });

  const createPrompt = async (e) => {
    e.preventDefault(); //previne que a página recarregue
    setSubmitting(true);

    try {
      const response = await fetch("/api/prompt/new", 
      { 
        method: "POST",
        body: JSON.stringify({
          title: post.title,
          prompt: post.prompt,
          userId: session?.user.id,
          tag: post.tag
        })
      });
      if(response.ok){
        router.push('/');
      }

    } catch (error) {
      console.log("createPrompt error:",error);
    } finally{
      setSubmitting(false);
    }
  };

  return (
    <Form
      type="Create"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createPrompt}
    />
  );
};

export default CreatePrompt;
