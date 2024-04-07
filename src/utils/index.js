export const getCurrentPageJobs = (page, itemsPerPage, data) => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data?.slice(startIndex, endIndex);
  };


  export const getTotalPages = (itemsPerPage, data) => {
    return Math.ceil(data.length / itemsPerPage);
  };