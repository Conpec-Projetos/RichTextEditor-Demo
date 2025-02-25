import RichTextEditor from "@/components/RichTextEditor";

export default function Editor() {
    return (
        <div className="h-screen w-screen flex flex-col items-center justify-center">
            <RichTextEditor content={ "" } />
        </div>
    )
}