const [error, response] = await tryToCatch(fetch, 'https://arthur.place');
const [error1, response1] = tryCatch(fn, 'https://arthur.place');
