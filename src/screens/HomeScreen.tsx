import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Text, Button, TextInput } from "react-native-paper";
import { useAuthorization } from "../utils/useAuthorization";
import { deposit, withdraw } from "../contract";
import { AnchorWallet } from "../utils/AnchorWallet";

export function HomeScreen() {
  const { selectedAccount } = useAuthorization();
  const [amount, setAmount] = useState("");

  const handleDeposit = async () => {
    if (selectedAccount && 'signTransaction' in selectedAccount && 'signAllTransactions' in selectedAccount) {
      const signature = await deposit(selectedAccount as AnchorWallet, parseInt(amount));
      console.log("Transaction signature:", signature);
    } else {
      console.log("Wallet not connected or missing required properties");
    }
  };

  const handleWithdraw = async () => {
    if (selectedAccount) {
      const signature = await withdraw(selectedAccount as unknown as AnchorWallet, parseInt(amount));
      console.log("Transaction signature:", signature);
    } else {
      console.log("Wallet not connected");
    }
  };

  return (
    <View
      style={[
        styles.screenContainer,
        !selectedAccount && styles.centerContent,
      ]}
    >
      <Text
        style={{ fontWeight: "bold", marginBottom: 12, textAlign: "center" }}
        variant="displaySmall"
      >
        HODL
      </Text>
      {selectedAccount ? (
        <View>
          <TextInput
            placeholder="Amount"
            value={amount}
            onChangeText={setAmount}
            keyboardType="numeric"
          />
          <Button mode="contained" onPress={handleDeposit}>
            Deposit
          </Button>
          <Button mode="contained" onPress={handleWithdraw}>
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
    padding: 16,
    flex: 1,
  },
  centerContent: {
    alignItems: "center",
    justifyContent: "center",
  },
});