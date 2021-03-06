import React from "react";
import { AppBar, Tabs, Tab } from "@material-ui/core";
import TabPanel from "./TabPanel";
import useStyles from "./styles";
import NameForms from "./NameForms";
import PasswordForms from "./PasswordForms";

const FormEditPage = ({ data }) => {
  const [value, setValue] = React.useState(0);
  function a11yProps(index) {
    return {
      id: `tab-${index}`,
      "aria-controls": `full-width-tabpanel-${index}`,
    };
  }
  const styles = useStyles();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <AppBar component={"span"} position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="форма"
          variant="fullWidth"
          className={styles.tabs}
        >
          <Tab disableRipple label="Имя" {...a11yProps(0)} />
          <Tab disableRipple label="Пароль" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel component={"span"} value={value} index={0}>
        <NameForms data={data} />
      </TabPanel>
      <TabPanel component={"span"} value={value} index={1}>
        <PasswordForms data={data} />
      </TabPanel>
    </>
  );
};

export default FormEditPage;
