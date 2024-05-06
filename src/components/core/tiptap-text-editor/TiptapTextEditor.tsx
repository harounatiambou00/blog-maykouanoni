import { Divider, MenuItem, Select } from "@mui/material";
import {
  Editor,
  EditorContent,
  EditorProvider,
  useCurrentEditor,
  useEditor,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React from "react";
import { AiOutlineBold, AiOutlineRedo, AiOutlineUndo } from "react-icons/ai";
import {
  BsCode,
  BsTypeBold,
  BsTypeItalic,
  BsTypeStrikethrough,
  BsTypeUnderline,
} from "react-icons/bs";
import {
  MdFormatAlignCenter,
  MdFormatAlignJustify,
  MdFormatAlignLeft,
  MdFormatAlignRight,
  MdFormatListBulleted,
  MdFormatListNumbered,
  MdOutlineFormatQuote,
  MdOutlineUndo,
  MdRedo,
  MdUndo,
} from "react-icons/md";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";

type MenuBarProps = {
  editor: Editor | null;
};
const MenuBar = ({ editor }: MenuBarProps) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="w-full bg-white flex items-center px-5 py-2 border-2 rounded-t-md border-gray-900 ">
      <div
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().undo().run();
        }}
        className="p-2 rounded-md hover:bg-green-100 hover:text-primary cursor-pointer"
      >
        <MdUndo className="text-lg" />
      </div>
      <div
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().redo().run();
        }}
        className="p-2 rounded-md hover:bg-green-100 hover:text-primary ml-1 cursor-pointer"
      >
        <MdRedo className="text-lg" />
      </div>
      <hr className="my-2 rotate-90 w-6 bg-black bg-opacity-90 text-black" />
      <Select
        className="border-none outline-none font-rubik"
        inputProps={{ sx: { border: 0 } }}
        value="h1"
        size="small"
        MenuProps={{ disableScrollLock: true }}
      >
        <MenuItem
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleHeading({ level: 1 }).run();
          }}
          className="font-rubik font-bold text-xl"
          value="h1"
        >
          Titre 1
        </MenuItem>
        <MenuItem
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleHeading({ level: 2 }).run();
          }}
          className="font-rubik font-semibold text-lg"
          value="h2"
        >
          Titre 2
        </MenuItem>
        <MenuItem
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleHeading({ level: 3 }).run();
          }}
          className="font-rubik font-medium text-md"
          value="h3"
        >
          Titre 3
        </MenuItem>
        <MenuItem
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleHeading({ level: 4 }).run();
          }}
          className="font-rubik text-base"
        >
          Normal
        </MenuItem>
        <MenuItem
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleHeading({ level: 5 }).run();
          }}
          className="font-rubik ttext-sm font-light"
        >
          Petit
        </MenuItem>
      </Select>
      <hr className="my-2 rotate-90 w-6 bg-black bg-opacity-90 text-black" />
      <div
        className={
          editor.isActive("bold")
            ? "p-2 rounded-md bg-green-100 text-primary cursor-pointer"
            : "p-2 rounded-md hover:bg-green-100 hover:text-primary cursor-pointer"
        }
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleBold().run();
        }}
      >
        <BsTypeBold className="text-lg" />
      </div>
      <div
        className={
          editor.isActive("italic")
            ? "p-2 rounded-md bg-green-100 text-primary cursor-pointer ml-1"
            : "p-2 rounded-md hover:bg-green-100 hover:text-primary cursor-pointer ml-1"
        }
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleItalic().run();
        }}
      >
        <BsTypeItalic className="text-lg" />
      </div>
      <div
        className={
          editor.isActive("underline")
            ? "p-2 rounded-md bg-green-100 text-primary cursor-pointer ml-1"
            : "p-2 rounded-md hover:bg-green-100 hover:text-primary cursor-pointer ml-1"
        }
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleUnderline().run();
        }}
      >
        <BsTypeUnderline className="text-lg" />
      </div>
      <div
        className={
          editor.isActive("strike")
            ? "p-2 rounded-md bg-green-100 text-primary cursor-pointer ml-1"
            : "p-2 rounded-md hover:bg-green-100 hover:text-primary cursor-pointer ml-1"
        }
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleStrike().run();
        }}
      >
        <BsTypeStrikethrough className="text-lg" />
      </div>

      <div
        className={
          editor.isActive("blockquote")
            ? "p-2 rounded-md bg-green-100 text-primary cursor-pointer ml-1"
            : "p-2 rounded-md hover:bg-green-100 hover:text-primary cursor-pointer ml-1"
        }
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleBlockquote().run();
        }}
      >
        <MdOutlineFormatQuote className="text-lg" />
      </div>
      <hr className="my-2 rotate-90 w-6 bg-black bg-opacity-90 text-black" />
      <div
        className={
          editor.isActive({ textAlign: "left" })
            ? "p-2 rounded-md bg-green-100 text-primary cursor-pointer ml-1"
            : "p-2 rounded-md hover:bg-green-100 hover:text-primary cursor-pointer ml-1"
        }
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().setTextAlign("left").run();
        }}
      >
        <MdFormatAlignLeft className="text-lg" />
      </div>
      <div
        className={
          editor.isActive({ textAlign: "center" })
            ? "p-2 rounded-md bg-green-100 text-primary cursor-pointer ml-1"
            : "p-2 rounded-md hover:bg-green-100 hover:text-primary cursor-pointer ml-1"
        }
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().setTextAlign("center").run();
        }}
      >
        <MdFormatAlignCenter className="text-lg" />
      </div>
      <div
        className={
          editor.isActive({ textAlign: "right" })
            ? "p-2 rounded-md bg-green-100 text-primary cursor-pointer ml-1"
            : "p-2 rounded-md hover:bg-green-100 hover:text-primary cursor-pointer ml-1"
        }
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().setTextAlign("right").run();
        }}
      >
        <MdFormatAlignRight className="text-lg" />
      </div>
      <div
        className={
          editor.isActive({ textAlign: "justify" })
            ? "p-2 rounded-md bg-green-100 text-primary cursor-pointer ml-1"
            : "p-2 rounded-md hover:bg-green-100 hover:text-primary cursor-pointer ml-1"
        }
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().setTextAlign("justify").run();
        }}
      >
        <MdFormatAlignJustify className="text-lg" />
      </div>
      <hr className="my-2 rotate-90 w-6 bg-black bg-opacity-90 text-black" />
      <div
        className={
          editor.isActive("bulletList")
            ? "p-2 rounded-md bg-green-100 text-primary cursor-pointer ml-1"
            : "p-2 rounded-md hover:bg-green-100 hover:text-primary cursor-pointer ml-1"
        }
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleBulletList().run();
        }}
      >
        <MdFormatListBulleted className="text-lg" />
      </div>
      <div
        className={
          editor.isActive("orderedList")
            ? "p-2 rounded-md bg-green-100 text-primary cursor-pointer ml-1"
            : "p-2 rounded-md hover:bg-green-100 hover:text-primary cursor-pointer ml-1"
        }
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleOrderedList().run();
        }}
      >
        <MdFormatListNumbered className="text-lg" />
      </div>
    </div>
  );
};

const extensions = [
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
  }),
  Underline,
  TextAlign.configure({
    types: ["heading", "paragraph"],
  }),
];

type Props = {
  content: string;
  setContent: (newContent: string) => void;
};

const TiptapTextEditor = ({ content, setContent }: Props) => {
  const editor = useEditor({
    extensions: extensions,
    editorProps: {
      attributes: {
        class:
          "flex flex-col px-4 py-3 justify-start border-b border-r border-l border-gray-900 text-gray-700 items-start w-full min-h-40 gap-3 font-normal text-[16px] rounded-b-md outline-none",
      },
    },
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
    },
    content: content,
  });
  return (
    <div className="col-span-12 w-full rounded-md ">
      <MenuBar editor={editor} />
      <EditorContent
        editor={editor}
        className="w-full block rounded-b-md"
        style={{ whiteSpace: "pre-line" }}
      />
    </div>
  );
};

export default TiptapTextEditor;
