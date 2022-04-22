export const getColor = (factor?: number) => {
  const colors = [
    "red",
    "green",
    "blue",
    "orange",
    "purple",
    "gray",
    "teal",
    "yellow",
  ];

  const index =
    !Number.isNaN(factor) && factor > 0 && factor <= colors.length
      ? factor - 1
      : Math.floor(Math.random() * colors.length);

  return colors[index];
};
