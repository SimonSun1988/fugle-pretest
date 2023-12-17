
module.exports = async (rawValue) => {
  try {
    return JSON.parse(rawValue);
  } catch (e) {
    return rawValue;
  }
};