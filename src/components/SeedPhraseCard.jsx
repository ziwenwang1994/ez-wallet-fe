import { Button } from "antd";
import TextArea from "antd/es/input/TextArea";
import useClipboardApi from "use-clipboard-api";

export default function SeedPhraseCard({ seedPhrase }) {
    const [value, copy] = useClipboardApi();
    function copySeed() {
        copy(seedPhrase);
    }
  return (
    <div className="relative">
      <TextArea
        readOnly
        className="resize-none"
        rows={4}
        value={seedPhrase}
      />
      <Button className="absolute bottom-[8px] right-[8px]" onClick={copySeed}>{ !value ? "Copy" : "Copied"}</Button>
    </div>
  );
}
