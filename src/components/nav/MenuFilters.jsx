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
      // onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <h2 className="flex items-center justify-center h-24 text-white text-3xl bg-ochre">
        Humblefood
      </h2>
      <List>
        <p className="pl-4 font-semibold">Categorías</p>
        {categories?.map((c, index) => {
          return (
            <div
              key={index}
              className="m-1 pl-4 hover:bg-indigo-600 hover:text-white active:bg-indigo-700"
            >
              <button
                className="ml-2"
                id={index}
                onClick={(e) => handleFilterCategories(e)}
                value={c.name}
                name="categorys"
              >
                {c.name}
              </button>
            </div>
          );
        })}
      </List>
      <Divider />
      <List>
        <p className="pl-4 font-semibold">Descuentos</p>
        {discounts?.map((d, index) => {
          return (
            <div
              key={index}
              className="m-1 pl-4 hover:bg-indigo-600 hover:text-white active:bg-indigo-700"
            >
              <button
                className="ml-2"
                id={index}
                onClick={(e) => handleFilterOffers(e)}
                value={d}
                name="offers"
              >
                {d}%
              </button>
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
