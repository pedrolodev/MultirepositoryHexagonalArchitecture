import { Suspense } from 'react'
import StationList from './components/stationList'
import LoadSpinner from './shared/components/loadSpinner'

export default function PageRoot() {
      return (
            <>
                  <Suspense fallback={<LoadSpinner />}>
                        <StationList />
                  </Suspense>
            </>
      )
}
