import { Box } from "@mui/system";
import { colors } from "../theme/colors";

import LogoSvg from "../assets/Logo.svg";

export default function Header() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        borderBottom: "1px solid #393939",
        mb: "48px",
        mt: "8px",
      }}
    >
      <Box sx={{ p: "4px", bgcolor: colors.primary, display: "flex" }}>
        <img src={LogoSvg} alt="Logo Marvel" />
      </Box>
    </Box>
  );
}
