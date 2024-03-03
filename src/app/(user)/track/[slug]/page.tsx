import WeaveTrack from '@/components/track/wave.track'
import { useSearchParams } from 'next/navigation';
import { Container } from '@mui/material';
import { sendRequest } from '@/utils/api';
// import { useSession } from 'next-auth/react';


// const { data: session } = useSession();
const DetailTrackPage = async (props: any) => {
    const { params } = props;
    const res = await sendRequest<IBackendRes<ITrackTop>>({
        url: `http://localhost:8000/api/v1/tracks/${params.slug}`,
        method: "GET",
    })

    const res1 = await sendRequest<IBackendRes<ITrackPaginate>>({
        url: `http://localhost:8000/api/v1/tracks/comments`,
        method: "POST",
        queryParams: {
            current: 1,
            pageSize: 10,
            trackId: params.slug,
            sort: "-createdAt"
        }
    })

    const LikeTrackList = await sendRequest<IBackendRes<IModelPaginate<ITrackLike>>>({
        url: `http://localhost:8000/api/v1/likes`,
        method: "GET",
        queryParams: {
            current: 1,
            pageSize: 100,
            sort: "-createdAt"
        },
        // headers:{
        //     Authorization: `Bearer ${session?.access_token}`
        // } 

    })
    






    return (
        <Container> <div> <WeaveTrack LikeTracks={LikeTrackList?.data ?? null} track={res?.data ?? null} comments={res1?.data ?? null} /></div></Container>
    )
}

export default DetailTrackPage 