"use client";
import parse, {
  domToReact,
  HTMLReactParserOptions,
  Element,
  DOMNode,
} from "html-react-parser";
import { useEffect, useState } from "react";

export default function Viewer() {
  const [content, setContent] = useState<string>("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storage = localStorage.getItem("content");
      if (storage) {
        setContent(storage);
      }
    }
  }, []);

  const options: HTMLReactParserOptions = {
    replace: (node) => {
      if (node.type !== "tag") return;
      const { name, children, attribs } = node as Element;
      if (!name) return;
      if (name === "img") {
        return <img src={attribs.src} alt={attribs.alt} />;
      }
      if (name === "p") {
        return <p>{domToReact(children as DOMNode[])}</p>;
      }
      if (name === "h1") {
        return <h1>{domToReact(children as DOMNode[])}</h1>;
      }
      if (name === "h2") {
        return <h2>{domToReact(children as DOMNode[])}</h2>;
      }
      if (name === "h3") {
        return <h3>{domToReact(children as DOMNode[])}</h3>;
      }
      if (name === "h4") {
        return <h4>{domToReact(children as DOMNode[])}</h4>;
      }
      if (name === "h5") {
        return <h5>{domToReact(children as DOMNode[])}</h5>;
      }
      if (name === "h6") {
        return <h6>{domToReact(children as DOMNode[])}</h6>;
      }
      if (name === "hr") {
        return <hr />;
      }
    },
  };

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      <div className="max-w-3xl bg-rose-400 text-black p-4 rounded-xl border">
        <div className="p-4 border rounded-md overflow-y-auto max-h-96 bg-zinc-200 text-black focus:outline-none max-w-full">
          {parse(content, options)}
        </div>
      </div>
    </div>
  );
}
