import { useState, useEffect } from "react";
import EZButton from "../components/EZButton";
import { useNavigate } from "react-router-dom";
import store from "store2";
import SeedPhraseCard from "../components/SeedPhraseCard";
import axios from "axios";

export default function CreateWallet({ setWallet, setSeedPhrase, provider }) {
  const [newSeedPhrase, setNewSeedPhrase] = useState("");
  const [newAddress, setNewAddress] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const createWallet = async () => {
    try {
      const res = await axios.get(`http://127.0.0.1:3000/new-seed?provider=${provider}`);
      if (res.data?.mnemonic && res.data?.account) {
        setNewSeedPhrase(res.data.mnemonic);
        setNewAddress(res.data.account);
        setError(null);
      } else {
        setError("Failed to generate wallet. Please try again.");
      }
    } catch (error) {
      console.error("Error creating wallet:", error);
      setError("An error occurred while generating the wallet. Please try again.");
    }
  };

  const useThisWallet = () => {
    setWallet(newAddress);
    setSeedPhrase(newSeedPhrase);
    const account = store("account") || {};
    account[provider] = newAddress;
    store("account", account);
    navigate("/");
  };

  useEffect(() => {
    store.remove("address");
    store.remove("seedPhrase");
  }, []);

  return (
    <div className="my-[8px] p-[8px]">
      <h2>Create A New Ethereum Wallet</h2>
      <p className="p-[8px] radius-[8px] bg-[#f8d7b5ad] text-[12px] text-center my-[16px]">
        You can click the Generate Wallet button to generate a mnemonic phrase,
        and you will need to remember these mnemonics in a reliable place. It is
        your only means of logging into your wallet.
      </p>
      {error && <p className="text-red-500">{error}</p>}
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
