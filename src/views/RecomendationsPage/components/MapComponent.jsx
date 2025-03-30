import { useEffect, useRef } from 'react';

export default function MapComponent({ onLocationChange, initialLocation, address }) {
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const autocompleteRef = useRef(null);
  
  useEffect(() => {
    const script = document.createElement('script');
    const apiKey = import.meta.env.VITE_APP_MAPS;
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = initializeMap;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
      if (markerRef.current) {
        markerRef.current.setMap(null);
      }
    };
  }, []);

  const initializeMap = () => {
    const google = window.google;
    const defaultLocation = initialLocation || { lat: 20.5899, lng: -100.3918 };
    
    const newMap = new google.maps.Map(mapRef.current, {
      center: defaultLocation,
      zoom: 14,
      styles: [{
        featureType: "poi",
        elementType: "labels",
        stylers: [{ visibility: "off" }]
      }]
    });

    // Configurar autocompletado
    autocompleteRef.current = new google.maps.places.Autocomplete(
      document.getElementById('address-search'),
      { types: ['establishment'] }
    );

    // Manejar selección de lugar
    autocompleteRef.current.addListener('place_changed', () => {
      const place = autocompleteRef.current.getPlace();
      if (!place.geometry) return;
      
      newMap.setCenter(place.geometry.location);
      updateMarker(place.geometry.location, newMap);
      
      onLocationChange({
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
        address: place.formatted_address || ''
      });
    });

    // Manejar clics en el mapa
    newMap.addListener('click', (e) => {
      updateMarker(e.latLng, newMap);
      
      const locationData = {
        lat: e.latLng.lat(),
        lng: e.latLng.lng()
      };
      
      // Geocoding inverso
      new google.maps.Geocoder().geocode({ location: e.latLng }, (results, status) => {
        if (status === "OK" && results[0]) {
          locationData.address = results[0].formatted_address;
        }
        onLocationChange(locationData);
      });
    });

    if (initialLocation) {
      updateMarker(new google.maps.LatLng(initialLocation.lat, initialLocation.lng), newMap);
    }
  };

  const updateMarker = (location, mapInstance) => {
    if (markerRef.current) {
      markerRef.current.setPosition(location);
    } else {
      markerRef.current = new window.google.maps.Marker({
        position: location,
        map: mapInstance,
        icon: {
          url: 'https://cdn-icons-png.flaticon.com/512/3754/3754255.png',
          scaledSize: new window.google.maps.Size(30, 30),
          anchor: new window.google.maps.Point(15, 15)
        }
      });
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-100 mb-1">
        Ubicación del establecimiento <span className="text-red-700">*</span>
      </label>
      
      <div className="mb-2">
        <input
          id="address-search"
          type="text"
          placeholder="Buscar dirección o lugar..."
          className="bg-white text-gray-800 w-full p-2 rounded-lg border border-gray-500 focus:outline-none focus:ring-2 focus:ring-[#e39530] focus:border-[#e39530] transition duration-200"
        />
      </div>
      
      <div 
        ref={mapRef}
        className="h-64 rounded-lg overflow-hidden border border-gray-500"
      />
      
      {address && (
        <div className="mt-2">
          <p className="text-sm text-gray-300 mt-1">
            <span className="font-medium">Dirección:</span> {address}
          </p>
        </div>
      )}
    </div>
  );
}