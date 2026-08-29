/* Standard OpenStreetMap raster tiles — the one basemap source that's
   stayed genuinely free and keyless (CARTO's basemaps, tried first, now
   require an API key; verified by actually loading the tiles rather than
   trusting the docs). There's no separate dark tile set here, so dark mode
   applies a CSS filter (see .fieldpro-map-dark in globals.css) instead of a
   second tile source. */
export const MAP_TILE_URL = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

export const MAP_ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
