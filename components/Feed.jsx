"use client";

import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";
import Modal from "./Modal";

const PromptCardList = ({ data, handleTagClick, handleOpenModal }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
          handleOpenModal={handleOpenModal}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filterPosts, setFilterPosts] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPrompt, setSelectedPrompt] = useState({});

  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();

      setAllPosts(data);
    };

    fetchPost();
  }, []); //chama no inicio

  const filterPost = (value) => {
    const regex = new RegExp(value, "i"); // 'i' flag for case-insensitive search
    return allPosts.filter(
      (item) =>
        regex.test(item.tag)
    );
  };

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);

    const filteredPost = filterPost(e.target.value);
    setFilterPosts(filteredPost);
  };

  const handleTagClick = (tag) =>{
    setSearchText(tag)


    const filteredPost = filterPost(tag);
    setFilterPosts(filteredPost);
  }

  const handleOpenModal = (prompt) => {
    if(prompt)setSelectedPrompt(prompt)
    setIsOpen(!isOpen);
  }

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Pesquisar prompts"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>
      {searchText ? (
        <PromptCardList data={filterPosts} handleTagClick={handleTagClick} handleOpenModal={handleOpenModal} />
      ) : (
        <PromptCardList data={allPosts} handleTagClick={handleTagClick} handleOpenModal={handleOpenModal}/>
      )}

      <Modal selectedPrompt={selectedPrompt} isOpen={isOpen} handleCloseModal={handleOpenModal}/>
    </section>
  );
};

export default Feed;
