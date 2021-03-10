import React, { useEffect, useState } from "react";
import { IconButton, makeStyles, Typography, useMediaQuery, useTheme } from "@material-ui/core";
import style from "../assets/jss/components/contentSliderStyle";
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/swiper-bundle.css"
import NavigateNextRoundedIcon from '@material-ui/icons/NavigateNextRounded';
import NavigateBeforeRoundedIcon from '@material-ui/icons/NavigateBeforeRounded';

const useStyles = makeStyles(style);

function ContentSlider(props) {
    const classes = useStyles();
    const theme = useTheme();
    const isSdUp = useMediaQuery(theme.breakpoints.up("sd"));
    const isLgUp = useMediaQuery(theme.breakpoints.up("lg"));
    const isXlUp = useMediaQuery(theme.breakpoints.up("xl"));
    const isXxlUp = useMediaQuery(theme.breakpoints.up("xxl"));

    const [progress, setProgress] = useState(0);
    const [slidesPerView, setSlidedPerView] = useState(2);

    const swiperRef = React.useRef(null);

    useEffect(() => {
        if (isXxlUp){
            setSlidedPerView(6);
        }else if (isXlUp) {
            setSlidedPerView(5);
        }else if (isLgUp){
            setSlidedPerView(4);
        }else if (isSdUp){
            setSlidedPerView(3);
        }else{
            setSlidedPerView(2);
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
                        <IconButton onClick={prevSlide} disabled={progress <= 0}>
                            <NavigateBeforeRoundedIcon />
                        </IconButton>
                        <IconButton onClick={nextSlide} disabled={progress >= 1}>
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

export default ContentSlider;