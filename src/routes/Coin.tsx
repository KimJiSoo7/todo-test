import { useParams } from "react-router";

function Coin() {
  //   const { coinId } = useParams<{ coinId: string }>();
  const { coinId } = useParams();
  return <h1>Coin: {coinId}</h1>;
}
export default Coin;
