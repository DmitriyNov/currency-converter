const createRequest = async (options) => {
    const request = fetch(options.url, options.data);
    const result = await request;
    const response = await result.json();
    if (!result.ok) {
      alert(response.message);
      return;
    }
    options.callback(response);
};

export default createRequest;
