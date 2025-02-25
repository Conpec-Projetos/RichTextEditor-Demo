"use client"
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Strike from "@tiptap/extension-strike";
import Heading from "@tiptap/extension-heading";
import Image from "@tiptap/extension-image";
import Document from "@tiptap/extension-document";
import Dropcursor from "@tiptap/extension-dropcursor";
import Paragraph from "@tiptap/extension-paragraph";
import Placeholder from "@tiptap/extension-placeholder";
import Focus from "@tiptap/extension-focus";
import Typography from "@tiptap/extension-typography";
import { Button } from "./ui/button";
import { useEffect } from "react";
import { BoldIcon, CornerUpLeft, CornerUpRight, ImageIcon, ItalicIcon, Ruler, StrikethroughIcon } from "lucide-react"

interface RichTextEditorProps {
  content: string;
}

export default function RichTextEditor({ content }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Typography,
      Focus.configure({ className: 'has-focus',
        mode: 'all',}),   
      Bold,
      Italic,
      Strike,
      Heading.configure({ levels: [1, 2, 3, 4, 5, 6] }),
      Image.extend({
        addAttributes() {
          return {
            src: {},
            style: {
              default: "display: block; margin: 0 auto;",
            },
          };
        },
      }),
      Dropcursor,
      Document,
      Paragraph,
      Placeholder.configure({
        placeholder: "Digite algo..."
      })
    ],
    content: content,
  });

  useEffect(() => {
    for (let i = 0; i < 10; i++) {
      setTimeout(() => {
        console.log(editor?.getHTML());
      }, 6000 * i);
    }
  }, [editor]);

  if (!editor) {
    return <p>Loading editor...</p>;
  }

  const addImage = () => {
    const url = window.prompt("URL");
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  return (
    <div className="p-4 border rounded-xl bg-rose-400 text-black max-w-4xl">
      <div className="mb-2 flex space-x-2 border-b pb-2">
        <Button
          className="px-2 py-1 bg-gray-200 rounded"
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <BoldIcon size={16} />
        </Button>
        <Button
          className="px-2 py-1 bg-gray-200 rounded"
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <ItalicIcon size={16} />
        </Button>
        <Button
          className="px-2 py-1 bg-gray-200 rounded"
          onClick={() => editor.chain().focus().toggleStrike().run()}
        >
          <StrikethroughIcon size={16} />
        </Button>
        {([1, 2, 3, 4, 5, 6] as const).map((level) => (
          <Button
            key={level}
            className="px-2 py-1 bg-gray-200 rounded"
            onClick={() => editor.chain().focus().toggleHeading({ level }).run()}
          >
            H{level}
          </Button>
        ))}
        <Button
          className="px-2 py-1 bg-gray-200 rounded"
          onClick={addImage}
        >
          <ImageIcon size={16} />
        </Button>
        <Button
          className="px-2 py-1 bg-gray-200 rounded"
          onClick={() => editor.chain().focus().setHorizontalRule().run()}>
          <Ruler size={16} />
        </Button>
        <Button
          className="px-2 py-1 bg-gray-200 rounded"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .undo()
              .run()
          }
        >
          <CornerUpLeft size={16} />
        </Button>
        <Button
          className="px-2 py-1 bg-gray-200 rounded"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .redo()
              .run()
          }
        >
          <CornerUpRight size={16} />
        </Button>
      </div>
      <EditorContent
        editor={editor}
        className="p-4 border rounded-md overflow-y-auto max-h-96 focus:outline-none"
        style={{ maxWidth: "100%" }}
        autoFocus={true}
      />
      <Button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
        onClick={() => console.log(editor.getHTML())}
      >
        Save Content
      </Button>
    </div>
  );
}
