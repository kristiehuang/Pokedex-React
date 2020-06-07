import React, { useState, useEffect } from "react";
import {
    Typography, Link, CircularProgress, Button, Toolbar,
    Grid, Card, AppBar, TextField, CardContent
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { toFirstCharUpper } from "./utils";
import axios from "axios";
import { makeStyles, fade } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    container: {
        paddingTop: "20px",
        paddingLeft: "50px",
        paddingRight: "50px",
    },
    idNumText: {
        position: "absolute",
        top: "50%",
        left: "50%",
        color: "yellow",
    },
    img: {
        verticalAlign: "middle",
        display: "inline-block",
    },
    name: {
        verticalAlign: "middle",
        display: "inline-block",
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
    statsCard: {
        height: "80px",
        textAlign: 'center',
    }
}));

const Pokemon = props => {
    const classes = useStyles();
    const { match, history } = props;
    const { params } = match;
    const { pokemonId } = params;
    const [pokemon, setPokemon] = useState(undefined);

    useEffect(() => {
        axios
            .get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`)
            .then((response) => {
                const { data } = response;
                setPokemon(data);
            })
            .catch((error) => {
                setPokemon(false);
            });
    }, [pokemonId]);

    function generatePokemonJSX() {
        const { name, id, species, height, weight, types, sprites, moves } = pokemon;
        const fullImageUrl = `https://pokeres.bastionbot.org/images/pokemon/${id}.png`;
        const { front_default } = sprites;
        var typesStr = "";
        types.map((typeInfo) => {
            const { type } = typeInfo;
            const { name } = type;
            typesStr = typesStr + name + " / ";
        })
        typesStr = typesStr.slice(0, typesStr.length - 3);
        return (
            <>
                <br/>
                <div style={{paddingLeft: "50px", marginTop: "15px", verticalAlign: "middle", display: "inline-block", paddingRight: "20px"}}>
                    <img style={{ width: "150px", height: "150px" }} src={fullImageUrl} />
                </div>
                <div style={{ verticalAlign: "middle", display: "inline-block" }}>
                    <Typography variant="h3">
                        <Link href={species.url}>{toFirstCharUpper(name)}</Link>

                    </Typography>
                    <Typography variant="subtitle2" color="textSecondary">No. {`${id}`}</Typography>
                </div>

                <div className={classes.container}>
                    <Card><CardContent verticalAlign="middle">
                        <Typography variant="body">Types: {typesStr}</Typography>
                    </CardContent></Card>
                </div>


                <Grid container spacing={2} className={classes.container}>
                    <Grid item sm={4}>
                        <Card><CardContent className={classes.statsCard}>
                            <Typography variant="overline">Height</Typography>
                            <Typography>{height}</Typography>                        </CardContent></Card>
                    </Grid>
                    <Grid item sm={4}>
                        <Card><CardContent className={classes.statsCard}>
                            <Typography variant="overline">Weight</Typography>
                            <Typography>{weight}</Typography>
                        </CardContent></Card>
                    </Grid>
                    <Grid item sm={4}>
                        <Card><CardContent className={classes.statsCard}>
                            <Typography variant="overline">Number of moves</Typography>
                            <Typography>{moves.length}</Typography>
                        </CardContent></Card>
                    </Grid>
                </Grid>


            </>
        )
    }

    return (<>
        <AppBar position="sticky" color="inherit">
            <Toolbar>
                <img style={{ width: "20px", height: "20px" }}
                    marginBottom={20}
                    src="https://pngimg.com/uploads/pokeball/pokeball_PNG8.png" />
                <Typography className={classes.title} variant="h6" noWrap>
                    <Link color="black" onClick={() => history.push("/")}>   Pokédex</Link>
                </Typography>
                <div className={classes.searchContainer}>
                    <SearchIcon className={classes.searchIcon}></SearchIcon>
                    <TextField className={classes.searchInput}
                        label="Pokemon"
                        variant="standard"
                        onChange={() => history.push("/")} />
                </div>
            </Toolbar>
        </AppBar>
        <div className={classes.container}>
            {pokemon === undefined && <CircularProgress/>}
            {pokemon !== undefined && pokemon && generatePokemonJSX()}
            {pokemon === false && <Typography>Pokemon not found.</Typography>}
        </div>
    </>);
}

export default Pokemon;