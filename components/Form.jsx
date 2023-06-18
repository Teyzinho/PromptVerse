import Link from "next/link";

const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left">{type} Prompt</h1>
      <p className="desc text-left max-w-md">
        {type} e compartilhe prompts incríveis com o mundo!
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
      >
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Titulo
          </span>

          <input
            value={post.title}
            onChange={(e) => setPost({ ...post, title: e.target.value })}
            placeholder="Titulo"
            required
            className="form_input"
          />
        </label>
        <label >
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Sua Prompt AI
          </span>

          <textarea
            value={post.prompt}
            onChange={(e) => setPost({ ...post, prompt: e.target.value })}
            placeholder="Escreva seu prompt aqui..."
            required
            className="form_textarea"
          />
        </label>
        <label >
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Tag {` `}
            <span className="font-normal">
              (#webdevelopment, #musculação, #ideia)
            </span>
          </span>

          <input
            value={post.tag}
            onChange={(e) => setPost({ ...post, tag: e.target.value })}
            placeholder="tag"
            required
            className="form_input"
          />

          <div className="flex-end mx-3 mb-5 gap-4">
            <Link href="/" className="text-gray-500 text-sm">
              Cancelar
            </Link>

            <button
              type="submit"
              disabled={submitting}
              className="px-5 py-1.5 text-sm bg-primary-blue text-white rounded-full"
            >
              {submitting ? `${type}...` : type}
            </button>
          </div>

        </label>
      </form>
    </section>
  );
};

export default Form;
