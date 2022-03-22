import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import FilterListIcon from "@mui/icons-material/FilterList";

export default function MenuFilters({
  handleFilterCategories,
  categories,
  handleFilterOffers,
  discounts,
}) {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      //onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <p className="pl-4 font-semibold">Categorías</p>
        {categories?.map((c, index) => {
          return (
            <div key={index} className="m-1 pl-4">
              <input
                className="mr-2"
                id={index}
                onChange={(e) => handleFilterCategories(e)}
                value={c.name}
                type="checkbox"
              ></input>
              <label for={index}>{c.name}</label>
            </div>
          );
        })}
      </List>
      <Divider />
      <List>
        <p className="pl-4 font-semibold">Descuentos</p>
        {discounts?.map((d, index) => {
          return (
            <div key={index} className="m-1 pl-4">
              <input
                className="mr-2"
                id={index}
                onChange={(e) => handleFilterOffers(e)}
                value={d}
                type="checkbox"
              ></input>
              <label for={index}>{d}%</label>
            </div>
          );
        })}
      </List>
    </Box>
  );

  return (
    <div className="sm:hidden  -mr-3">
      {["left"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>
            {<FilterListIcon />}
          </Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
