import { Drawer, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useAtom } from "jotai";
import { readingListAtom, ReadingListEntry } from "../api/atoms";

export default function ReadingList(props: ReadingListProps) {
  const { isDrawerOpen, setIsDrawerOpen } = props;
  const [readingList] = useAtom(readingListAtom);

  return (
    <Drawer
      anchor="right"
      open={isDrawerOpen}
      onClose={setIsDrawerOpen.bind(null, false)}
    >
      <Box sx={{ width: "250px" }}>
        <Box sx={{ mb: "16px", borderBottom: "1px solid #1C1B1F" }}>
          <Typography variant="subtitle1" sx={{ margin: "24px 15px" }}>
            Reading List
          </Typography>
        </Box>

        {readingList.map(mapEntryToMarkup)}
      </Box>
    </Drawer>
  );

  function mapEntryToMarkup(readingListEntry: ReadingListEntry) {
    const { id, img, title } = readingListEntry;

    return (
      <Box key={id} sx={{ display: "flex", margin: "24px 16px", gap: "8px" }}>
        <img
          src={img}
          alt="Comics Image"
          style={{ width: "32px", height: "auto" }}
        />
        <Typography variant="subtitle2">{title}</Typography>
      </Box>
    );
  }
}

type ReadingListProps = {
  isDrawerOpen: boolean;
  setIsDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
