'use client'
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { fetchDefaultImages, sendRequest } from '@/utils/api';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useSession } from 'next-auth/react';
import {useRouter} from "next/navigation"
dayjs.extend(relativeTime)


interface IProps {
    track: ITrackTop | null;
    comments: Comment[];
}

interface Comment {
    content: string;
    createdAt: string;
    isDeleted: boolean;
    moment: number;
    track: string;
    updatedAt: string;
    user: {
        _id: string;
        email: string;
        name: string;
        role: string;
        type: string;
    };
    __v: number;
    _id: string;
}


const CommentTrack = (props: IProps) => {

    const router = useRouter();
    const { comments, track } = props;
    const [yourComment, setYourComment] = React.useState("");
    const { data: session } = useSession()
    const handleSubmit = async () => {
        const res = await sendRequest<IBackendRes<ITrackComment>>({
            url: `http://localhost:8000/api/v1/comments`,
            method: "POST",
            body: {
                content: yourComment,
                moment: 10,
                track: track?._id
            },
            headers: {
                Authorization: `Bearer ${session?.access_token}`
            }
        })
        if(res.data) {
            setYourComment("")
            router.refresh()
        }
    }
    
    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60)
        const secondsRemainder = Math.round(seconds) % 60
        const paddedSeconds = `0${secondsRemainder}`.slice(-2)
        return `${minutes}:${paddedSeconds}`
    }




    return (
        <div>
            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 1, width: '100%' },
                }}
                noValidate
                autoComplete="off"
            >
                {session?.user && <TextField value={yourComment} id="standard-basic" label="Comment" variant="standard" onChange={(e) => setYourComment(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            handleSubmit()
                        }
                    }} />}

            </Box>

            <div style={{ display: 'flex', marginTop: '30px' }}>
                <div style={{ flex: '30%', position: 'relative' }}>
                    <div style={{ width: '200px', height: '200px' }}>
                        <img src="/user/default-user.png" alt="" style={{ display: 'block', width: '100%', height: '100%' }} />
                    </div>
                    <p style={{ position: 'absolute', left: '30%', transform: 'translateX(-50%)' }}>Dac minh</p>
                </div>

                <div style={{ flex: '70%' }}>

                    {comments?.map((comment: Comment) => (
                        <div key={comment._id} style={{ display: 'flex', alignItems: 'center', marginBottom: '30px' }}>
                            <div style={{ width: '50px', height: '50px', marginRight: '15px' }}>
                                <img src={fetchDefaultImages(comment.user.type)} alt="" style={{ display: 'block', width: '100%', height: '100%' }} />
                            </div>
                            <div>
                                <div>
                                    <p style={{ margin: '0', marginBottom: '5px' }}>{comment.user.name} at {formatTime(comment.moment)}</p>
                                    <p style={{ margin: '0' }}>{comment.content}</p>
                                </div>
                            </div>
                            <div style={{ marginLeft: 'auto' }}>
                                {dayjs(comment.createdAt).fromNow()}

                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default CommentTrack;
