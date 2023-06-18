import "@styles/globals.css";
import Nav from "@components/Nav";
import Footer from "@components/Footer"
import Provider from "@components/Provider";

export const metadata = {
  title: "PromptVerse",
  description: "Descubra & Compartilhe IA Prompts",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="pt-br">
      <body>
        <Provider>
          <div className="main">
            <div className="gradient" />
          </div>
          <main className="app">
            <Nav />
            {children}
            <Footer />
          </main>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
