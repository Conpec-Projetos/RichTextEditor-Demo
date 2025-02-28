"use client";
 import DOMpurify from "dompurify";

export default function Viewer() {
    const content = localStorage.getItem('content') || '';
    const clean = DOMpurify.sanitize(content, { USE_PROFILES: { html: true } });
    
    return (
        <div className='h-screen w-screen flex flex-col justify-center items-center'>
            <div className='max-w-3xl bg-rose-400 text-black p-4 rounded-xl border'>
                <div dangerouslySetInnerHTML={{ __html: clean }} />
            </div>
        </div>
    );
}