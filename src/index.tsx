import * as React from 'react'
import * as ReactDom from 'react-dom'
import { useEffect, useState } from 'react'
import { useLeaflet, Marker } from 'react-leaflet'
// eslint-disable-next-line no-unused-vars
import { Control, LatLng, Icon, LatLngExpression } from 'leaflet'

export const LocationOffIcon =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAvUlEQVR4Ab3TgQbCUBSH8RDCAEMYwkUIEAJEDxD2ACFAgB4ghDBc9Bh7gBB6gB5igB5hGE5fwHE5zmL28cOFP9vuJmO1wQF7FHDLcFLnBV6QRI0cZjt0iPh1hRgaZDArk7EIMdxhR0cIojoHrPBWQy1mMNtC1JiuhCgBZmuIMXaBKIX39VpjTH+AD9xqiDEWkzP578kaqxDQq4cz1ruAdqixs3ERO2fMfcRb8gdU6F2OBk9Mk8uJ/1pijnH6AqQ0XilSkNlRAAAAAElFTkSuQmCC'
export const LocationOnIcon =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAsElEQVR4Ab3PgQbCUACF4RDCBYQwDEMIEAYIgBBCgB4iBBhCCNBjDAGGsAfoIQYIIYQLOP0wrnF3t2I/HwDnjIYqxR4bROhdjBJqyDFFpyK8IY8KBsFuUMAVrRnIUSDGAg8IgsUE3lLIkaJuCzkSeFtCjh3qjn0WGVgIwgsZLvhAEEoEy6GADMFWUAuLCJ0qII8TOpfAQg1PGPTqADWsESh88Yyfm6LCHWP81RwzDNMXmJlesibYrhcAAAAASUVORK5CYII='
export const LocationIndicator = new Icon({
  iconUrl:
    'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwcHgiIGhlaWdodD0iMTAwcHgiIGlkPSJlNjVteHgwZnV0ZTIxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2aWV3Qm94PSIwIDAgNTAwIDUwMCIgc2hhcGUtcmVuZGVyaW5nPSJnZW9tZXRyaWNQcmVjaXNpb24iIHRleHQtcmVuZGVyaW5nPSJnZW9tZXRyaWNQcmVjaXNpb24iPg0KICAgIDxzdHlsZT4NCiAgICAgICAgI2U2NW14eDBmdXRlMjIgew0KICAgICAgICAgICAgYW5pbWF0aW9uOiBlNjVteHgwZnV0ZTIyX19yZCAxMDAwMG1zIGxpbmVhciAxIG5vcm1hbCBmb3J3YXJkcw0KICAgICAgICB9DQogICAgICAgIEBrZXlmcmFtZXMgZTY1bXh4MGZ1dGUyMl9fcmQgeyANCiAgICAgICAgICAgIDAlIHtyOiAxMHB4fSANCiAgICAgICAgICAgIDUlIHtyOiAyMTBweH0gDQogICAgICAgICAgICAxMDAlIHtyOiAyMTBweH0gDQogICAgICAgIH0NCiAgICAgICAgI2U2NW14eDBmdXRlMjMgew0KICAgICAgICAgICAgYW5pbWF0aW9uOiBlNjVteHgwZnV0ZTIzX19yZDsNCiAgICAgICAgICAgIGFuaW1hdGlvbi1kdXJhdGlvbjogMjAwMG1zOw0KICAgICAgICAgICAgYW5pbWF0aW9uLWZpbGwtbW9kZTogYm90aDsNCiAgICAgICAgICAgIGFuaW1hdGlvbi1pdGVyYXRpb24tY291bnQ6IGluZmluaXRlOw0KICAgICAgICB9DQogICAgICAgIEBrZXlmcmFtZXMgZTY1bXh4MGZ1dGUyM19fcmQgeyANCiAgICAgICAgICAgIDAlIHtyOiAxMHB4fQ0KICAgICAgICAgICAgNDUlIHtyOiAyMDVweH0NCiAgICAgICAgICAgIDEwMCUge3I6MTBweH0gDQogICAgICAgIH0NCiAgICA8L3N0eWxlPg0KICAgIDxkZWZzPg0KICAgICAgICA8ZmlsdGVyIGlkPSJlNjVteHgwZnV0ZTIzLWZpbHRlciIgeD0iLTQwMCUiIHdpZHRoPSI2MDAlIiB5PSItNDAwJSIgaGVpZ2h0PSI2MDAlIj4NCiAgICAgICAgICAgIDxmZUdhdXNzaWFuQmx1ciBpZD0iZTY1bXh4MGZ1dGUyMy1maWx0ZXItYmx1ci0wIiBzdGREZXZpYXRpb249IjEwLDEwIiByZXN1bHQ9InJlc3VsdCIvPg0KICAgICAgICA8L2ZpbHRlcj4NCiAgICA8L2RlZnM+DQogICAgPGNpcmNsZSBpZD0iZTY1bXh4MGZ1dGUyMiIgcj0iMTBweCIgdHJhbnNmb3JtPSJtYXRyaXgoMSAwIDAgMSAyNTAgMjUwKSIgZmlsbD0icmdiYSg2OSwxNzksMjUxLDApIiBzdHJva2U9InJnYigzLDcxLDI1NSkiIHN0cm9rZS13aWR0aD0iNCIvPg0KICAgIDxjaXJjbGUgaWQ9ImU2NW14eDBmdXRlMjMiIHI9IjEwIiB0cmFuc2Zvcm09Im1hdHJpeCgxIDAgMCAxIDI1MCAyNTApIiBmaWx0ZXI9InVybCgjZTY1bXh4MGZ1dGUyMy1maWx0ZXIpIiBmaWxsPSJub25lIiBzdHJva2U9InJnYigyNTUsMjU1LDI1NSkiIHN0cm9rZS13aWR0aD0iNCIvPg0KICAgIDxjaXJjbGUgaWQ9ImU2NW14eDBmdXRlMjQiIHI9IjEwIiB0cmFuc2Zvcm09Im1hdHJpeCgxIDAgMCAxIDI1MCAyNTApIiBmaWxsPSJyZ2JhKDY5LDE3OSwyNTEsMC4yNikiIHN0cm9rZT0icmdiKDMsNzEsMjU1KSIgc3Ryb2tlLXdpZHRoPSI0Ii8+DQo8L3N2Zz4=',
  iconSize: [100, 100],
  iconAnchor: [50, 50]
})

const controlRoot = document.createElement('div')
controlRoot.setAttribute('data-testid', 'current-location-control-root')

const isDev = process.env.NODE_ENV === 'development'
const devLocationErrorMessage =
  '\r\nThis alert will show in production unless the onGeoLocationError prop is configured.'

export interface CurrentLocationControlProps {
  position: 'topright' | 'topleft' | 'bottomleft' | 'bottomright'
  geoLocationOptions?: PositionOptions
  icon?: Icon
  onPosition?: PositionCallback
  onPositionStart?: () => void
  onPositionStop?: () => void
  onGeoLocationError?: PositionErrorCallback
  locationRef?: React.MutableRefObject<LatLng>
}

export default function CurrentLocationControl({
  position,
  geoLocationOptions,
  icon,
  onPosition,
  onPositionStart,
  onPositionStop,
  onGeoLocationError,
  locationRef
}: CurrentLocationControlProps): JSX.Element {
  const { map } = useLeaflet()
  const [active, setActive] = useState(false)
  const [locationWatchId, setLocationWatchID] = useState(0)
  const [userLocation, setUserLocation] = useState<LatLng>()
  const [controlContainerReady, setControlContainerReady] = useState(false)
  const OnClick = () => {
    if (!active) {
      if (onPositionStart) onPositionStart()
      try {
        const watchID = window.navigator.geolocation.watchPosition(
          (position) => {
            const { latitude, longitude } = position.coords
            const nextPos = new LatLng(latitude, longitude)
            if (onPosition) onPosition(position)
            if (locationRef) locationRef.current = nextPos
            setUserLocation(nextPos)
          },
          (error) => {
            onGeoLocationError
              ? onGeoLocationError(error)
              : alert(
                  'User Location is not enabled by your device' + isDev
                    ? `: \r\n${error}` + devLocationErrorMessage
                    : ''
                )
          },
          geoLocationOptions
        )
        setLocationWatchID(watchID)
      } catch (e) {
        alert('window.navigator.geolocation is undefined')
      }
    } else {
      if (onPositionStop) onPositionStop()
      window.navigator.geolocation.clearWatch(locationWatchId)
      setLocationWatchID(0)
      setUserLocation(undefined)
    }
    setActive(!active)
  }

  useEffect(() => {
    const LocateControl = new Control({ position })
    LocateControl.onAdd = () => {
      setControlContainerReady(true)
      return controlRoot
    }
    map?.addControl(LocateControl)
    return () => {
      map?.removeControl(LocateControl)
      if (locationWatchId !== 0)
        window.navigator.geolocation.clearWatch(locationWatchId)
    }
  }, [])

  return (
    <>
      {controlContainerReady ? (
        <ControlButton active={active} onClick={OnClick} />
      ) : null}
      {active && userLocation ? (
        <Marker
          position={userLocation as LatLngExpression}
          draggable={false}
          icon={icon || LocationIndicator}
          data-testid='current-location-indicator'
        />
      ) : null}
    </>
  )
}

export type ControlButtonProps = {
  active: boolean
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

function ControlButton({ active, onClick }: ControlButtonProps): JSX.Element {
  return ReactDom.createPortal(
    <button
      data-testid='current-location-control-button'
      onClick={onClick}
      about='enable current location indicator'
    >
      <img src={active ? LocationOnIcon : LocationOffIcon} />
    </button>,
    controlRoot
  )
}