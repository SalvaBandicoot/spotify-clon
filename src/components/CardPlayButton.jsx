import { Pause, Play } from "@/components/Player"
import { usePlayerStore } from "@/store/playerStore"

export function CardPlayButton ( {id} ) {
    const { currentSong, isPlaying, setIsPlaying, setCurrentSong } = usePlayerStore(state => state)
    const handleClick = () => {
        setIsPlaying(!isPlaying)
    }

    return (
        <div onClick={handleClick} className="card-play-button rounded-full bg-green-500 p-3">
            {isPlaying ? <Pause /> : <Play />}
        </div>
    )
}