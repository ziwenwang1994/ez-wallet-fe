import TextArea from "antd/es/input/TextArea";
import { useState } from "react";
import EZButton from "../components/EZButton";
import { useNavigate } from "react-router-dom";

export default function RecoverWallet({ setSeedPhrase, setWallet, provider }) {
  const [typedSeedPhrase, setTypedSeedPhrase] = useState("");
  const navigate = useNavigate();
  async function recoverWallet() {
    const res = await (
      await fetch(`http://127.0.0.1:3000/recover`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phrase: typedSeedPhrase, provider }),
      })
    ).json();
    setSeedPhrase(typedSeedPhrase);
    setWallet(res.account);
    navigate("/");
  }
  return (
    <div className="p-[8px]">
      <h1>Please input your seed phrase below</h1>
      <TextArea
        rows={4}
        placeholder="Normaly a seed phrase has 12 words. Please use one space to separate words."
        value={typedSeedPhrase}
        onChange={(e) => setTypedSeedPhrase(e.target.value)}
      />
      <section>
        <EZButton
          type="primary"
          disabled={typedSeedPhrase.split(" ")?.length !== 12}
          onClick={recoverWallet}
        >
          Recover this account
        </EZButton>
        <EZButton onClick={() => navigate("/")}>Back Home</EZButton>
      </section>
    </div>
  );
}
