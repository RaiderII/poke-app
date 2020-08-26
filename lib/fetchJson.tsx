export default async function fetcher(...args: Parameters<typeof fetch>) {
  try {
    const response = await fetch(...args);

    // if the server replies, there's always some data in json
    // if there's a network error, it will throw at the previous line
    const data = await response.json();

    if (response.ok) {
      return data;
    }

    // const error: any = new Error(response.statusText);
    // console.log('MY ERROR', error);
    // console.log(typeof error);

    // error.response = response;

    // error.data = data;
    // console.log('error.response', error.response);
    // console.log('error.data', error.data);

    // throw error;
    throw Object.assign(new Error(response.statusText), { response, data });
  } catch (error) {
    if (!error.data) {
      error.data = { message: error.message };
    }
    throw error;
  }
}
