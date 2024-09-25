const withAndroidMobileWalletAdapter = (config) => {
    return {
      ...config,
      plugins: [
        ...(config.plugins || []),
        [
          "@solana-mobile/mobile-wallet-adapter-protocol",
          {
            reactNativeVersion: "0.70.5", 
          },
        ],
      ],
    };
  };

  module.exports = withAndroidMobileWalletAdapter;