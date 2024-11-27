import { Slider } from "@/components/Slider"
import { usePlayerStore } from "@/store/playerStore"
import { useEffect, useRef, useState } from "react"

export const Pause = () => (
    <svg role="img" height="16" width="16" aria-hidden="true" viewBox="0 0 16 16"><path d="M2.7 1a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7H2.7zm8 0a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7h-2.6z"></path></svg>
)
export const Play = () => (
    <svg role="img" height="16" width="16" aria-hidden="true" viewBox="0 0 24 24"><path d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z"></path></svg>
)
const CurrentSong = ({ image, title, artists }) => {
    return (
        <div className="flex items-center gap-5 relative overflow-hidden">
            <picture className="w-16 h-16 rounded-md shadow-lg overflow-hidden">
                <img src={image} alt={title} />
            </picture>
            <div>
                <h3 className="font-semibold text-sm block">
                    {title}
                </h3>
                <span className="text-xs opacity-80">
                    {artists?.join(", ")}
                </span>
            </div>
        </div>
    )
}

export function Player () {
    const { currentMusic, isPlaying, setIsPlaying } = usePlayerStore(state => state)
    const audioRef = useRef()
    const volumeRef = useRef(1)

    useEffect(() => {
        isPlaying ? audioRef.current.play() : audioRef.current.pause()
    }, [isPlaying])

    useEffect(() => {
        const { song, playlist, songs } = currentMusic
        if (song) {
            const src = `/music/${playlist?.id}/0${song.id}.mp3`
            audioRef.current.src = src
            audioRef.current.play()
            audioRef.current.volume = volumeRef.current
        }
    }, [currentMusic])

    const handleClick = () => {
        setIsPlaying(!isPlaying)
    }

    return (
        <div className="flex flex-row justify-between w-full px-4 z-50">
            <audio ref={audioRef} />
            <div className="w-1/3">
                <CurrentSong {...currentMusic.song} />
            </div>
            <div className="grid place-content-center gap-4 w-1/3">
                <div className="flex justify-center">
                    <button className="bg-white rounded-full p-2" onClick={handleClick}>
                        {isPlaying ? <Pause /> : <Play />}
                    </button>
                </div>
            </div>
            <div className="grid place-content-center w-1/3">
                <Slider defaultValue={[100]} max={100} min={0} className="w-[95px]" onValueChange={(value) => {
                    const [newVolume] = value
                    const volumeValue = newVolume / 100
                    volumeRef.current = volumeValue
                    audioRef.current.volume = volumeValue
                }} />
            </div>
        </div>
    )
}