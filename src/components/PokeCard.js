import React, { useState, useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { indiPoke, getPokemon } from "../api";
import TextField from "@material-ui/core/TextField";
import Portal from "@material-ui/core/Portal";
import DoneOutlineIcon from "@material-ui/icons/DoneOutline";
import Button from "@material-ui/core/Button";
import Popper from "@material-ui/core/Popper";
import { connect } from "react-redux";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  title: {
    padding: theme.spacing(0),
    textAlign: "center",
    color: theme.palette.text.secondary,
    height: "200px",
    top: "opx",
    objectFit: "cover",
    overflow: "hidden",
  },
}));
const PokeCard = (props) => {
  const container = React.useRef(null);
  const classes = useStyles();
  const [state, setState] = useState({
    url: "",
    correct: false,
    typedValue: "",
    score: "",
  });
  const [anchorEl, setAnchorEl] = React.useState(null);
  useEffect(() => {
    const somefunction = async () => {
      const purl = props.poke;

      if (purl) {
        const url = await indiPoke(purl);
        setState({ url: url });
      }
    };
    somefunction();
  }, [props.poke]);

  const handleChange = (e) => {
    console.log("value", e.target.value);
    if (e.target.value == props.poke.name) {
      setState({ ...state, typedValue: e.target.value });
    }
  };
  const handleClick = (e) => {
    if (state.typedValue == props.poke.name) {
      setState({ ...state, correct: true });
      props.action();
    } else {
      setAnchorEl(anchorEl ? null : e.currentTarget);
    }
  };
  const open = Boolean(anchorEl);
  return (
    <Grid item xs={2.4}>
      <Paper
        className={classes.paper}
        style={{ height: "200px", width: "400px" }}
      >
        <img src={state.url}></img>
        {!state.correct && (
          <TextField
            id="standard-basic"
            label="Guess the pokemon"
            onChange={handleChange}
          />
        )}
        {!state.correct && (
          <Button variant="outlined" onClick={handleClick}>
            POKE GO
          </Button>
        )}
        {!state.correct && (
          <Popper
            id={"simple-popper"}
            open={open}
            anchorEl={anchorEl}
            placement={"left"}
          >
            <div style={{ backgroundColor: "#e57373", height: "20px" }}>
              wrong guess try again
            </div>
          </Popper>
        )}

        {state.correct && (
          <div>
            <DoneOutlineIcon></DoneOutlineIcon>
            <span>correct you got a score! </span>
            <Button variant="outlined">View more about pokemon</Button>
          </div>
        )}
      </Paper>
    </Grid>
  );
};
function mapStateToProps(state, ownProps) {
  return {
    score: state.score,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    action: () => {
      dispatch({ type: "ADD_SCORE", payload: 1 });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PokeCard);
