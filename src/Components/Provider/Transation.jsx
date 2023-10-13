import WalletHistory from "../WalletHistery"
import { useSelector } from "react-redux";

const Transation = () => {

    const {walletHistory} = useSelector((state) => state.provider.providerData);

  return (
    <>
        <div className="mb-10">
            <WalletHistory role='provider' walletHistory={walletHistory}/>
        </div>
    </>
  )
}

export default Transation