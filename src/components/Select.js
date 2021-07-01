import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import sideticket from "../assets/sideticket.png";

const useStyles = makeStyles((theme) => ({
  quantityRoot: {
    color: "#FFF",
    // backgroundColor: "#303039",
    minWidth: 100,
    opacity: 0.6,
    borderRadius: "5px",
    "&:hover": {
      backgroundColor: "#4c4b70",
      borderRadius: "5px",
      opacity: 1,
    },
    "&:focus-within": {
      backgroundColor: "#4c4b70",
      borderRadius: "5px",
      opacity: 1,
    },
    "& .MuiOutlinedInput-notchedOutline": {
      border: "1px solid #4c4b70",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      border: "1px solid #4c4b70",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      border: "1px solid #4c4b70",
      borderRadius: "5px 5px 0 0",
    },
    "& .Mui-disabled": {
      color: "#FFFFFF",
      opacity: 0.6,
    },
    "& .Mui-disabled .MuiOutlinedInput-notchedOutline": {
      border: "1px solid #4c4b70",
    },
  },
  button: {
    display: "block",
    marginTop: theme.spacing(2),
  },
  formControl: {
    // margin: theme.spacing(1),
    minWidth: 100,
  },
  selectRoot: {
    color: "#FFFFFF",
    border: "1px solid #4c4b70",
    textAlign: "top",
  },
  icon: {
    color: "#FFFFFF",
  },
}));

export default function ControlledOpenSelect(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleChange = (event) => {
    if (event.target.value == "USD" || event.target.value == "BNB") {
      props.onChangeFilter(event.target.value);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const { options } = props;

  return (
    <div>
      <FormControl
        className={classes.formControl}
        classes={{ root: classes.quantityRoot }}
      >
        {/* <InputLabel id="demo-controlled-open-select-label">
          Select a Currency
        </InputLabel> */}
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={props.selected}
          onChange={handleChange}
          variant="outlined"
          classes={{
            root: classes.selectRoot,
            icon: classes.icon,
          }}
        >
          {/* <MenuItem value={options[0].name}>
            <em>{options[0].name}</em>
          </MenuItem> */}
          {options.map((option, index) => {
            return (
              <MenuItem value={option.name} key={option.name}>
                <div style={{ display: "flex" }}>
                  <img alt="furc" src={sideticket} style={{ width: "20px" }} />
                  &nbsp;{option.name}
                </div>
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </div>
  );
}
