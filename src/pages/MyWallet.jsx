import { LogoutOutlined } from "@ant-design/icons";

export default function MyWallet({wallet, setWallet, setSeedPhrase}) {
    function logout() {
        setWallet("");
        setSeedPhrase("");
    }
  return (
    <div className="p-[8px]">
      <nav className="flex justify-between items-center">
        <p>Wallet Address {wallet.slice(0, 4)}...{wallet.slice(wallet.length - 4)}</p>
        <LogoutOutlined onClick={logout} />
      </nav>
    </div>
  );
}
