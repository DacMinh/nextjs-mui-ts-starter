'use client'
// import { TrackContext, useTrackContext } from '@/lib/track.wrapper';
// import { useHasMounted } from '@/utils/customHook';
// import { ThemeContext } from '@emotion/react';
// import { Container } from '@mui/material';
// import AppBar from '@mui/material/AppBar';
// import { useContext, useRef } from 'react';
// import AudioPlayer from 'react-h5-audio-player';
// import 'react-h5-audio-player/lib/styles.css';

// const AppFooter = () => {
//     const haMounted = useHasMounted();
//     const playerRef = useRef(null)

//     if (!haMounted) return (<></>)
//     const track = useContext(TrackContext)
//     const { currentTrack, setCurrentTrack } = useTrackContext() as ITrackContext

//     if (playerRef?.current && currentTrack?.isPlaying === false) {
//         //@ts-ignore
//         playerRef?.current?.audio?.current?.pause();
//     }
//     if (playerRef?.current && currentTrack?.isPlaying === true) {
//         //@ts-ignore
//         playerRef?.current?.audio?.current?.play();
//     }


//     return (
//         <div style={{ marginTop: 50 }}>

//             <AppBar position="fixed" sx={{ top: 'auto', bottom: 0, background: "#f2f2f2" }}>

//                 <Container sx={{
//                     display: "flex", gap: 10,
//                     ".rhap_main": {
//                         gap: "30px"
//                     }
//                 }}>
//                     <AudioPlayer
//                         ref={playerRef}
//                         layout='horizontal-reverse'
//                         src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/tracks/${currentTrack.trackUrl}`}
//                         volume={0.5} style={{ boxShadow: "unset", background: "#f2f2f2" }}
//                         onPlay={() => { setCurrentTrack({ ...currentTrack, isPlaying: true }) }}
//                         onPause={() => { setCurrentTrack({ ...currentTrack, isPlaying: false }) }}

//                     />           <div style={{ display: "flex", flexDirection: "column", alignItems: "start", justifyContent: "center", minWidth: 100 }}>

//                         <div style={{ color: "#ccc" }}>Minh</div>
//                         <div style={{ color: "black" }}>Who am I</div>

//                     </div>
//                 </Container>

//             </AppBar>

//         </div>
//     );
// };

// export default AppFooter;
import { useRef, useEffect, useContext } from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { AppBar, Container } from '@mui/material';
import { TrackContext, useTrackContext } from '@/lib/track.wrapper';
import { useHasMounted } from '@/utils/customHook';

const AppFooter: React.FC = () => {
    const playerRef = useRef<AudioPlayer>(null);
    const haMounted = useHasMounted();

    const { currentTrack, setCurrentTrack } = useTrackContext() as ITrackContext;

    const handlePlayPause = (isPlaying: boolean) => {
        if (playerRef.current) {
            const audioElement = playerRef.current.audio.current;
            if (isPlaying) {
                audioElement?.play();
            } else {
                audioElement?.pause();
            }
        }
    };

    useEffect(() => {
        if (currentTrack) {
            handlePlayPause(currentTrack.isPlaying);
        }
    }, [currentTrack]);

    if (!haMounted) return null;

    return (
        <div style={{ marginTop: 50 }}>
            <AppBar position="fixed" sx={{ top: 'auto', bottom: 0, background: "#f2f2f2" }}>
                <Container sx={{
                    display: "flex", gap: 10,
                    ".rhap_main": {
                        gap: "30px"
                    }
                }}>
                    <AudioPlayer
                        ref={playerRef}
                        layout='horizontal-reverse'
                        src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/tracks/${currentTrack?.trackUrl}`}
                        volume={0.5}
                        style={{ boxShadow: "unset", background: "#f2f2f2" }}
                        onPlay={() => setCurrentTrack({ ...currentTrack, isPlaying: true })}
                        onPause={() => setCurrentTrack({ ...currentTrack, isPlaying: false })}
                    />
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "start", justifyContent: "center", minWidth: 100 }}>
                        <div style={{ color: "#ccc" }}>{currentTrack.description}</div>
                        <div style={{ color: "black" }}>{currentTrack.title}</div>
                    </div>
                </Container>
            </AppBar>
        </div>
    );
};

export default AppFooter;

