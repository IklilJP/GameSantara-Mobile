export const formatTime = (timestamp) => {
  const now = Date.now();
  const secondsAgo = Math.floor((now - timestamp) / 1000);

  if (secondsAgo < 60) {
    return `${secondsAgo} detik yang lalu`;
  } else if (secondsAgo < 3600) {
    return `${Math.floor(secondsAgo / 60)} menit yang lalu`;
  } else if (secondsAgo < 86400) {
    return `${Math.floor(secondsAgo / 3600)} jam yang lalu`;
  } else {
    return `${Math.floor(secondsAgo / 86400)} hari yang lalu`;
  }
};
