import fs from "fs";
import path from "path";
import ReactMarkdown from "react-markdown";

export default function PrivacidadPage() {
  const filePath = path.join(process.cwd(), "src", "content", "politica-de-privacidad.md");
  const fileContent = fs.readFileSync(filePath, "utf8");

  return (
    <main className="prose max-w-3xl mx-auto px-6 py-12">
      <ReactMarkdown>{fileContent}</ReactMarkdown>
    </main>
  );
}
