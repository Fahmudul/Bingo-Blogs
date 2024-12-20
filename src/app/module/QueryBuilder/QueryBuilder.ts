import { FilterQuery, Query, Types } from 'mongoose';

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;
  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  // Search
  search(searchAbleFields: string[]) {
    // console.log(searchAbleFields);
    const searchTerm = this?.query?.search;
    let searchField = {};
    if (searchTerm) {
      searchField = {
        $or: searchAbleFields.map(
          (field) =>
            ({
              [field]: { $regex: searchTerm, $options: 'i' },
            }) as FilterQuery<T>,
        ),
      };
    }
    if (searchTerm) {
      this.modelQuery = this.modelQuery.find(searchField);
    }
    return this;
  }
  // Filter by author id
  filter() {
    const queryObj = { ...this.query };
    const excludedFileds = ['search', 'sortBy', 'sortOrder'];
    excludedFileds.forEach((val) => delete queryObj[val]);
    Object.keys(queryObj).forEach((key) => {
      queryObj[key] = new Types.ObjectId(queryObj[key] as string);
    });
    let searchField = {};
    if (queryObj.filter) {
      searchField = {
        author: new Types.ObjectId(queryObj.filter as string),
      };
    }
    this.modelQuery = this.modelQuery.find(searchField);
    return this;
  }
  // sortBY
  sort() {
    const sortBy =
      (this?.query?.sortBy as string)?.split(',').join(' ') || '-createdAt';
    const sortOrder = (this?.query?.sortOrder as string) === 'desc' ? -1 : 1;
    this.modelQuery = this.modelQuery.sort({ [sortBy]: sortOrder });
    return this;
  }
  // sortOrder
  // sortOrder() {
  //   const sortOrder = (this?.query?.sortOrder as string) || 'desc';
  //   this.modelQuery = this.modelQuery.sort(sortOrder);
  //   return this;
  // }
}

export default QueryBuilder;
