app.get("/", async (req, res) => {
  const auth = new google.auth.GoogleAuth({
    keyFile: "credentials.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets",
  });
  const spreadsheetId = "1jWDNf2xga6KzFWztugj-0QuZva75xbaA3r4HrexgnBs";
  const client = await auth.getClient();
  const googleSheets = google.sheets({ version: "v4", auth: client });
  //   const meta = await googleSheets.spreadsheets.get({
  //     auth,
  //     spreadsheetId: "1msWTvOCr08EH9a5e67aP49Sf_HaTuTqueMAR6fSjljQ",
  //   });
  const { data } = await googleSheets.spreadsheets.values.get({
    auth,
    spreadsheetId,
    range: "3 year",
  });
  await googleSheets.spreadsheets.values.append({
    auth,
    spreadsheetId,
    range: "3 year",
    valueInputOption: "USER_ENTERED",
    resource: {
      values: [["ba", "mulyarchik"]],
    },
  });
  res.send("success");
});
