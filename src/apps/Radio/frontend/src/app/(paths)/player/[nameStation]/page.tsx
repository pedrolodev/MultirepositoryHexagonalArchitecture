import AudioPlayer from './components/audioPlayer'
import styles from './page.module.css'
import getStations from '../../../services/api/getStations'
import { Suspense } from 'react'
import LoadSpinner from '../../../shared/components/loadSpinner'

export default async function PlayerPage({
      params
}: {
      params: { nameStation: string }
}) {
      const stations = await getStations()
      const nameStation = decodeURIComponent(params.nameStation)
      const station = stations.find((station) => station.name === nameStation)

      return (
            <div className={styles.container}>
                  {station === undefined ? (
                        'Radio no encontrada'
                  ) : (
                        <Suspense fallback={<LoadSpinner />}>
                              <AudioPlayer
                                    audioUrl={station.url}
                                    name={nameStation}
                              />
                        </Suspense>
                  )}
            </div>
      )
}
