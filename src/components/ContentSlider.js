import React, { useEffect, useState } from "react";
import { IconButton, makeStyles, Typography, useMediaQuery, useTheme } from "@material-ui/core";
import style from "../assets/jss/components/contentSliderStyle";
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/swiper-bundle.css"
import NavigateNextRoundedIcon from '@material-ui/icons/NavigateNextRounded';
import NavigateBeforeRoundedIcon from '@material-ui/icons/NavigateBeforeRounded';
import PropTypes from "prop-types";

const useStyles = makeStyles(style);

function ContentSlider(props) {
    const classes = useStyles();
    const theme = useTheme();
    const isSdUp = useMediaQuery(theme.breakpoints.up("sd"));
    const isLgUp = useMediaQuery(theme.breakpoints.up("lg"));
    const isXlUp = useMediaQuery(theme.breakpoints.up("xl"));
    const isXxlUp = useMediaQuery(theme.breakpoints.up("xxl"));

    const [progress, setProgress] = useState(0);
    const [slidesPerView, setSlidesPerView] = useState(2);

    const swiperRef = React.useRef(null);

    useEffect(() => {
        const delay = 15;
        const timeout = props.drawerOpen ?
                        theme.transitions.duration.enteringScreen :
                        theme.transitions.duration.leavingScreen;
        const interval = setInterval(() => {
            swiperRef.current.swiper.update();
        }, delay);
        const timer = setTimeout(() => {
            clearInterval(interval);
        }, timeout);
        return () => {
            clearTimeout(timer);
            clearInterval(interval)
        }; 
    }, [props.drawerOpen, theme.transitions.duration.enteringScreen, theme.transitions.duration.leavingScreen])

    useEffect(() => {
        if (isXxlUp){
            setSlidesPerView(6);
        }else if (isXlUp) {
            setSlidesPerView(5);
        }else if (isLgUp){
            setSlidesPerView(4);
        }else if (isSdUp){
            setSlidesPerView(3);
        }else{
            setSlidesPerView(2);
        }
    },[isLgUp, isXlUp, isSdUp, isXxlUp])

    const slideByAmount = number => {
        let i = 0;
        for (i; i > number; i--){
            swiperRef.current.swiper.slidePrev(1000);
        }
        for (i = 0; i < number; i++){
            swiperRef.current.swiper.slideNext(1000);
        }
    }

    const nextSlide = React.useCallback(() => {
        slideByAmount(slidesPerView);
    }, [slidesPerView])

    const prevSlide = React.useCallback(() => {
        slideByAmount(-slidesPerView);
    }, [slidesPerView])

    return (
            <div className={classes.container}>
                <div className={classes.headerContainer}>
                    <div>
                        <Typography variant="h4" component="h2">{props.title}</Typography>
                        <Typography variant="subtitle1" component="h3">{props.description}</Typography>
                    </div>
                    <div className={classes.buttonsContainer}>
                        <IconButton onClick={prevSlide} disabled={progress <= 0} className={classes.button}>
                            <NavigateBeforeRoundedIcon />
                        </IconButton>
                        <IconButton onClick={nextSlide} disabled={progress >= 1} className={classes.button}>
                            <NavigateNextRoundedIcon />
                        </IconButton>
                    </div>
                </div>
                <div>
                    <Swiper 
                    ref={swiperRef}
                    slidesPerView={slidesPerView}
                    freeMode
                    onProgress={(swiper, newProgress) => {setProgress(newProgress)}}>
                        {props.children.map((child, index) =>
                            <SwiperSlide key={index} className={classes.slide}>{child}</SwiperSlide>
                        )}
                    </Swiper>
                </div>
            </div>
    )
}

ContentSlider.propTypes = {
    children: PropTypes.array,
    title: PropTypes.string,
    description: PropTypes.string,
    drawerOpen: PropTypes.bool
}

export default ContentSlider;