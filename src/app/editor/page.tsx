"use client";
import RichTextEditor from "@/components/RichTextEditor";

export default function Editor() {
    const content = localStorage.getItem('content') || '';

    return (
        <div className="h-screen w-screen flex flex-col items-center justify-center">
            <RichTextEditor content={ content } />
        </div>
    )
}