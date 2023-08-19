
import Expense from '../../components/consultant/Expense'
import Layout from '../../components/Layout'
import { useContextApi } from '../../context/Context'

const ConsultantPage = () => {
  const { user } = useContextApi()

  return (
    <Layout title={`${user ? user.name : 'user Detail'}`}>
      {user && <Expense />}
    </Layout>
  )
}

export default ConsultantPage
