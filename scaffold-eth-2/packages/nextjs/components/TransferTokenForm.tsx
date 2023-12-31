import { useState } from "react";
import { useContractWrite } from "wagmi";

type TransferTokenDto = { addressTo: string | undefined; amount: number | undefined };

export const TransferTokenForm = (params: { address: `0x${string}`; tokenAddress: string }) => {
  const { isLoading, isSuccess, write } = useContractWrite({
    address: params.tokenAddress,
    abi: [
      {
        inputs: [
          {
            internalType: "address",
            name: "to",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
        ],
        name: "transfer",
        outputs: [
          {
            internalType: "bool",
            name: "",
            type: "bool",
          },
        ],
        stateMutability: "nonpayable",
        type: "function",
      },
    ],
    functionName: "transfer",
    account: params.address,
  });
  const [formData, setFormData] = useState<TransferTokenDto>({
    addressTo: undefined,
    amount: undefined,
  });

  return (
    <div className="collapse collapse-arrow bg-primary text-primary-content px-6 py-2">
      <input type="checkbox" />
      <div className="collapse-title text-xl font-medium">Transfer Tokens</div>
      <div className="collapse-content">
        <form
          onSubmit={e => {
            e.preventDefault();
            if (!formData.addressTo || !formData.amount) return;
            write({ args: [formData.addressTo, formData.amount] });
          }}
        >
          <input
            onChange={e => setFormData({ ...formData, [e.target.name]: e.target.value })}
            name="addressTo"
            type="text"
            placeholder="Transfer to"
            className="input input-bordered w-full my-2"
          />
          <input
            onChange={e => setFormData({ ...formData, [e.target.name]: e.target.value })}
            name="amount"
            type="number"
            placeholder="Amount in decimals"
            className="input input-bordered w-full  my-2"
          />
          {!isSuccess ? (
            <button disabled={isLoading} type="submit" className="w-full btn btn-active btn-neutral mb-4 my-2">
              Transfer!
            </button>
          ) : (
            <p>Successfully transfered!</p>
          )}
        </form>
      </div>
    </div>
  );
};
