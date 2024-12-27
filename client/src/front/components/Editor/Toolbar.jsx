import React from "react";
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import CodeIcon from '@mui/icons-material/Code';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import TextFormatIcon from '@mui/icons-material/TextFormat';

const Toolbar = ({ quillRef }) => {
  const tools = [
    {
      label: "Bold",
      style: "bold",
      icon: <FormatBoldIcon />,
    },
    {
      label: "Italic",
      style: "italic",
      icon: <FormatItalicIcon />,
    },
    {
      label: "Underline",
      style: "underline",
      icon: <FormatUnderlinedIcon />,
    },
    {
      label: "Monospace",
      style: "code",
      icon: <TextFormatIcon />,
    },
    {
      label: "Ordered List",
      style: "ordered",
      icon: <FormatListNumberedIcon />,
    },
    {
      label: "Code Block",
      style: "code-block",
      icon: <CodeIcon />,
    },
    {
      label: "Uppercase",
      style: "uppercase",
      icon: <ExpandMoreIcon />,
    },
    {
      label: "Lowercase",
      style: "lowercase",
      icon: <ExpandLessIcon />,
    },
    {
      label: "Align Left",
      style: { align: "left" },
      icon: <FormatAlignLeftIcon />,
    },
    {
      label: "Align Center",
      style: { align: "center" },
      icon: <FormatAlignCenterIcon />,
    },
    {
      label: "Align Right",
      style: { align: "right" },
      icon: <FormatAlignRightIcon />,
    },
  ];

  const applyStyle = (style) => {
    if (!quillRef || !quillRef.current) return;
    const quill = quillRef.current.getEditor();

    if (typeof style === "string") {
      quill.format(style, !quill.getFormat()[style]);
    } else if (style.align) {
      quill.format("align", style.align);
    }
  };

  return (
    <div className="toolbar-grid">
      {tools.map((item, idx) => (
        <button
          style={{ color: "rgba(0, 0, 0, 0.7)" }}
          key={`${item.label}-${idx}`}
          title={item.label}
          onClick={() => applyStyle(item.style)}
        >
          {item.icon || item.label}
        </button>
      ))}
    </div>
  );
};

export default Toolbar;
