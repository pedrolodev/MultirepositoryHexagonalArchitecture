import { RadioType } from '../../../schemas/radioSchema'
import saveStation from '../../../services/api/saveStation'
import AddRadioForm from './saveRadioForm'

export default function AdminPage() {
      const action = async (radio: RadioType) => {
            'use server'
            return await saveStation(radio)
      }

      return <AddRadioForm action={action} />
}
