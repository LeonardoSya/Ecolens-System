import  { useEffect } from 'react';
import {fromLonLat} from 'ol/proj';
import {toLonLat} from 'ol/proj';
import TileLayer from 'ol/layer/Tile';
import { XYZ } from 'ol/source';
import View from 'ol/View';
import Map from 'ol/Map';

function Xylophilus  () {

    useEffect(() => {
        const info = [
            {id:'2ce48a09-3160-46ef-9349-76b5bde1caae', center: [112.678303857182, 24.341823323344173], zoom: 12.5},
            {id:'61f9b270-a42c-4d9e-a9dc-ac3af586b313',center: [112.678303857182, 24.341823323344173], zoom: 12.5},
            {id:'e8826544-2b17-478c-b7bc-9523a8489777',center: [], zoom: 1},
            {id:'02067963-3cde-46b5-ab9d-b64247a5fbbf',center: [ 112.61018989861932, 24.490263640929726 ], zoom: 16.7},
            {id:'66ba550a-a9f6-473e-af66-d22d8d1d1a9b',center: [], zoom: 1},
            {id:'a91ffe76-5903-4911-9cc9-18b3fb4651a6',center: [], zoom: 1},
        ]
        const item = info[3]
        const map = new Map({
            controls: [],
            target: 'map',
            layers: [
                new TileLayer({
                    source: new XYZ({
                        url: `http://zh01.stgz.org.cn/mapzonegis/yangshan-temp/${item.id}/{z}/{x}/{y}/tile.png?tk=d26ca22d-a029-419e-9bdf-c2e7d3b52aa2`,
                        projection:  'EPSG:4326',
                        crossOrigin: 'anonymous',
                    }),
                }),
            ],
            view: new View({
                center: fromLonLat(item.center),
                zoom: item.zoom
            })
        });
        window._mapKitState = {
            map,
            fromLonLat,
            toLonLat
        }
        return () => map.setTarget(undefined);
    }, []);
    return <div id="map" style={{width: '100vw', height: '100vh'}}></div>
}

export default Xylophilus;