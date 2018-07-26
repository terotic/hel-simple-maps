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

### Fetch Neighborhood Borders

We fetch the neighborhood area geometries from City of Helsinki [Open WMS API](https://kartta.hel.fi/ws/geoserver/avoindata/wms?request=getCapabilities). The data is served in EPSG:3879 projection but we want the resulting GeoJSON to use standard WGS84 as specified in [GThe GeoJSON Specification](http://geojson.org) (RFC 7946).

For projection conversion we use [ogr2ogr](http://www.gdal.org/ogr2ogr.html).
```
curl "https://kartta.hel.fi/ws/geoserver/avoindata/wfs?request=getFeature&typename=avoindata:Kaupunginosajako&outputFormat=application/json" | ogr2ogr -f GeoJSON -t_srs EPSG:4326 -s_srs EPSG:3879 helsinki-hoods-wgs84-geo.json /vsistdin/
```

Most browser map visalization libraries prefer or require [topojson](https://github.com/topojson/topojson/wiki) format. For format conversion we use [Mapshaper](https://github.com/mbloch/mapshaper). (For some currently unknown reason using [geo2topo](https://github.com/topojson/topojson-server/blob/master/README.md#geo2topo) produces strange results with this source data).

As we convert to topojson we also simplify the geometries.

```
mapshaper helsinki-hoods-wgs84-geo.json -simplify 10% -o format=topojson helsinki-hoods-topo.json
```

Resulting file `helsinki-hoods-topo.json` is ready to be used with **react-simple-maps**.

### Fetch Sea Mask

For the sea area masking we use Land Use -geometry from the same source. Conversion as previously.

```
curl "https://kartta.hel.fi/ws/geoserver/avoindata/wfs?request=getFeature&typename=avoindata:Seutukartta_maankaytto_ja_vesistot&outputFormat=application/json" | ogr2ogr -f GeoJSON -t_srs EPSG:4326 -s_srs EPSG:3879 helsinki_maankaytto-wgs84.geojson /vsistdin/
```

This dataset is very large (18,5MB) and includes a lot of unneeded data layers. For filtering the needed sea area we use ndjson command line tool.

```
ndjson-cat helsinki_maankaytto-wgs84.geojson \
| ndjson-split 'd.features' \
| ndjson-filter 'd.properties.kohdenimi === "Vesistö_meri"' \
> helsinki-landuse-sea.json
```
Then again we use Mapshaper to create a clean topojson.

```
mapshaper helsinki-landuse-sea.json -simplify 10% -o format=topojson helsinki-sea-topo.json
```
