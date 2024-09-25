import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Text, Button, TextInput } from "react-native-paper";
import { useAuthorization } from "../utils/useAuthorization";
import { useHodlProgram } from "../components/hodl/hodl-data-access";
import { UserDepositInfo } from "../components/UserDepositInfo";

export function HomeScreen() {
  const { selectedAccount } = useAuthorization();
  const [amount, setAmount] = useState("");
  const { deposit, withdraw } = useHodlProgram();

  const handleDeposit = async () => {
    if (selectedAccount) {
      try {
        await deposit.mutateAsync({
          hodlAccount: selectedAccount.publicKey,
          amount: parseInt(amount),
          userTokenAccount: selectedAccount.publicKey, // This should be the actual token account
        });
        console.log("Deposit successful");
      } catch (error) {
        console.error("Error depositing:", error);
      }
    }
  };

  const handleWithdraw = async () => {
    if (selectedAccount) {
      try {
        await withdraw.mutateAsync({
          hodlAccount: selectedAccount.publicKey,
          userTokenAccount: selectedAccount.publicKey, // This should be the actual token account
        });
        console.log("Withdrawal successful");
      } catch (error) {
        console.error("Error withdrawing:", error);
      }
    }
  };

  return (
    <View style={styles.screenContainer}>
      <Text variant="displaySmall" style={styles.title}>
        HODL
      </Text>
      {selectedAccount ? (
        <View>
          <UserDepositInfo />
          <TextInput
            placeholder="Amount"
            value={amount}
            onChangeText={setAmount}
            keyboardType="numeric"
            style={styles.input}
          />
          <Button mode="contained" onPress={handleDeposit} style={styles.button}>
            Deposit
          </Button>
          <Button mode="contained" onPress={handleWithdraw} style={styles.button}>
            Withdraw
          </Button>
        </View>
      ) : (
        <Text>Connect your wallet to get started</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginBottom: 8,
  },
});