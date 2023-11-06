import Calculator from '../components/Calculator'
import ContractRequestForm from '../components/ContractRequestForm'
import { Ingress } from '../components/Ingress'
import { SectionDivider } from '../components/common'

const Home = () => (
  <>
    <Ingress />
    <Calculator />
    <SectionDivider />
    <ContractRequestForm />
  </>
)

export default Home
