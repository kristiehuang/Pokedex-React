import React, { useState, useEffect } from "react";
import {
    AppBar, Toolbar, Grid, Link,
    Card, CardMedia, CardContent, CircularProgress, Typography, TextField
} from "@material-ui/core";
import { makeStyles, fade } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import { toFirstCharUpper } from "./utils";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
    pokedexContainer: {
        paddingTop: "20px",
        paddingLeft: "50px",
        paddingRight: "50px",
    },
    cardMedia: {
        margin: "auto",
    },
    cardContent: {
        // boxShadow: "20px",
        textAlign: "center",
    },
    card: {
        boxShadow: '2px 4px 15px rgba(0, 0, 0, .1)',
    },
    searchInput: {
        width: "200px",
        margin: "5px",
    },
    searchIcon: {
        alignSelf: "flex-end",
        marginBottom: "5px",
    },
    searchContainer: {
        display: 'flex',
        backgroundColor: fade(theme.palette.common.white, 0.15),
        paddingLeft: "20px",
        paddingRight: "20px",
        marginTop: "5px",
        marginBottom: "5px",
    },
    title: {
        display: 'none',
        marginLeft: "10px",
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
}));

const Pokedex = props => {
    const classes = useStyles();
    const { history } = props;
    const [pokemonData, setPokemonData] = useState({});
    const [filter, setFilter] = useState("");

    function handleSearchChange(e) {
        setFilter(e.target.value);
    }

    useEffect(() => {
        axios
            .get(`https://pokeapi.co/api/v2/pokemon?limit=807`)
            .then((response) => {
                const { data } = response;
                const { results } = data;
                const newPokemonData = {};

                results.forEach((pokemon, index) => {
                    newPokemonData[index + 1] = {
                        id: index + 1,
                        name: pokemon.name,
                        sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`,
                    };
                });
                setPokemonData(newPokemonData);
            });
    }, []);

    function getPokemonCard(pokemonId) {
        console.log(pokemonData[`${pokemonId}`]);
        const { id, name, sprite } = pokemonData[pokemonId];

        return (
            <Grid item xs={12} sm={4} key={pokemonId}> {/* responsive - sm for smaller mobile screen sizes */}
                <Card className={classes.card} onClick={() => history.push(`/${pokemonId}`)}>
                    <CardMedia
                        className={classes.cardMedia}
                        image={sprite}
                        style={{ width: "130px", height: "130px" }}
                    />
                    <CardContent className={classes.cardContent}>
                        <Typography variant="h6">
                            {`${toFirstCharUpper(name)}`}
                        </Typography>
                        <Typography variant="subtitle2" color="textSecondary">{`No. ${id}`}</Typography>
                    </CardContent>
                </Card>
            </Grid>
        );
    }

    return (
        <>
            <AppBar position="sticky" color="inherit">
                <Toolbar>
                    <img style={{ width: "20px", height: "20px" }}
                        margin={20}
                        src="https://pngimg.com/uploads/pokeball/pokeball_PNG8.png" />
                    <Typography className={classes.title} variant="h6" noWrap>
                        <Link color="black" onClick={() => history.push("/")}>   Pokédex</Link>
                    </Typography>                    <div className={classes.searchContainer}>
                        <SearchIcon className={classes.searchIcon}></SearchIcon>
                        <TextField className={classes.searchInput}
                            label="Pokemon"
                            variant="standard"
                            onChange={handleSearchChange}/>
                    </div>    

                </Toolbar>
            </AppBar>
            {pokemonData ? (
                <Grid container spacing={2} className={classes.pokedexContainer}>
                    {Object.keys(pokemonData).map((pokemonId) => 
                        pokemonData[pokemonId].name.includes(filter.toLowerCase()) && getPokemonCard(pokemonId)
                    )}
                    
                </Grid>
            ) : (
                <CircularProgress />
            )}

        </>
    )
}

export default Pokedex;