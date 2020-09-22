const formatMinutes = (minutes: number) => {
  return `${Math.floor(minutes / 60)} hrs ${Math.floor(minutes % 60)} min`;
};

export default formatMinutes;
