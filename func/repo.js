const { default: axios } = require("axios");

exports.getProfile = async (token, userId) => {
  try {
    const API_URL =
      "https://cms-tg.nomis.cc/api/ton-twa-users/farm-data?user_id=" + userId;
    const profile = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return profile.data;
  } catch (error) {
    throw error.response.status;
  }
};
