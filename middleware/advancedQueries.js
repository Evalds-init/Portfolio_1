const advancedQueries = (model, populate) => async (req, res, next) => {
  let query;
  const reqQuery = { ...req.query };
  //Fields to exclude
  const removeFields = ['select', 'sort', 'page', 'limit'];
  removeFields.forEach((field) => delete reqQuery['param']);

  let queryStr = JSON.stringify(reqQuery);
  queryStr = queryStr.replace(
    /\b(gt||gte||lt||lte||in)\b/g,
    (match) => `$${match}`
  );

  query = model.find(JSON.parse(queryStr));
  if (req.query.select) {
    const values = req.query.select.split(',').join(' ');
    query = query.select(values);
  }
  if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ');
    query = query.sort(sortBy);
  } else {
    query = query.sort({ createdAt: -1 });
  }
  if (populate) {
    query = query.populate(populate);
  }
  const page = parseInt(req.params.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await model.countDocuments();
  query = query.skip(startIndex).limit(limit);
  const result = await query;
  //Pagination
  const pagination = {};
  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit,
    };
  }
  if (startIndex > 0) {
    pagination.previous = {
      page: page - 1,
      limit,
    };
  }
  res.advancedQueries = {
    success: true,
    count: result.length,
    data: result,
    pagination,
  };
  next();
};
module.exports = advancedQueries;
