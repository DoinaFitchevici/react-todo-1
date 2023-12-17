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
    const data = await response.json();
    const todos = data.records.map((record) => ({
      id: record.id,
      title: record.fields.title,
      completed: record.fields.completed,
    }));
    return todos;
  } catch (error) {
    console.log("Error fetching data: ", error);
    throw error;
  }
};

export { fetchData };
