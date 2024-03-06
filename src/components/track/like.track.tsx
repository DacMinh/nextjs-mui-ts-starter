'use client'
import * as React from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

import { useSession } from 'next-auth/react';
import { sendRequest } from '@/utils/api';
import { useRouter } from 'next/navigation'


interface ITrack {
    track: ITrackTop | null;

}

const LikeTrack = (props: ITrack) => {
    const router = useRouter()

    const { track } = props;
    const [trackLikes, setTrackLike] = React.useState<ITrackLike[] | null>(null)
    const { data: session } = useSession();


    // const fetchData = async () => {
    //     if (session?.access_token) {
    //         const res2 = await LikeTrackLists;
    //         if (res2?.result) {

    //             setTrackLike(res2?.result)
    //         }
    //     }
    // };

    const fetchData = async () => {
        if (session?.access_token) {
            const res2 = await sendRequest<IBackendRes<IModelPaginate<ITrackLike>>>({
                url: `http://localhost:8000/api/v1/likes`,
                method: "GET",
                queryParams: {
                    current: 1,
                    pageSize: 100,
                    sort: "-createdAt"
                },
                headers: {
                    Authorization: `Bearer ${session?.access_token}`,
                },
            })
            if (res2?.data?.result)
            setTrackLike(res2?.data?.result)
        }
    }

    React.useEffect(() => {

        fetchData();
    }, [session])
    const handleLikeTrack = async () => {
        await sendRequest<IBackendRes<IModelPaginate<ITrackLike>>>({
            url: `http://localhost:8000/api/v1/likes`,
            method: "POST",
            body: {
                track: track?._id,
                quantity: trackLikes?.some(t => t._id === track?._id) ? -1 : 1
            },
            headers: {
                Authorization: `Bearer ${session?.access_token}`
            }

        })

        fetchData();
        router.refresh()

    };


    return (
        <div style={{ marginTop: 30, marginBottom: 30 }}>
            <Stack direction="row">
                <Chip icon={<FavoriteIcon />}
                    label="Like"
                    sx={{ borderRadius: "5px" }}
                    size='medium'
                    variant='outlined'
                    color={trackLikes?.some(t => t._id === track?._id) ? "error" : "default"}
                    clickable onClick={() => handleLikeTrack()} />
                <div style={{ width: "80%" }}></div> {/* Khoảng trống giữa */}
                <Stack direction="row" spacing={1}>
                    <Chip icon={<PlayArrowIcon />} label={track?.countPlay.toString()} sx={{ border: "none", backgroundColor: "transparent" }} />
                    <Chip icon={<FavoriteIcon />} label={track?.countLike.toString()} sx={{ border: "none", backgroundColor: "transparent" }} />
                </Stack>
            </Stack>
        </div>
    )
}

export default LikeTrack; 
