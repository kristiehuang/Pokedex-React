import React, { useState } from "react";
import {
    AppBar, Toolbar, Grid,
    Card, CardMedia, CardContent, CircularProgress, Typography
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import mockData from "./mockData";

const useStyles = makeStyles({
    pokedexContainer: {
        paddingTop: "20px",
        paddingLeft: "50px",
        paddingRight: "50px",
    },
    cardMedia: {
        margin: "auto",
    },
    cardContent: {
        textAlign: "center",
    },
});


function toFirstCharUpper(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
}


const Pokedex = props => {
    const classes = useStyles();
    const { history } = props;
    const [pokemonData, setPokemonData] = useState(mockData);

    function getPokemonCard(pokemonId) {
        console.log(pokemonData[`${pokemonId}`]);
        const { id, name } = pokemonData[`${pokemonId}`];
        const sprite = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
        return (
            <Grid item xs={12} sm={4} key={pokemonId}> {/* responsive - sm for smaller mobile screen sizes */}
                <Card onClick={() => history.push(`/${pokemonId}`)}>
                    <CardMedia
                        className={classes.cardMedia}
                        image={sprite}
                        style={{ width: "130px", height: "130px" }}
                    />
                    <CardContent className={classes.cardContent}>
                        <Typography>{`${id}. ${toFirstCharUpper(name)}`}</Typography>
                    </CardContent>
                </Card>
            </Grid>
        );
    }

    return (
        <>
            <AppBar position="static">
                <Toolbar />
            </AppBar>
            {pokemonData ? (
                <Grid container spacing={2} className={classes.pokedexContainer}>
                    {Object.keys(pokemonData).map((pokemonId) => getPokemonCard(pokemonId))}
                </Grid>
            ) : (
                    <CircularProgress />
                )}

        </>
    )
}

export default Pokedex;