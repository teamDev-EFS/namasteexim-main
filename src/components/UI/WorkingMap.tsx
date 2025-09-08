import React, { useState } from "react";
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

interface WorkingMapProps {
  center: { lat: number; lng: number };
  zoom: number;
  markers: MapMarker[];
  height?: string;
  className?: string;
}

const WorkingMap: React.FC<WorkingMapProps> = ({
  center,
  zoom,
  markers,
  height = "500px",
  className = "",
}) => {
  const [selectedMarker, setSelectedMarker] = useState<MapMarker | null>(null);

  // Generate OpenStreetMap URL (free, no API key required)
  const generateMapUrl = () => {
    const centerStr = `${center.lat},${center.lng}`;
    const zoomStr = zoom.toString();

    // Use OpenStreetMap with CartoDB tiles (free and reliable)
    return `https://www.openstreetmap.org/export/embed.html?bbox=${
      center.lng - 0.01
    },${center.lat - 0.01},${center.lng + 0.01},${
      center.lat + 0.01
    }&layer=mapnik&marker=${center.lat},${center.lng}`;
  };

  const closeInfoWindow = () => {
    setSelectedMarker(null);
  };

  return (
    <div className={`relative ${className}`}>
      {/* Map Container */}
      <div
        style={{ height }}
        className="w-full rounded-2xl shadow-2xl overflow-hidden relative"
      >
        {/* OpenStreetMap iframe */}
        <iframe
          src={generateMapUrl()}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          title="Interactive Map"
        />
      </div>

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
        © OpenStreetMap contributors
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

export default WorkingMap;
