import Feed from "@components/Feed";

export const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Descubra & Compartilhe
        <br className="max-md:hidden" />
        <span className="blue_gradient text-center">AI-Powered Prompts</span>
      </h1>
      <p className="desc text-center">
        Be more productive at work and in your day-to-day life with the
        industry's best AI prompts
      </p>

      {/* Feed */}
      <Feed />
    </section>
  );
};

export default Home;
