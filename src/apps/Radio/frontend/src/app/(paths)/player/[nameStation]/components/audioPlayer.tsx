'use client'
import React, { useState, useEffect, useRef } from 'react'
import styles from './audioPlayer.module.css'
import Button from '../../../../../app/shared/components/button'
import numberToTime from '../../../../../app/lib/numberToTime'
import AudioLoadError from '../../../../../app/lib/exceptions/audioLoad.error'

type AudioManager = {
      time: number
      lastSelectedDelay: number
      totalDelay: number
}

const AudioPlayer = ({
      audioUrl,
      name
}: {
      audioUrl: string
      name: string
}) => {
      const audio = useRef<HTMLAudioElement>(null)
      const [isPlaying, setIsPlaying] = useState(false)
      const delayNegativo = [-1, -5, -10]
      const delayPositivo = [1, 5, 10]

      const [audioManager, setAudioManager] = useState<AudioManager>({
            time: 0,
            lastSelectedDelay: 0,
            totalDelay: 0
      })

      useEffect(() => {
            if (audio.current?.error) throw new AudioLoadError()
      }, [audio.current?.error])

      useEffect(() => {
            const au = audio.current

            const timer = setInterval(() => {
                  setAudioManager((prev) => {
                        let time = prev.time + 1
                        if (au) time = au.currentTime
                        return { ...prev, time }
                  })
            }, 1000)

            return () => {
                  if (au) au.pause()
                  clearInterval(timer)
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [audioUrl])

      useEffect(() => {
            const au = audio.current
            if (au && au.src !== '') {
                  // au.load()

                  if (isPlaying) {
                        au.load()
                        au.play()
                  } else {
                        au.pause()
                  }
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [isPlaying])

      useEffect(() => {
            const au = audio.current

            if (au)
                  au.currentTime =
                        au.currentTime + audioManager.lastSelectedDelay
            setAudioManager((prev) => {
                  let time = prev.time + 1
                  if (au) time = au.currentTime
                  return { ...prev, time }
            })
            // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [audioManager.totalDelay])

      const handleDelay = (delay: number) => {
            // el delay siempre será negativo
            if (audioManager.totalDelay + delay <= 0) {
                  // no podrá haber mas delay que la duración del stream
                  // currentTime ya tiene aplicado el totalDelay
                  if (audioManager.time + delay >= 0) {
                        setAudioManager((prev) => {
                              return {
                                    ...prev,
                                    totalDelay: prev.totalDelay + delay
                              }
                        })
                        setAudioManager((prev) => {
                              return { ...prev, lastSelectedDelay: delay }
                        })
                  }
            }
      }

      return (
            <>
                  <audio ref={audio} preload="none" src={audioUrl} />
                  <div className={styles.audio_player_container}>
                        <div className={styles.info}>
                              <span>{name}</span>
                              <span>
                                    {numberToTime(
                                          Number(audioManager.time.toFixed(0)) -
                                                audioManager.totalDelay
                                    )}
                              </span>
                              <span>Delay: {audioManager.totalDelay} </span>
                        </div>
                        <div className={styles.audio_player}>
                              <div className={styles.delay_layout}>
                                    {delayNegativo.map((value) => {
                                          return (
                                                <Button
                                                      key={value}
                                                      color="red"
                                                      onClick={() =>
                                                            handleDelay(value)
                                                      }
                                                      text={String(value)}
                                                />
                                          )
                                    })}
                              </div>
                              <div>
                                    <Button
                                          text={isPlaying ? 'Stop' : 'Play'}
                                          color="black"
                                          onClick={() =>
                                                setIsPlaying((prev) => !prev)
                                          }
                                    />
                              </div>

                              <div className={styles.delay_layout}>
                                    {delayPositivo.map((value) => {
                                          return (
                                                <Button
                                                      key={value}
                                                      color="blue"
                                                      onClick={() =>
                                                            handleDelay(value)
                                                      }
                                                      text={String(value)}
                                                />
                                          )
                                    })}
                              </div>
                        </div>
                  </div>
            </>
      )
}

export default AudioPlayer
