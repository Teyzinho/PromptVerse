"use client";

import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

const PromptCard = ({ post, handleTagClick, handleEdit, handleDelete, handleOpenModal }) => {
  const [copied, setCopied] = useState("");
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();

  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => setCopied(""), 3000);
  };

  const handleProfileClick = () => {
    if (session?.user.id === post.creator._id) {
      return router.push("/profile");
    }

    router.push(`/profile/${post.creator._id}?name=${post.creator.username}`);
  };


  return (
    <div className={"prompt_card"}>
      {/* Profile */}
      <div className="flex justify-between items-start gap-5 ">
        <div
          className="flex justify-start items-center gap-3 cursor-pointer hover:underline decoration-1 w-fit"
          onClick={handleProfileClick}
        >
          <Image
            src={post.creator.image}
            alt="userImg"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />
          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">
              {post.creator.username}
            </h3>
          </div>
        </div>

        <div className="copy_btn" onClick={handleCopy}>
          <Image
            src={
              copied === post.prompt
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            alt="copy-btn"
            width={20}
            height={20}
          />
        </div>
      </div>

      <div 
        className="h-full flex items-center" 
        onClick={() => handleOpenModal && handleOpenModal(post)}
      >
        <h2 className="prompt-title text-center pb-5">{post.title}</h2>
      </div>

      {/* <p className="my-4 font-satoshi text-sm text-gray-700">{post.prompt}</p> */}
      <p
        className="tag"
        onClick={() => handleTagClick && handleTagClick(post.tag)}
      >
        #{post.tag}
      </p>

      {session?.user.id === post.creator._id && pathName === "/profile" && (
        <div className="flex mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
          <p
            className="font-inter text-sm text-green-600 cursor-pointer"
            onClick={handleEdit}
          >
            Editar
          </p>
          <p
            className="font-inter text-sm text-red-600 cursor-pointer"
            onClick={handleDelete}
          >
            Deletar
          </p>
        </div>
      )}
    </div>
  );
};

export default PromptCard;
