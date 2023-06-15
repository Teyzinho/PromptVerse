"use client";

import Link from "next/link"; //Deixa navegar Através de links
import Image from "next/image"; //Otimiza as imagens
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

function Nav() {
  const {data: session} = useSession();

  const [providers, setProviders] = useState(null);
  const [toggleDropDown, setToggleDropDown] = useState(false)

  //get Providers irá deixar logarmos com google e next-Auth
  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();

      setProviders(response);
    };

    setUpProviders();
  }, []);

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/assets/images/logo.svg"
          alt="Logo"
          width={50}
          height={50}
          className="object-contain"
        />
        <p className="logo_text">PromptVerse</p>
      </Link>

      {/* Desktop */}
      <div className="sm:flex hidden">
        {session?.user ? (
          // SingIn
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" className="black_btn">
              Criar Prompt
            </Link>

            <button type="button" onClick={signOut} className="outline_btn">
              Deslogar
            </button>

            <Link href="/profile">
              <Image
                src={session?.user?.image}
                width={40}
                height={40}
                className="rounded-full"
                alt="Profile"
              />
            </Link>
          </div>
        ) : (
          // SingOut
          <>
            {/* Mapeia todos "providers" e cria um botão para cada */}
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  Logar
                </button>
              ))}
          </>
        )}
      </div>

      {/* Mobile */}
      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex">
            <Image
                src={session?.user?.image}
                width={40}
                height={40}
                className="rounded-full cursor-pointer"
                alt="Profile"
                onClick={() => setToggleDropDown((prev) => !prev)}
              />
              {toggleDropDown &&(
                <div className="dropdown">
                  <Link
                    href="/profile"
                    className="dropdown_link"
                    onClick={() => setToggleDropDown(false)}
                  >
                    Perfil
                  </Link>
                  <Link
                    href="/create-prompt"
                    className="dropdown_link"
                    onClick={() => setToggleDropDown(false)}
                  >
                    Criar Prompt
                  </Link>
                  <button
                    type="button"
                    className="mt-5 w-full black_btn"
                    onClick={() => {
                      setToggleDropDown(false);
                      signOut();
                    }}
                  >
                    Deslogar
                  </button>
                </div>
              )}
          </div>
        ):(
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  Logar
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
}

export default Nav;
