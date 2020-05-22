import React, { useState, useEffect } from "react";

import { loadPokedata } from "../api";
import { indiPoke, getPokemon } from "../api";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import PokeCard from "./PokeCard";
import Pagination from "@material-ui/lab/Pagination";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { connect } from "react-redux";
import Typography from "@material-ui/core/Typography";

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
const getPokeData = async () => {
  const data = await loadPokedata();

  return data;
};

const PokeDash = (props) => {
  const classes = useStyles();
  const [state, setState] = useState({
    pokeData: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [pokePerPage, setPokePerPage] = useState(6);
  useEffect(async () => {
    const pdata = await getPokeData();
    setState({ pokeData: pdata.results });
  }, []);

  const imageurl = async (pokemon) => {
    let url;
    url = await indiPoke(pokemon);
    return url;
  };
  const handleChange = (event, value) => {
    console.log("value", value);
    setCurrentPage(value);
  };
  //get current poke
  const indexOfLastPoke = currentPage * pokePerPage;
  const indexOfFirstPoke = indexOfLastPoke - pokePerPage;
  const currentPokes = state.pokeData.slice(indexOfFirstPoke, indexOfLastPoke);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <AppBar
          position="static"
          style={{ height: "50px", textAlign: "center" }}
        >
          <Toolbar
            style={{
              textAlign: "center",
              alignContent: "center",
              justifyContent: "center",
            }}
          >
            <p> Your Score {props.score}</p>
          </Toolbar>
        </AppBar>
      </Grid>
      <Grid item xs={12}>
        <Paper className={classes.title}>
          <img
            src="http://www.pngnames.com/files/5/Pokemon-Logo-PNG-Free-Pic.png"
            width="33.33%"
            height="100%"
            style={{}}
          />
        </Paper>
      </Grid>
      {console.log(state.pokeData)}
      {console.log("currentpokes", currentPokes)}
      <Grid item xs={12}>
        <Grid container justify="center" spacing={8}>
          {currentPokes &&
            currentPokes.map((pokemon) => {
              return <PokeCard poke={pokemon} />;
            })}
        </Grid>
      </Grid>
      <Pagination
        count={66}
        color="primary"
        page={currentPage}
        onChange={handleChange}
      />
    </Grid>
  );
};
function mapStateToProps(state, ownProps) {
  return {
    score: state.score,
  };
}

function mapDispatchToProps(dispatch) {}

export default connect(mapStateToProps, mapDispatchToProps)(PokeDash);
