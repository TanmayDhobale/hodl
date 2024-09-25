const { withAndroidManifest } = require('@expo/config-plugins');

const withAndroidMobileWalletAdapter = (config) => {
  return withAndroidManifest(config, async (config) => {
    const androidManifest = config.modResults.manifest;

    const applicationElement = androidManifest['application'][0];
    const activityElement = applicationElement['activity'].find(
      (activity) => activity.$['android:name'] === '.MainActivity'
    );

    activityElement['intent-filter'] = [
      ...(activityElement['intent-filter'] || []),
      {
        action: [{ $: { 'android:name': 'android.intent.action.VIEW' } }],
        data: [{ $: { 'android:scheme': 'solana-wallet' } }],
        category: [{ $: { 'android:name': 'android.intent.category.DEFAULT' } }],
      },
    ];

    return config;
  });
};

module.exports = withAndroidMobileWalletAdapter;