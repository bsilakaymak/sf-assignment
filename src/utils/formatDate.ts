export const formatDate = (dateString: Date) => {
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
  } as const;

  const date = new Date(dateString);
  return date.toLocaleDateString("nl-NL", options);
};
