import React from 'react';
import { View, Text } from 'react-native';
import { useHodlProgram } from '../components/hodl/hodl-data-access';

interface DepositData {
  amount: number;
  depositTimestamp: number;
  unlockTimestamp: number;
}

export function UserDepositInfo() {
  const { userDeposit } = useHodlProgram();

  if (userDeposit.isLoading) {
    return <Text>Loading deposit info...</Text>;
  }

  if (userDeposit.isError) {
    return <Text>Error loading deposit info</Text>;
  }

  if (!userDeposit.data) {
    return <Text>No deposit found</Text>;
  }

  return (
    <View>
      <Text>Deposit Amount: {(userDeposit.data as unknown as DepositData).amount.toString()} lamports</Text>
      <Text>Deposit Timestamp: {new Date((userDeposit.data.depositTimestamp as number) * 1000).toLocaleString()}</Text>
      <Text>Unlock Timestamp: {new Date((userDeposit.data.unlockTimestamp as number) * 1000).toLocaleString()}</Text>
    </View>
  );
}
