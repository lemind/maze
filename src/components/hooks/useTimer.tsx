import { useState, useRef, MutableRefObject, useEffect } from "react";

// ToDo: stackverflow solution | reconsider
function secondsToHms(d: number) {
  d = Number(d);
  var h = Math.floor(d / 3600);
  var m = Math.floor(d % 3600 / 60);
  var s = Math.floor(d % 3600 % 60);

  var hDisplay = h > 0 ? h + (h === 1 ? " hour, " : " hours, ") : "";
  var mDisplay = m > 0 ? m + (m === 1 ? " minute, " : " minutes, ") : "";
  var sDisplay = s > 0 ? s + (s === 1 ? " second" : " seconds") : "";
  return hDisplay + mDisplay + sDisplay;
}

export default function useTimer() {
  const [time, setTime] = useState(0);
  let intervalId: MutableRefObject<any> = useRef()
  let timeCurr: MutableRefObject<any> = useRef()

  useEffect(() => {
    timeCurr.current = time
  }, [time]);

  const start = () => {
    intervalId.current = setInterval(() => {
      setTime((current) => current + 1)
    }, 1000)
  }

  const stop = () => {
    clearInterval(intervalId.current)
    setTime(0)
  }

  const getTime = () => {
    return secondsToHms(timeCurr.current)
  }

  return {start, stop, getTime};
}