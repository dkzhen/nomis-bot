const { default: axios } = require("axios");
const { validateToken } = require("./CheckValidToken");
const { getProfile } = require("./repo");

exports.startFarming = async () => {
  try {
    const tokens = await validateToken();
    for (const token of tokens) {
      const profile = await getProfile(token.token, token.userId);
      if (profile.nextFarmClaimAt == null) {
        await axios.post(
          "https://cms-tg.nomis.cc/api/ton-twa-users/start-farm",
          { userId: token.userId },
          {
            headers: {
              "Content-Length": "19",
              "Content-Type": "application/json",
              Origin: "https://telegram.nomis.cc",
              Priority: "u=1, i",
              Referer: "https://telegram.nomis.cc/",
              "Sec-Ch-Ua":
                '"Not/A)Brand";v="8", "Chromium";v="126", "Microsoft Edge";v="126", "Microsoft Edge WebView2";v="126"',
              "Sec-Ch-Ua-Mobile": "?0",
              "Sec-Ch-Ua-Platform": '"Windows"',
              "Sec-Fetch-Mode": "cors",
              "Sec-Fetch-Site": "same-site",
              "User-Agent":
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36 Edg/126.0.0.0",
              "X-App-Init-Data": token.token,
              Accept: "application/json, text/plain, */*",
              "Accept-Encoding": "gzip, deflate, br, zstd",
              "Accept-Language": "en-US,en;q=0.9",
            },
          }
        );
        console.log(`[ Completed ] : Farming started..`);
      } else {
        console.log(`[ Completed ] : Farming has been running..`);
      }
    }
  } catch (error) {
    console.log(error.message);
  }
};
