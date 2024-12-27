import React, { useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Toolbar from "./Toolbar";
import "./DraftEditor.css";

const TextEditor = () => {
  const [editorContent, setEditorContent] = useState("");
  const editor = useRef(null);

  const focusEditor = () => {
    if (editor.current) {
      editor.current.focus();
    }
  };

  const handleEditorChange = (content, delta, source, editor) => {
    setEditorContent(content);
    console.log("Raw content:", editor.getContents());
  };

  const modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike"], // Inline styles
      [{ header: [1, 2, 3, false] }], // Header levels
      [{ list: "ordered" }, { list: "bullet" }], // Lists
      [{ script: "sub" }, { script: "super" }], // Subscript/Superscript
      [{ align: [] }], // Text alignment
      ["blockquote", "code-block"], // Block elements
      ["link", "image"], // Media
      ["clean"], // Clear formatting
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "script",
    "align",
    "code-block",
    "link",
    "image",
  ];

  return (
    <div className="editor-wrapper" onClick={focusEditor}>
      <Toolbar />
      <div className="editor-container">
        <ReactQuill
          ref={editor}
          theme="snow"
          placeholder="Write Here"
          value={editorContent}
          onChange={handleEditorChange}
          modules={modules}
          formats={formats}
          style={{ width: "100%", maxWidth: "100%" }}
        />
      </div>
    </div>
  );
};

export default TextEditor;
