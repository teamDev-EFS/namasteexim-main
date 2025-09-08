import React, { useEffect, useRef, useState } from "react";
import { MapPin, X, Phone, Mail, Globe } from "lucide-react";

interface MapMarker {
  id: string;
  position: { lat: number; lng: number };
  title: string;
  description: string;
  type: "office" | "market" | "warehouse";
  details: {
    address: string;
    phone?: string;
    email?: string;
    products?: string[];
    volume?: string;
  };
}

interface InteractiveMapProps {
  center: { lat: number; lng: number };
  zoom: number;
  markers: MapMarker[];
  height?: string;
  className?: string;
}

const InteractiveMap: React.FC<InteractiveMapProps> = ({
  center,
  zoom,
  markers,
  height = "500px",
  className = "",
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [selectedMarker, setSelectedMarker] = useState<MapMarker | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapError, setMapError] = useState(false);

  useEffect(() => {
    // Load Google Maps API with better error handling
    const loadGoogleMaps = () => {
      // Check if already loaded
      if ((window as any).google && (window as any).google.maps) {
        setMapLoaded(true);
        setTimeout(initializeMap, 100);
        return;
      }

      // Create script element
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDmzcwUN7T2d9VDQNQfG1QOWHDl0JFtY-U&libraries=places&callback=initMap`;
      script.async = true;
      script.defer = true;

      // Set up global callback
      (window as any).initMap = () => {
        setMapLoaded(true);
        setTimeout(initializeMap, 100);
      };

      // Handle script load errors
      script.onerror = () => {
        console.error("Failed to load Google Maps API");
        setMapError(true);
        showFallbackContent();
      };

      // Add script to document
      document.head.appendChild(script);

      // Fallback timeout
      setTimeout(() => {
        if (!mapLoaded && !mapError) {
          console.warn("Google Maps API load timeout, showing fallback");
          setMapError(true);
          showFallbackContent();
        }
      }, 10000); // 10 second timeout
    };

    loadGoogleMaps();
  }, []);

  const initializeMap = () => {
    if (
      !mapRef.current ||
      !(window as any).google ||
      !(window as any).google.maps
    ) {
      console.error("Google Maps not available");
      showFallbackContent();
      return;
    }

    try {
      // Initialize map
      const map = new (window as any).google.maps.Map(mapRef.current, {
        center,
        zoom,
        mapTypeId: "roadmap",
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
        zoomControl: true,
        styles: [
          {
            featureType: "poi",
            elementType: "labels",
            stylers: [{ visibility: "off" }],
          },
          {
            featureType: "transit",
            elementType: "labels",
            stylers: [{ visibility: "off" }],
          },
        ],
      });

      // Add markers
      markers.forEach((markerData) => {
        try {
          const marker = new (window as any).google.maps.Marker({
            position: markerData.position,
            map,
            title: markerData.title,
            icon: createCustomMarkerIcon(markerData.type),
            animation: 2, // DROP animation
          });

          // Add click listener
          marker.addListener("click", () => {
            setSelectedMarker(markerData);
          });
        } catch (markerError) {
          console.error("Error creating marker:", markerError);
        }
      });

      console.log("Google Maps initialized successfully");
    } catch (error) {
      console.error("Error initializing map:", error);
      setMapError(true);
      showFallbackContent();
    }
  };

  const createCustomMarkerIcon = (type: string) => {
    const colors = {
      office: "#EF4444", // Red
      market: "#3B82F6", // Blue
      warehouse: "#10B981", // Green
    };

    return {
      path: 0, // CIRCLE
      fillColor: colors[type as keyof typeof colors] || "#EF4444",
      fillOpacity: 1,
      strokeColor: "#FFFFFF",
      strokeWeight: 2,
      scale: 12,
    };
  };

  const showFallbackContent = () => {
    if (mapRef.current) {
      mapRef.current.innerHTML = `
        <div class="w-full h-full bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl flex items-center justify-center p-8">
          <div class="text-center max-w-md">
            <div class="w-20 h-20 bg-emerald-100 rounded-full mx-auto mb-6 flex items-center justify-center">
              <svg class="w-10 h-10 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">Interactive Map</h3>
            <p class="text-gray-600 mb-6">Our locations and markets around the world</p>
            <div class="space-y-3">
              ${markers
                .map(
                  (marker) => `
                <div class="bg-white p-4 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer" onclick="this.parentElement.parentElement.parentElement.parentElement.parentElement.querySelector('[data-marker-id=\\'${
                  marker.id
                }\\']').click()">
                  <div class="flex items-center space-x-3">
                    <div class="w-4 h-4 rounded-full ${
                      marker.type === "office"
                        ? "bg-red-500"
                        : marker.type === "market"
                        ? "bg-blue-500"
                        : "bg-green-500"
                    }"></div>
                    <div class="flex-1 text-left">
                      <h4 class="font-semibold text-gray-900 text-sm">${
                        marker.title
                      }</h4>
                      <p class="text-gray-600 text-xs">${
                        marker.details.address
                      }</p>
                    </div>
                    <div class="text-emerald-600">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                      </svg>
                    </div>
                  </div>
                </div>
              `
                )
                .join("")}
            </div>
            <div class="mt-6 p-4 bg-emerald-50 rounded-xl border border-emerald-200">
              <p class="text-sm text-emerald-700">
                <strong>Tip:</strong> Click on any location above to see detailed information
              </p>
            </div>
          </div>
        </div>
      `;
    }
  };

  const closeInfoWindow = () => {
    setSelectedMarker(null);
  };

  // Show fallback immediately if there's an error
  useEffect(() => {
    if (mapError) {
      showFallbackContent();
    }
  }, [mapError]);

  return (
    <div className={`relative ${className}`}>
      {/* Map Container */}
      <div
        ref={mapRef}
        style={{ height }}
        className="w-full rounded-2xl shadow-2xl overflow-hidden"
      >
        {/* Loading State */}
        {!mapLoaded && !mapError && (
          <div className="w-full h-full bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin mx-auto mb-4"></div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                Loading Map...
              </h3>
              <p className="text-gray-500 text-sm">Initializing Google Maps</p>
            </div>
          </div>
        )}
      </div>

      {/* Custom Tooltip Overlay */}
      {selectedMarker && (
        <div className="absolute top-4 right-4 bg-white rounded-2xl shadow-2xl p-6 max-w-sm border border-gray-100 z-10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div
                className={`w-4 h-4 rounded-full ${
                  selectedMarker.type === "office"
                    ? "bg-red-500"
                    : selectedMarker.type === "market"
                    ? "bg-blue-500"
                    : "bg-green-500"
                }`}
              />
              <h3 className="font-bold text-gray-900 text-lg">
                {selectedMarker.title}
              </h3>
            </div>
            <button
              onClick={closeInfoWindow}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          <p className="text-gray-600 mb-4">{selectedMarker.description}</p>

          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <MapPin className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-700">
                {selectedMarker.details.address}
              </span>
            </div>

            {selectedMarker.details.phone && (
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-700">
                  {selectedMarker.details.phone}
                </span>
              </div>
            )}

            {selectedMarker.details.email && (
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-700">
                  {selectedMarker.details.email}
                </span>
              </div>
            )}

            {selectedMarker.details.products && (
              <div>
                <p className="text-sm text-gray-500 mb-2">Key Products:</p>
                <div className="flex flex-wrap gap-2">
                  {selectedMarker.details.products.map((product, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs rounded-lg border border-emerald-200"
                    >
                      {product}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {selectedMarker.details.volume && (
              <div className="flex items-center space-x-3">
                <Globe className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-700">
                  Volume:{" "}
                  <span className="font-medium">
                    {selectedMarker.details.volume}
                  </span>
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default InteractiveMap;
