"use client";

import {useState, useEffect} from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import Profile from '@components/Profile';

const MyProfile = () => {
    const router = useRouter();

    const {data:session} = useSession()
    const [posts, setPosts] = useState([])

    useEffect(() => {
        const fetchPost = async () => {
          const response = await fetch(`/api/users/${session?.user.id}/posts`);
          const data = await response.json();
    
          setPosts(data);
        }

        if(session?.user.id)fetchPost();

      }, []); //chama no inicio

    const handleEdit = (post) =>{
        router.push(`/update-prompt?id=${post._id}`)
        console.log("post id:",post.id)
    }

    const handleDelete = async (post) =>{
      const hasConfirmed = confirm("Tem certeza que deseja deletar o Prompt?")

      if(hasConfirmed){
        try {
          await fetch(`/api/prompt/${post._id.toString()}`,{
            method: 'DELETE'
          });

          const filteredPosts = posts.filter((p) => p._id !== post._id)

          setPosts(filteredPosts)
        } catch (error) {
          console.log("erro ao tentar deletar :", error)
        }
      }
    }

  return (
    <Profile
        name="My"
        desc="Bem vindo a sua página de perfil personalizada!"
        data={posts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
    />
  )
}

export default MyProfile;