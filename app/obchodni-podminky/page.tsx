import fs from "node:fs/promises";
import path from "node:path";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export const metadata = { title: "Obchodní podmínky — pohoda z domova" };

export default async function ObchodniPodminky() {
  const md = await fs.readFile(
    path.join(process.cwd(), "content", "obchodni-podminky.md"),
    "utf8",
  );
  return (
    <article className="mx-auto max-w-3xl px-6 py-16 prose prose-lg">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{md}</ReactMarkdown>
    </article>
  );
}
