export default function convertDurationToTimeString(duration:number|string){
    let time = Number(duration);
    
    const hours = Math.floor(time/3600);
    const minutes = Math.floor((time % 3600)/60);
    const seconds = time %60;

    const timeString = [hours, minutes, seconds]
    .map( unit=> String(unit).padStart(2, '0'))
    .join(':'); 

    return timeString;
};