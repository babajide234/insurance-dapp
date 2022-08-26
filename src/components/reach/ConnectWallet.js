import React, { useContext } from "react";
import Button from "react-bootstrap/Button";
// import * as Reach from "@reach-sh/stdlib";
// import {  } from '@reach-sh/stdlib';
import { ALGO_MyAlgoConnect as MyAlgoConnect, loadStdlib } from '@reach-sh/stdlib';
import Algorand from "../../assets/algorand.png";
import { Context } from "../../Context";


const ConnectWallet = () => {
    const reach = loadStdlib('ALGO');
    // const reach = loadStdlib(process.env);

    reach.setWalletFallback(reach.walletFallback({providerEnv: 'TestNet', MyAlgoConnect }));

    const [account, setAccount, , setBalance, , , , , , , , , , , , setRegularPaymentCount] = useContext(Context);

    const connectWallet = async () => {

        const acc = await reach.getDefaultAccount();
        const balAtomic = await reach.balanceOf(acc);
        const bal = reach.formatCurrency(balAtomic, 4);

        setAccount(Object.assign({}, acc));

        setBalance(bal);

        setRegularPaymentCount(1);
    }

    const buttonStyle = {
        bottom: "2em",
        right: "2em",
    }



    return Object.keys(account).length === 0 ? (
        <Button variant="dark"
            style={buttonStyle}
            className="position-absolute m-3"
            onClick={connectWallet}
            size="lg">
            <img src={Algorand} alt="Algorand Logo" width="30" />
            {" "}<p className="d-inline-block mb-1 ml-1">Connect Wallet</p>
        </Button>
    ) : <div />;
}

export default ConnectWallet;