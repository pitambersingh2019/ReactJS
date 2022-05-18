export const SaveChangesToastDetails = () => {
  return {
    success: {
      Title: "Changes saved successfully",
      SubTitle: "The action completed",
    },
    pending: {
      Title: "Loading please wait...",
      SubTitle: "",
    },
    error: {
      Title: "Error",
      SubTitle: "The action didn't complete",
    },
  };
};
