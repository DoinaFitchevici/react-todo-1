const fetchData = async () => {
  const sortByLastModifiedTime =
    "?sort[0][field]=completed&sort[0][direction]=asc&sort[1][field]=lastModifiedTime&sort[1][direction]=asc";

  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_TOKEN}`,
    },
  };

  const url = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${process.env.REACT_APP_TABLE_NAME}${sortByLastModifiedTime}`;

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const { records } = await response.json();
    const todos = records.map(({ fields: { title, completed }, id }) => ({
      id,
      title,
      completed,
    }));
    return todos;
  } catch (error) {
    throw new Error(`Error fetching data: ${error.message}`);
  }
};

export { fetchData };
