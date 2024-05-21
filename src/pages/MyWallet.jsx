import { LogoutOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import TokenCard from "../components/TokenCard";
import axios from "axios";

export default function MyWallet({ wallet, setWallet, setSeedPhrase, provider }) {
  const [tokens, setTokens] = useState([]);
  const [tokenElements, setTokenElements] = useState([]);
  const [fetched, setFetched] = useState(false);
  const [error, setError] = useState(null);

  function logout() {
    setWallet("");
    setSeedPhrase("");
  }

  async function getTokenIcon(metadataUri) {
    try {
      const response = await axios.get(metadataUri);
      return response.data.image;
    } catch (error) {
      console.error("Error fetching token icon:", error);
      return null;
    }
  }

  useEffect(() => {
    const fetchWalletData = async () => {
      try {
        const { data } = await axios.get(
          `http://127.0.0.1:3000/wallet?public_key=${wallet}&provider=${provider}`
        );
        const filteredTokens = data.tokens?.filter((el) => !!el.metadata) || [];
        setTokens(filteredTokens);
      } catch (err) {
        console.error("Error fetching wallet data:", err);
        setError("Failed to fetch wallet data. Please try again.");
      } finally {
        setFetched(true);
      }
    };

    if (wallet) {
      fetchWalletData();
    }
  }, [wallet]);

  useEffect(() => {
    const fetchTokenIcons = async () => {
      const tokenList = [];

      for (const token of tokens) {
        const { metadata, tokenAccount } = token;
        if (metadata) {
          const metadataUri = metadata.data.data.uri;
          const iconUrl = await getTokenIcon(metadataUri);
          tokenList.push(
            <TokenCard
              key={tokenAccount.pubkey}
              name={metadata.data.data.name}
              icon={iconUrl}
              amount={tokenAccount.account.data.parsed.info.tokenAmount.amount}
            />
          );
        }
      }

      setTokenElements(tokenList);
    };

    if (tokens.length > 0) {
      fetchTokenIcons();
    }
  }, [tokens]);

  return (
    <div className="p-[8px]">
      <nav className="flex justify-between items-center">
        <p>
          Wallet Address {wallet.slice(0, 4)}...
          {wallet.slice(wallet.length - 4)}
        </p>
        <LogoutOutlined onClick={logout} />
      </nav>
      <section>
        {(error && fetched && <p className="text-red-500">{error}</p>) ||
        (fetched && !error)
          ? tokenElements.length > 0
            ? tokenElements
            : "You do not have any tokens"
          : "Loading..."}
      </section>
    </div>
  );
}
