'use server'

const apiAddress = process.env.API_ADDRESS

export default async function getStations(): Promise<
      Array<{ name: string; url: string }>
> {
      const order = { orderBy: 'name', orderCategory: 'asc' }
      const serializedOrder = encodeURIComponent(JSON.stringify(order))

      const res = await fetch(
            `${apiAddress}/stations?order=${serializedOrder}`,
            {
                  next: { revalidate: 3600 }
            }
      )

      if (!res.ok) {
            throw new Error('Failed to fetch data')
      }

      const listData = await res.json()

      return listData
}
