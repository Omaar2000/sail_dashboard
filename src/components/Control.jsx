import { Button, ButtonGroup } from "@mui/material";
import { useTranslation } from "react-i18next";

const Control = () => {
  const { t } = useTranslation();
  return (
    <>
      <ButtonGroup variant="contained" aria-label="Basic button group">
        <Button
          size="small"
          color="success"
          onClick={() => setSelected("Pending")}
        >
          {t("Approve")}
        </Button>
        <Button
          size="small"
          color="primary"
          onClick={() => setSelected("Confirmed")}
        >
          {t("Details")}
        </Button>
        <Button
          size="small"
          color="error"
          onClick={() => setSelected("Finished")}
        >
          {t("Reject")}
        </Button>
      </ButtonGroup>
    </>
  );
};

export default Control;
