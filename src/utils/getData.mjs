import fetch from 'node-fetch';
import {
  keys
} from './tools/responseKeys.mjs';
import {
  transformToJSON as convertToJSON
} from './convertToObj.mjs';

// Converts response to a CSV-ready line with chosen fields
function dataItemResult(res, fields, cb, dataPath) {
  const result =
    fields.reduce((acc, x) => (acc += `${keys(res)[x]};`), '') + '\n';
  console.log(result)
  cb(dataPath, result);
}

// Adds ev listener and aborts fetch if clicked (use inside of fetching func)
function controllerAbort(controller, btn) {
  if (typeof window !== 'undefined') {
    btn.addEventListener('click', () => {
      controller.abort();
    });
    // abort
    if (!!controller.signal.aborted) {
      return true
    }
  }
  return false;
}

// Gets responses and transforms them to JSON + pushing to resulting array
function fetchAndProcessData(items, index, converted, controller, fields, dataPath, errorsPath, cb, abortButton) {
  if (!!controllerAbort(controller, abortButton)) {
    return
  }

  let n = items.length;

  fetch(items[index],
      controller.signal
    )
    .then(res => res.text())
    .then(JSON.parse)
    .then(x => {
      console.log(`${index + 1} / ${n}`);
      dataItemResult(x, fields, cb, dataPath);
    })
    .catch(e => {
      const error = `${converted[index].address}; -- ${e};\n`;
      console.log(`${converted[index].address}; -- ${e};\n`);
      !!errorsPath ? cb(errorsPath, error) : cb(dataPath, error);
    });
}


export function getData(data, key, fields, dataPath, errorsPath, cb, abortBtn) {
  const converted = convertToJSON(data).filter(x => x.address != undefined);
  const urls = converted.map(
    url =>
    `https://geocode-maps.yandex.ru/1.x/?format=json&?apikey=${key}&geocode=${encodeURI(
        url.address
      )}`
  );
  // Settings and dataholders  
  const timeout = 500;
  const controller = typeof window !== 'undefined' ? new AbortController() : '';

  for (let i = 0; i < urls.length; i++) {
    setTimeout(() => {
      fetchAndProcessData(urls, i, converted,
        controller, fields, dataPath, errorsPath, cb, abortBtn);
    }, timeout * i);
  }
}
