import fs from "node:fs/promises";
import path from "node:path";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export const metadata = { title: "Ochrana osobních údajů — pohoda z domova" };

export default async function Gdpr() {
  const md = await fs.readFile(path.join(process.cwd(), "content", "gdpr.md"), "utf8");
  return (
    <article className="mx-auto max-w-3xl px-6 py-16 prose prose-lg">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{md}</ReactMarkdown>
    </article>
  );
}
