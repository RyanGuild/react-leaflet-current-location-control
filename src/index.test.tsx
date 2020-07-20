import {
  render,
  fireEvent,
  waitForDomChange,
  wait
} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import * as React from 'react'
import CurrentLocationControl, { CurrentLocationControlProps } from './index'
import { Map, useLeaflet } from 'react-leaflet'
import { Control, LatLng } from 'leaflet'

const TestSetup = (props?: CurrentLocationControlProps) => {
  return render(
    <Map>
      <CurrentLocationControl position='topright' {...props} />
    </Map>
  )
}

const GeoLocationMock = (errorOrSuccess: boolean | undefined) => {
  const watches: any[] = []

  window.navigator.geolocation = {
    watchPosition: () => {},
    clearWatch: () => {}
  }
  jest
    .spyOn(window.navigator.geolocation, 'watchPosition')
    .mockImplementation(function (SCB, ECB, _options): number {
      if (!errorOrSuccess && SCB) {
        const interval = setInterval(() => {
          SCB({
            coords: {
              latitude: 0,
              longitude: 0,
              altitude: 1,
              accuracy: 10,
              heading: 0,
              speed: 10,
              altitudeAccuracy: 1
            },
            timestamp: 1
          })
        }, 100)
        watches.push(interval)
        return watches.indexOf(interval)
      } else if (ECB) {
        ECB(new Error('test error') as any)
        return -1
      } else {
        return -1
      }
    })
  jest
    .spyOn(window.navigator.geolocation, 'clearWatch')
    .mockImplementation((index) => {
      clearInterval(index)
      watches.splice(index, 1)
    })
}

describe('CurrentLocationControl', () => {
  it('is truthy', () => {
    expect(CurrentLocationControl).toBeTruthy()
  })

  it('renders', () => {
    const { baseElement, container } = render(
      <CurrentLocationControl position='topright' />
    )
    expect(container).toBeTruthy()
    expect(baseElement).toBeTruthy()
  })

  it('the map component provides context', () => {
    const TestComponent = () => {
      const { map } = useLeaflet()
      expect(map).toBeTruthy()
      expect(map).toHaveProperty('addControl')
      return <></>
    }

    render(
      <Map>
        <TestComponent />
      </Map>
    )
  })

  it('the control class can be added to map', async () => {
    const TestComponent = () => {
      const { map } = useLeaflet()
      const control = new Control({ position: 'topright' })
      control.onAdd = () => document.createElement('div')
      control.addTo(map as any)
      return <></>
    }

    render(
      <Map>
        <TestComponent />
      </Map>
    )
  })

  it('renders the control button to the document', async () => {
    const { findByTestId } = TestSetup()

    const button = await findByTestId('current-location-control-button')
    expect(button).toBeInTheDocument()
  })

  it('it throws an alert when window.navigator.geolocation is not availible', async () => {
    const { findByTestId } = TestSetup()

    const button = await findByTestId('current-location-control-button')
    const mockAlert = jest.fn()
    jest.spyOn(window, 'alert').mockImplementation(mockAlert)
    expect(fireEvent(button, new MouseEvent('click', { bubbles: true })))
    expect(mockAlert).toBeCalled()
  })

  it('watches position when activated', async () => {
    const mockStartFunction = jest.fn()
    const mockStopFunction = jest.fn()
    const mockOnPositionFunction = jest.fn()
    const { findByTestId } = TestSetup({
      onPositionStart: mockStartFunction,
      onPositionStop: mockStopFunction,
      onPosition: mockOnPositionFunction,
      position: 'topright'
    })
    GeoLocationMock(false)
    const button = await findByTestId('current-location-control-button')
    fireEvent(button, new MouseEvent('click', { bubbles: true }))
    expect(mockStartFunction).toBeCalled()
    wait(
      () => {
        expect(mockOnPositionFunction).toBeCalledTimes(10)

        fireEvent(button, new MouseEvent('click', { bubbles: true }))
        expect(mockStopFunction).toBeCalled()
      },
      { timeout: 1000 }
    )
  })

  it('updates the location ref while active', async () => {
    const ref: any = { current: new LatLng(2, 2) }
    const { findByTestId } = render(
      <Map>
        <CurrentLocationControl position='topright' locationRef={ref} />
      </Map>
    )
    const button = await findByTestId('current-location-control-button')
    if (button) fireEvent(button, new MouseEvent('click', { bubbles: true }))

    wait(
      () => {
        expect(ref.current).toBeInstanceOf(LatLng)
        expect(ref.current.latitude).toEqual(0)
        expect(ref.current.longitude).toEqual(0)
      },
      { timeout: 150 }
    )
  })
})
