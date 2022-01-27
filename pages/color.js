import { Typography, makeStyles, Paper, TextField, Button } from "@material-ui/core";
import { useState, useContext } from "react";
import style from "../src/assets/jss/layouts/colorPageStyle";
import { HexColorPicker } from "react-colorful";
import { colord } from "colord";
import { ThemeContext } from "../src/contexts/ThemeContext";
import Head from 'next/head'

const useStyles = makeStyles(style)

const ColorPage = () => {
  const classes = useStyles()

  const [color, setColor] = useState("#fff")
  const { setSecondaryColor } = useContext(ThemeContext);

  const handleChange = (color) => {
    setColor(color)
  }

  const handleTextFieldChange = event => {
    const input = event.target.value;
    if (/^#[0-9a-f]{0,6}$/.test(input)) {
      setColor(input);
    }
  }

  const handleClick = () => {
    const chosenColor = colord(color).toHsl()

    const lightColor = chosenColor
    const darkColor = chosenColor

    lightColor.l += 20
    darkColor.l -= 20

    const colorObject = {
      light: colord(lightColor).toHex(),
      main: colord(chosenColor).toHex(),
      dark: colord(darkColor).toHex()
    }

    setSecondaryColor(colorObject)
  }

  return (
    <>
      <Head>
        <title>Χρώματα | Theatrica</title>
      </Head>
      <div className="pageWrapper">
        <div className="pageContent">
          <Typography variant="h2" component="h1">Διαλέξτε Χρώμα</Typography>
          <Paper className={classes.paper} elevation={3}>
            <TextField value={color} onChange={handleTextFieldChange} label="HEX" variant="outlined" color="secondary" />
            <HexColorPicker color={color} onChange={handleChange} style={{ width: "100%", height: 400 }} />
            <Button onClick={handleClick} variant="outlined" color="secondary" style={{ alignSelf: "flex-end" }}>Εφαρμογη</Button>
          </Paper>

        </div>
      </div>
    </>
  );
}

export default ColorPage;