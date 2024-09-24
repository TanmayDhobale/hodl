import { PublicKey, Transaction, SystemProgram } from '@solana/web3.js';
import { useConnection } from './utils/ConnectionProvider';
import { AnchorWallet } from './utils/AnchorWallet'; 

const VAULT_PUBLIC_KEY = new PublicKey('VaultPublicKey'); // Replace with your vault public key

export const deposit = async (wallet: AnchorWallet, amount: number) => {
  const { connection } = useConnection();
  const transaction = new Transaction().add(
    SystemProgram.transfer({
      fromPubkey: wallet.publicKey,
      toPubkey: VAULT_PUBLIC_KEY,
      lamports: amount,
    })
  );

  const signedTransaction = await wallet.signTransaction(transaction);
  const signature = await connection.sendRawTransaction(signedTransaction.serialize());
  await connection.confirmTransaction(signature, 'processed');
  return signature;
};

export const withdraw = async (wallet: any, amount: number) => {
  const { connection } = useConnection();
  const transaction = new Transaction().add(
    SystemProgram.transfer({
      fromPubkey: VAULT_PUBLIC_KEY,
      toPubkey: wallet.publicKey,
      lamports: amount,
    })
  );

  const signedTransaction = await wallet.signTransaction(transaction);
  const signature = await connection.sendRawTransaction(signedTransaction.serialize());
  await connection.confirmTransaction(signature, 'processed');
  return signature;
};