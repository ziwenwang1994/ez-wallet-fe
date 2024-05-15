/* eslint-disable react/prop-types */
import { Button } from "antd";

export default function EZButton({ type, onClick, children, disabled }) {
  return (
    <Button type={type} onClick={onClick} disabled={disabled} className="block w-[100%] my-[8px]" >
      {children}
    </Button>
  );
}
