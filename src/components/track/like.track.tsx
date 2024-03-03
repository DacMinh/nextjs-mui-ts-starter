'use client'
import * as React from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { fetchData } from 'next-auth/client/_utils';
import { useSession } from 'next-auth/react';

interface ITrack {
    track: ITrackTop | null;
    LikeTrackLists: any
}

const LikeTrack = (props: ITrack) => {
    const { track, LikeTrackLists } = props;
    const [trackLikes, setTrackLike] = React.useState<ITrackLike[] | null>(null)
    const { data: session } = useSession();
    console.log("check session",session)

    const fetchData = async () =>{
        if ( session?.access_token ) {
            const res2 = await LikeTrackLists()
        }
        if(res2?.data?.result){

        }
    }
    React.useEffect(() => {
        
        fetchData();
    }, [session])



    return (
        <div style={{ marginTop: 30, marginBottom: 30 }}>
            <Stack direction="row">
                <Chip icon={<FavoriteIcon />} label="Like" sx={{ borderRadius: 1, border: 1, backgroundColor: "transparent" }} />
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
