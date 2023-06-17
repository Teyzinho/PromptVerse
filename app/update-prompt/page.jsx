"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Form from "@components/Form";

const UpdatePrompt = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const promptId = searchParams.get('id');

  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    title:"",
    prompt: "",
    tag: "",
  });

  useEffect(() => {
    const getPrompDetails = async () => {
      const response = await fetch(`/api/prompt/${promptId}`);
      const data = await response.json();

      setPost({
        title: data.title,
        prompt: data.prompt,
        tag: data.tag,
      });
    };

    if(promptId) getPrompDetails()
  }, [promptId]);

  const updatePrompt = async (e) => {
    e.preventDefault(); //previne que a página recarregue
    setSubmitting(true);

    if(!promptId) return alert('Prompt id não encontrado')

    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify({
          title: post.title,
          prompt: post.prompt,
          tag: post.tag,
        }),
      });
      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log("createPrompt error:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form
      type="Editar"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePrompt}
    />
  );
};

export default UpdatePrompt;
