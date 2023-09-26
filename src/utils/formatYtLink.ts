import React from 'react'

export default function formatYtLink(link: string) {
    let youtubeLink = link;
    if(link.split("&t=").length === 2){
        let url = link.split("&t=")[0];
        url = url.split('v=')[1];

        const newUrl = "https://www.youtube.com/embed/" + url

        if(url){
            youtubeLink = newUrl
        }
    } else if(link.split("youtu.be/").length === 2){

        let url = link.split("youtu.be/")[1];
        const newUrl = "https://www.youtube.com/embed/" + url

        if(url){
            youtubeLink = newUrl
        }

    } else {

        const url = link.split('v=')[1];
        const newUrl = "https://www.youtube.com/embed/" + url

        if(url){
            youtubeLink = newUrl
        }

    }

    return youtubeLink
}
