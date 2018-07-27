## React App UI

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

For displaying the map we use [react-simple-maps](https://www.react-simple-maps.io/) library.

## Preparing Geo Data

This is the current command line workflow for collecting the needed geo data and converting it for simplified browser viewing. In the future this ought to be automated, but for now needs some manual command line trickery.

### Install Command Line Tools

Install [GDAL](http://trac.osgeo.org/gdal/wiki/DownloadingGdalBinaries) command line tool ogr2ogr.

Install [Mapshaper](https://github.com/mbloch/mapshaper): `npm install -g mapshaper`

install
[ndjson command line tools](https://github.com/mbostock/ndjson-cli): `npm -g install ndjson-cli`

### Fetch Neighborhood Geometries and Sea Mask

We fetch the neighborhood area geometries from City of Helsinki [Open WMS API](https://geoserver.hel.fi/ws/geoserver/avoindata/wms?request=getCapabilities).

Make sure you fetch data in standard WGS84 projection as specified in [GThe GeoJSON Specification](http://geojson.org) (RFC 7946).

```
curl "https://geoserver.hel.fi/geoserver/hel/ows?service=WFS&version=2.0.0&request=GetFeature&typeName=hel:kaupunginosa&maxFeatures=1000000&outputFormat=application%2Fjson&srsName=EPSG%3A4326" > raw/helsinki_hoods-geo.json
```

Most browser map visalization libraries prefer or require [topojson](https://github.com/topojson/topojson/wiki) format. For format conversion we use [Mapshaper](https://github.com/mbloch/mapshaper). (For some currently unknown reason using [geo2topo](https://github.com/topojson/topojson-server/blob/master/README.md#geo2topo) produces strange results with this source data).

As we convert to topojson we also simplify the geometries.

```
mapshaper raw/helsinki_hoods-geo.json -simplify 10% -o format=topojson helsinki-hoods-topo.json
```

Then same steps with sea areas mask.

Featch

```
curl "https://geoserver.hel.fi/geoserver/seutukartta/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=seutukartta:Vakavesi_meri&maxFeatures=1000000&outputFormat=application%2Fjson&srsName=EPSG%3A4326" > raw/helsinki-sea-geo.json
```
And convert

```
mapshaper raw/helsinki-sea-geo.json -simplify 10% -o format=topojson helsinki-sea-topo.json
```
