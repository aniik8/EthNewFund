import server from "./server";
import * as secp from "ethereum-cryptography/secp256k1";
import {toHex} from "ethereum-cryptography/utils";
function Wallet({ address, setAddress, balance, privateKey,setBalance, setPrivateKey }) {
  async function onChange(evt) {
   
    setPrivateKey(evt.target.value);
    const address = toHex(secp.secp256k1.getPublicKey(privateKey));
    setAddress(address);
    if (address) {
      const {
        data: { balance },
      } = await server.get(`balance/${address}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        Private Key
        <input placeholder="Type Private key 0x1" value={privateKey} onChange={onChange}></input>
      </label>
        <div>
          address : {address.slice(0,15)}...
        </div>
      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
