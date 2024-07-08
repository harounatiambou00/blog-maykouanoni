import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Button,
  IconButton,
  TextField,
} from "@mui/material";
import React from "react";
import { BsTrash } from "react-icons/bs";
import { MdEdit, MdKeyboardArrowDown } from "react-icons/md";
import { AiOutlineSave } from "react-icons/ai";
import { TiptapTextEditor } from "../../../../../components/core";
import NewsSection from "../../../../../data/NewsSectionType";

type Props = {
  section: NewsSection;
  sections: NewsSection[];
  setSections: React.Dispatch<React.SetStateAction<NewsSection[]>>;
};

const AddedSectionItem = ({ section, sections, setSections }: Props) => {
  const [isOnEdit, setIsOnEdit] = React.useState(false);
  const [newSection, setNewSection] = React.useState(section);
  return (
    <Accordion className={"col-span-12 mt-5"}>
      {!isOnEdit ? (
        <AccordionSummary
          expandIcon={<MdKeyboardArrowDown />}
          aria-controls="panel1-content"
          id="panel1-header"
          className="text-xl font-semibold font-kanit"
        >
          {section.title}
        </AccordionSummary>
      ) : (
        <input
          value={newSection.title}
          onChange={(e) => {
            setNewSection({ ...newSection, title: e.target.value });
          }}
          className="text-2xl font-semibold font-kanit outline-none ml-5 pt-2"
        />
      )}

      <AccordionDetails>
        {!isOnEdit ? (
          <div dangerouslySetInnerHTML={{ __html: section.content }}></div>
        ) : (
          <TiptapTextEditor
            content={newSection.content}
            setContent={(newContent: string) =>
              setNewSection({
                ...newSection,
                content: newContent,
              })
            }
          />
        )}
      </AccordionDetails>
      {isOnEdit ? (
        <AccordionActions>
          <Button
            className="font-playwrite font-normal tracking-normal mr-5"
            variant="outlined"
            color="error"
            size="small"
            onClick={() => {
              setNewSection(section);
              setIsOnEdit(false);
            }}
          >
            Annuler
          </Button>
          <Button
            className="font-playwrite font-normal bg-primary tracking-normal"
            startIcon={<AiOutlineSave />}
            variant="contained"
            size="small"
            onClick={() => {
              setSections(
                sections.map((s) => {
                  if (s.id === section.id) return newSection;
                  else return s;
                })
              );
              setIsOnEdit(false);
            }}
          >
            Enregistrer
          </Button>
        </AccordionActions>
      ) : (
        <AccordionActions>
          <IconButton className="" onClick={() => setIsOnEdit(true)}>
            <MdEdit className="sm:text-5xl lg:text-xl" />
          </IconButton>
          <IconButton
            color="error"
            onClick={() =>
              setSections(sections.filter((s) => s.title !== section.title))
            }
          >
            <BsTrash className="sm:text-5xl lg:text-xl" />
          </IconButton>
        </AccordionActions>
      )}
    </Accordion>
  );
};

export default AddedSectionItem;
