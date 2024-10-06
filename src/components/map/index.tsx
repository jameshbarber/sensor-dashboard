'use client'
// ES6
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';


const Map = ReactMapboxGl({
  accessToken:
    'pk.eyJ1Ijoic2FtYWxleGFuZGVybWFzdGVycyIsImEiOiJjbGcwanlrM2swdGhhM3BwOW94NWloOGF5In0.Wp0AP1IVbNwI6zkZ26U2Ag'
});

const ClientMap = ({ features }: { features: { latitude?: number, longitude?: number }[] }) => {
  return <Map
    // style="mapbox://styles/mapbox/streets-v9"
    containerStyle={{
      height: '80vh',
      width: "100%"
    }}
  >
    {features?.map((feature, index) => (
      <Layer key={index} type="symbol" id={"marker"+index}>
        <Feature coordinates={[feature.longitude, feature.latitude]} />
      </Layer>
    ))}

  </Map>;
}


export default ClientMap