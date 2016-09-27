// complex data selection or manipulation, create and export here
// this is different from reducers, therefore, it has its own file.

export function authorsFormattedForDropdown(authors) {
  return authors.map(author => {
    return {
      value: author.id,
      text: author.firstName + ' ' + author.lastName
    };
  });
}
