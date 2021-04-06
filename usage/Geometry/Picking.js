import React from 'react';
import ReactDOM from 'react-dom';

import { View, GeometryRepresentation, PolyData, PointData, DataArray } from 'react-vtk-js';

const points = [];
const scalars = []
for (let i = 0; i < 1000; i++) {
  scalars.push(Math.random());
  points.push(Math.random());
  points.push(Math.random());
  points.push(Math.random() - 0.5);
}

// React complains about unique key prop but I don't see why
function Example(props) {
  return (
    <div style={{width: '100vw', height: '100vh'}}>
      <View
        pickingModes={['hover', 'click']}
        onClick={(e) => console.log(`Click: ${JSON.stringify(e, null, 2)}`)}
        onHover={(e) => console.log(`Hover: ${JSON.stringify(e, null, 2)}`)}
      >
        <GeometryRepresentation
          id="plan"
          mapper={{
            // colorByArrayName: 'Pressure',
            // scalarMode: 3,
            interpolateScalarsBeforeMapping: true,
          }}
          colorDataRange={[0, 0.7]}
          colorMapPreset="Black-Body Radiation"
        >
          <PolyData
            points={[
              0, 0, 0,
              1, 0, 0,
              1, 1, 0,
              0, 1, 0,
            ]}
            polys={[
              4, 0, 3, 2, 1,
            ]}
          >
            <PointData>
              <DataArray
                registration="setScalars"
                name="Temperature"
                values={[0, 0.7, 0.3, 1]}
              />
              <DataArray
                name="Pressure"
                values={[1, 0.3, 0.7, 0]}
              />
            </PointData>
          </PolyData>
        </GeometryRepresentation>

        <GeometryRepresentation
          id="cloud"
          colorDataRange={[0, 1]}
          property={{ pointSize: 5 }}
        >
          <PolyData
            points={points}
            connectivity="points"
          >
            <PointData>
              <DataArray
                registration="setScalars"
                values={scalars}
              />
            </PointData>
          </PolyData>
        </GeometryRepresentation>
      </View>
    </div>
  );
}

// Render React object
ReactDOM.render(<Example />, document.querySelector('.root'));
