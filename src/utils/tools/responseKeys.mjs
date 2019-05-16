// Options of keys from Geocoder
export function keys(responseEntry) {
  const data =
    responseEntry.response['GeoObjectCollection']['featureMember'][0];

  let responseAddress = '';
  let lat = '';
  let lon = '';

  if (data) {
    responseAddress = `${data['GeoObject'].name} ${
      data['GeoObject'].description
    }`;

    [lon, lat] = data['GeoObject'].Point.pos.split(' ');
  }

  return {
    initialAddress: responseEntry.response['GeoObjectCollection']['metaDataProperty'][
      'GeocoderResponseMetaData'
    ].request,
    responseAddress,
    lat,
    lon,
  };
}
