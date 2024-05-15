import { Select } from "antd";
import Logo from "./Logo";
import React from "react";

function EZHeader({
    web3ServiceProviders, provider, setProvider
}) {
    return <header className="flex p-[8px] w-[100%] justify-between">
    <Logo />
    <Select
      options={web3ServiceProviders}
      defaultValue={web3ServiceProviders[0]}
      value={provider}
      onChange={setProvider}
    />
  </header>
}

const MemoEZHeader = React.memo(EZHeader);

export default MemoEZHeader;