"use client";
import {useState, useEffect} from 'react';
import { useSearchParams } from 'next/navigation';

import Profile from '@components/Profile';

const UserProfile = ({params}) => {
    const searchParams = useSearchParams();
    const userName = searchParams.get('name')
    const id = searchParams.get('id')

    const [posts, setPosts] = useState([])

    useEffect(() => {
        const fetchPost = async () => {
          const response = await fetch(`/api/users/${params.id}/posts`);
          const data = await response.json();
    
          setPosts(data);
        }
        if(params?.id)fetchPost();
      }, []); //chama no inicio

  return (
    <Profile
        name={userName}
        desc={`Bem vindo ao prefil de ${userName}`}
        data={posts}
        handleEdit={() => {}}
        handleDelete={() => {}}
    />
  )
}

export default UserProfile;