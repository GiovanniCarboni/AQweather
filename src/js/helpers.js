export const formatDate = function (date) {
  const timestamp = new Date(date * 1000);
  return {
    day: timestamp.getDate(),
    month: timestamp.getMonth(),
    time: `${String(timestamp.getHours()).padStart(2, "0")}:${String(
      timestamp.getMinutes()
    ).padStart(2, "0")}`,
  };
};

export const getJSON = async function (url) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("data does not exist");
    const data = await res.json();
    return data;
  } catch (err) {
    throw err;
  }
};
