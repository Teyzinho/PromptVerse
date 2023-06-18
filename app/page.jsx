import Feed from "@components/Feed";

export const Home = () => {
  return (
    <section className="w-full flex-col relative">
      <h1 className="head_text w-full text-center">
        Descubra & Compartilhe
        <br className="max-md:hidden" />
        <span className="blue_gradient text-center">AI-Powered Prompts</span>
      </h1>
      <p className="mt-5 text-lg text-gray-600 sm:text-xl  text-center">
        Seja mais produtivo no trabalho e no dia a dia com os melhores prompts
        de IA!
      </p>

      {/* Feed */}
      <Feed />
    </section>
  );
};

export default Home;
