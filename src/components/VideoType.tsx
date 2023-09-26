import React from 'react'
import { TikTokEmbed, YouTubeEmbed } from 'react-social-media-embed'

export default function VideoType({video}: {video: string}) {
    if(video.includes("tiktok")){
        return (
            <div className='flex  justify-center'>
                <TikTokEmbed 
                url={video} 
                width={325}
                height={570}
                />
            </div>
        )
    }else if(video.includes("youtube")){
        return (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <YouTubeEmbed url={video} width={325} height={220} />
            </div>
        )
    } else {
        return <p>nothing</p>
    }
}
