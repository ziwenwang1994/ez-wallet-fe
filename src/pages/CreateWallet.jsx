import { useState, useEffect } from "react";
import EZButton from "../components/EZButton";
import { useNavigate } from "react-router-dom";
import store from "store2";
import SeedPhraseCard from "../components/SeedPhraseCard";

export default function CreateWallet({ setWallet, setSeedPhrase, provider }) {
  const [newSeedPhrase, setNewSeedPhrase] = useState("");
  const [newAddress, setNewAddress] = useState("");
  const navigate = useNavigate();
  async function createWallet() {
    try {
      const res = await (
        await fetch(`http://127.0.0.1:3000/new-seed?provider=${provider}`)
      ).json();
      setNewSeedPhrase(res.mnemonic);
      setNewAddress(res.account);
    } catch (error) {
      console.error(error);
    }
  }
  function useThisWallet() {
    setWallet(newAddress);
    setSeedPhrase(newSeedPhrase);
    navigate("/");
  }
  useEffect(() => {
    store.remove("address");
    store.remove("seedPhrase");
  }, []);
  return (
    <div className="my-[8px] p-[8px]">
      <h2>Create A New Etherum Wallet</h2>
      <p className="p-[8px] radius-[8px] bg-[#f8d7b5ad] text-[12px] text-center my-[16px]">
        You can click the Generate Wallet button to generate a mnemonic phrase,
        and you will need to remember these mnemonics in a reliable place. It is
        your only means of logging into your wallet.
      </p>
      <SeedPhraseCard seedPhrase={newSeedPhrase} />
      <section>
        <EZButton type="primary" onClick={createWallet}>
          Generate Seed Phrase
        </EZButton>
        <EZButton type="primary" onClick={useThisWallet} disabled={!newAddress}>
          Use this wallet
        </EZButton>
        <EZButton onClick={() => navigate("/")}>Back Home</EZButton>
      </section>
    </div>
  );
}
