import React from "react";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="flex mt-10 pt-5 justify-around w-full flex-wrap gap-7 border-t-2 border-gray-500 border-solid">
      
      <div>
        <div className="flex gap-0">
          <Image
            src="/assets/images/logo.svg"
            alt="logo"
            width={40}
            height={40}
          />
          <Image
            src="/assets/images/logo-text.svg"
            alt="logo"
            width={200}
            height={200}
          />
        </div>

        <p>Descrição sobre</p>
      </div>

      {/* Links */}
      <div className="footer-links">
        <h2>Links</h2>
        <p>Home</p>
        <p>Sobre</p>
        <p>características</p>
      </div>

      {/* Plataformas */}
      <div className="footer-links">
        <h2>Plataformas</h2>
        <p>ChatGpt Prompts</p>
        <p>Bard Prompts</p>
        <p>Bing Prompts</p>
        <p>Notion Ia Promps</p>
      </div>

      {/* Contatos */}
      <div className="footer-links">
        <h2>Contato</h2>
        <p>
          <Image
            src="/assets/icons/twitter.svg"
            alt="logo"
            width={25}
            height={25}
          />
          Twitter
        </p>
        <p>
          <Image
            src="/assets/icons/instagram.svg"
            alt="logo"
            width={25}
            height={25}
          />
          Insatagram
        </p>
        <p>
          <Image
            src="/assets/icons/discord.svg"
            alt="logo"
            width={25}
            height={25}
          />
          Discord
        </p>
      </div>
    </footer>
  );
};

export default Footer;
