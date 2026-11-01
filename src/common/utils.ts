export class CommonUtils {
  // Calculates pagination values.
  public static getPagination(page = 1, limit = 10) {
    const currentPage = Math.max(1, Math.floor(page));
    const pageSize = Math.min(100, Math.max(1, Math.floor(limit)));

    return {
      page: currentPage,
      limit: pageSize,
      skip: (currentPage - 1) * pageSize,
    };
  }
}
