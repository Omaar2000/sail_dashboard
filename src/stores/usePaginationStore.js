import create from "zustand";

const usePaginationStore = create((set) => ({
  page: 1,
  pageSize: 10,
  totalPages: 1,
  keyword: "",
  setPage: (newPage) => set({ page: newPage }),
  setPageSize: (newPageSize) => set({ pageSize: newPageSize, page: 1 }), // Reset page to 0 when page size changes
  setTotalPages: (totalPages) => set({ totalPages: totalPages }),
  setKeyword: (keyword) => set({ keyword: keyword }),
}));

export default usePaginationStore;
