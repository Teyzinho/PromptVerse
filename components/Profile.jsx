"use client";

import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";
import Modal from "./Modal";

const Profile = ({ name, desc, data, handleEdit, handleDelete }) => {
  const handleOpenModal = (prompt) => {
    if (prompt) setSelectedPrompt(prompt);
    setIsOpen(!isOpen);
  };

  const [isOpen, setIsOpen] = useState(false);
  const [selectedPrompt, setSelectedPrompt] = useState({});

  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{name} Profile</span>
      </h1>
      <p className="desc text-left">{desc}</p>

      <div className="mt-10 prompt_layout">
        {data.map((post) => (
          <PromptCard
            key={post._id}
            post={post}
            handleEdit={() => handleEdit && handleEdit(post)}
            handleDelete={() => handleDelete && handleDelete(post)}
            handleOpenModal={handleOpenModal}
          />
        ))}
      </div>

      <Modal
        selectedPrompt={selectedPrompt}
        isOpen={isOpen}
        handleCloseModal={handleOpenModal}
        handleEdit={() => handleEdit && handleEdit(selectedPrompt)}
        handleDelete={() => handleDelete && handleDelete(selectedPrompt)}
      />
    </section>
  );
};

export default Profile;
