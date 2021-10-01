export default function getShowImage(mediaURL) {
  let media = ""
    
  if (mediaURL){
    if (mediaURL.includes("viva")){
        media = mediaURL;
    }
    if (mediaURL.includes("youtube") || mediaURL.includes("youtu.be")){

      const i = mediaURL.indexOf("v=");
      
      if(i >= 0){
        const videoID = mediaURL.slice(i + 2, i + 13);
        media = `https://img.youtube.com/vi/${videoID}/maxres1.jpg`;
      }
    }
  }

  return media;
}