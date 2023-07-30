import React, {useCallback, useEffect, useState} from 'react';
import {Card, CardContent, CardMedia, Icon, Modal, Typography} from "@mui/material";
import './Loading.scss';
import {allLoadingMedia} from "./loadingMedia";
import {toggleSimulatingLoading} from "../../slices/devControlsSlice";
import {useAppDispatch} from "../../reduxHooks";

interface LoadingProps {
    isLoading: boolean
}

/**
 * Returns a random integer between min (inclusive) and max (inclusive).
 * The value is no lower than min (or the next integer greater than min
 * if min isn't an integer) and no greater than max (or the next integer
 * lower than max if max isn't an integer).
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const Loading: React.FC<LoadingProps> = ({
     isLoading,
 }) => {
    const dispatch = useAppDispatch()

    const [randomIndex, setRandomIndex] = useState(0);

    const regenerateRandomIndex = () => {
        const randomInt = getRandomInt(0, allLoadingMedia.length-1)
        setRandomIndex(randomInt);
    }

    useEffect(() => {
        regenerateRandomIndex()
    }, [isLoading])

    const {
        height,
        title,
        description,
        image
    } = allLoadingMedia[randomIndex];

    const closeSimulatedLoadingModal = useCallback(() => dispatch(toggleSimulatingLoading()), [])

    const onClose = useCallback(() => {
        closeSimulatedLoadingModal()
        regenerateRandomIndex()
    }, [closeSimulatedLoadingModal])

    return <Modal open={isLoading} onClose={onClose}>
        <Card sx={{ maxWidth: 345 }} className={'loading-card'}>
            {/*<CardActionArea>*/}
            <CardMedia
                component="img"
                height={height || "180"}
                image={image}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {description}
                </Typography>
            </CardContent>
            {/*</CardActionArea>*/}
        </Card>
    </Modal>;
}

export default Loading;
