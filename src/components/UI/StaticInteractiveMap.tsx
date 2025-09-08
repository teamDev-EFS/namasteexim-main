import React, { useState, useEffect } from "react";
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

interface StaticInteractiveMapProps {
  center: { lat: number; lng: number };
  zoom: number;
  markers: MapMarker[];
  height?: string;
  className?: string;
  mapType?: "roadmap" | "satellite" | "terrain";
}

const StaticInteractiveMap: React.FC<StaticInteractiveMapProps> = ({
  center,
  zoom,
  markers,
  height = "500px",
  className = "",
  mapType = "roadmap",
}) => {
  const [selectedMarker, setSelectedMarker] = useState<MapMarker | null>(null);
  const [mapUrl, setMapUrl] = useState<string>("");
  const [mapError, setMapError] = useState(false);

  // Generate static map URL with better formatting
  const generateStaticMapUrl = () => {
    const apiKey = "AIzaSyDmzcwUN7T2d9VDQNQfG1QOWHDl0JFtY-U";
    const baseUrl = "https://maps.googleapis.com/maps/api/staticmap";
    const size = "800x600";
    const centerStr = `${center.lat},${center.lng}`;
    const zoomStr = zoom.toString();
    const mapTypeStr = mapType;

    // Create markers string with proper formatting
    const markersStr = markers
      .map((marker) => {
        const color =
          marker.type === "office"
            ? "red"
            : marker.type === "market"
            ? "blue"
            : "green";
        const label =
          marker.type === "office" ? "O" : marker.type === "market" ? "M" : "W";
        return `markers=color:${color}|label:${label}|${marker.position.lat},${marker.position.lng}`;
      })
      .join("&");

    const url = `${baseUrl}?center=${centerStr}&zoom=${zoomStr}&size=${size}&maptype=${mapTypeStr}&${markersStr}&key=${apiKey}&scale=2`;

    console.log("Generated map URL:", url);
    return url;
  };

  useEffect(() => {
    const url = generateStaticMapUrl();
    setMapUrl(url);
  }, [center, zoom, markers, mapType]);

  const closeInfoWindow = () => {
    setSelectedMarker(null);
  };

  const handleMapError = () => {
    console.error("Static map failed to load");
    setMapError(true);
  };

  if (mapError) {
    return (
      <div className={`relative ${className}`}>
        <div
          style={{ height }}
          className="w-full rounded-2xl shadow-2xl overflow-hidden relative bg-gradient-to-br from-gray-50 to-gray-100"
        >
          <div className="w-full h-full flex items-center justify-center p-8">
            <div className="text-center max-w-md">
              <div className="w-20 h-20 bg-emerald-100 rounded-full mx-auto mb-6 flex items-center justify-center">
                <svg
                  className="w-10 h-10 text-emerald-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  ></path>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  ></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Interactive Map
              </h3>
              <p className="text-gray-600 mb-6">
                Our locations and markets around the world
              </p>

              {/* Show markers as interactive cards */}
              <div className="space-y-3">
                {markers.map((marker) => (
                  <div
                    key={marker.id}
                    onClick={() => setSelectedMarker(marker)}
                    className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-4 h-4 rounded-full ${
                          marker.type === "office"
                            ? "bg-red-500"
                            : marker.type === "market"
                            ? "bg-blue-500"
                            : "bg-green-500"
                        }`}
                      />
                      <div className="flex-1 text-left">
                        <h4 className="font-semibold text-gray-900 text-sm">
                          {marker.title}
                        </h4>
                        <p className="text-gray-600 text-xs">
                          {marker.details.address}
                        </p>
                      </div>
                      <div className="text-emerald-600">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 5l7 7-7 7"
                          ></path>
                        </svg>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Custom Tooltip Overlay */}
        {selectedMarker && (
          <div className="absolute top-4 right-4 bg-white rounded-2xl shadow-2xl p-6 max-w-sm border border-gray-100 z-20">
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
  }

  return (
    <div className={`relative ${className}`}>
      {/* Static Map Container */}
      <div
        style={{ height }}
        className="w-full rounded-2xl shadow-2xl overflow-hidden relative"
      >
        {/* Static Map Image */}
        {mapUrl && (
          <img
            src={mapUrl}
            alt="Interactive Map"
            className="w-full h-full object-cover"
            onError={handleMapError}
            onLoad={() => console.log("Map loaded successfully")}
          />
        )}

        {/* Interactive Marker Overlays */}
        {markers.map((marker, index) => {
          // Calculate relative position for overlay markers
          const latDiff = marker.position.lat - center.lat;
          const lngDiff = marker.position.lng - center.lng;

          // Convert to percentage-based positioning
          const topPercent = 50 + (latDiff * 100) / (180 / Math.pow(2, zoom));
          const leftPercent = 50 + (lngDiff * 100) / (360 / Math.pow(2, zoom));

          return (
            <button
              key={marker.id}
              onClick={() => setSelectedMarker(marker)}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full border-2 border-white shadow-lg hover:scale-125 transition-transform duration-200 cursor-pointer z-10"
              style={{
                top: `${Math.max(5, Math.min(95, topPercent))}%`,
                left: `${Math.max(5, Math.min(95, leftPercent))}%`,
                backgroundColor:
                  marker.type === "office"
                    ? "#EF4444"
                    : marker.type === "market"
                    ? "#3B82F6"
                    : "#10B981",
              }}
              title={marker.title}
            >
              <span className="sr-only">{marker.title}</span>
            </button>
          );
        })}

        {/* Map Attribution */}
        <div className="absolute bottom-2 left-2 bg-white bg-opacity-90 px-2 py-1 rounded text-xs text-gray-600">
          © Google Maps
        </div>
      </div>

      {/* Custom Tooltip Overlay */}
      {selectedMarker && (
        <div className="absolute top-4 right-4 bg-white rounded-2xl shadow-2xl p-6 max-w-sm border border-gray-100 z-20">
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

export default StaticInteractiveMap;
