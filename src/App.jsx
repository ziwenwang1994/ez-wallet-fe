import { web3ServiceProviders } from "./const/mock";
import { useEffect, useState } from "react";
import { Home } from "./pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import EZHeader from "./components/EZHeader";
import CreateWallet from "./pages/CreateWallet";
import store from "store2";
import MyWallet from "./pages/MyWallet";
import RecoverWallet from "./pages/RecoverWallet";

function App() {
  const [provider, setProvider] = useState(web3ServiceProviders[0]?.value);
  const [wallet, setWallet] = useState(store("address") || "");
  const [seedPhrase, setSeedPhrase] = useState(store("seedPhrase") || "");
  useEffect(() => {
    store("seedPhrase", seedPhrase);
  }, [seedPhrase]);
  useEffect(() => {
    store("address", wallet);
  }, [wallet]);
  return (
    <>
      <main className="h-[600px] bg-[#edf8fa] w-[350px] overflow-hidden">
        <EZHeader
          provider={provider}
          setProvider={setProvider}
          web3ServiceProviders={web3ServiceProviders}
        />
        <BrowserRouter>
          {(!wallet && (
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/create"
                element={
                  <CreateWallet
                    setSeedPhrase={setSeedPhrase}
                    setWallet={setWallet}
                    provider={provider}
                  />
                }
              />
              <Route
                path="/recover"
                element={
                  <RecoverWallet
                    setSeedPhrase={setSeedPhrase}
                    setWallet={setWallet}
                    provider={provider}
                  />
                }
              />
            </Routes>
          )) || (
            <Routes>
              <Route
                path="/"
                element={
                  <MyWallet
                    wallet={wallet}
                    setSeedPhrase={setSeedPhrase}
                    setWallet={setWallet}
                  />
                }
              />
            </Routes>
          )}
        </BrowserRouter>
      </main>
    </>
  );
}

export default App;
