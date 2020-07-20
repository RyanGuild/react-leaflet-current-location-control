# react-leaflet-current-location-control

> Made with create-react-library

[![NPM](https://img.shields.io/npm/v/react-leaflet-current-location-control.svg)](https://www.npmjs.com/package/react-leaflet-current-location-control) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-leaflet-current-location-control
```

## Usage

```tsx
import * as React from 'react'

import CurrentLocationControl from 'react-leaflet-current-location-control'
import {Map} from 'react-leaflet'

const App: React.FC<> = () => (
  <Map>
    <CurrentLocationControl postition="topright" />
  </Map>
)
```

## License

MIT © [RyanGuild](https://github.com/RyanGuild)
