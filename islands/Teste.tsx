import { useState } from "preact/hooks";
export default function Teste() {
  const [teste, setTeste] = useState("Teste");
  return (
    <button
      onClick={() => {
        setTeste("Foi");
      }}
    >
      {teste}
    </button>
  );
}
