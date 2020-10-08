function ConnectionSettings(props) {
  return (
    <Page>
      <Section
        title={<Text bold align="center">Heart of Frogg Settings</Text>}>
        <TextInput
    label="IP Address"
    settingsKey="ipAddress"
  />
        <TextInput
    label="Port"
    settingsKey="port"
  />
      </Section>
    </Page>
  );
}

registerSettingsPage(ConnectionSettings);