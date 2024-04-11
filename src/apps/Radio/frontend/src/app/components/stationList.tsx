import 'server-only'
import Link from 'next/link'
import styles from './stationList.module.css'
import getStations from '../services/api/getStations'

export default async function StationList() {
      const stations = await getStations()
      return (
            <div className={styles.container}>
                  {stations.map((station) => (
                        <Link
                              className={styles.item}
                              key={station.name}
                              href={`/player/${encodeURIComponent(
                                    station.name
                              )}`}
                        >
                              <h5>{station.name} </h5>
                        </Link>
                  ))}
            </div>
      )
}
