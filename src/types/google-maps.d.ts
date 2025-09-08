declare global {
  interface Window {
    google: {
      maps: {
        Map: new (
          element: HTMLElement,
          options: google.maps.MapOptions
        ) => google.maps.GoogleMap;
        Marker: new (
          options: google.maps.MarkerOptions
        ) => google.maps.GoogleMarker;
        InfoWindow: new (
          options?: google.maps.InfoWindowOptions
        ) => google.maps.GoogleInfoWindow;
        MapTypeId: {
          ROADMAP: google.maps.MapTypeId;
        };
        SymbolPath: {
          CIRCLE: google.maps.SymbolPath;
        };
        Animation: {
          DROP: google.maps.Animation;
        };
      };
    };
  }
}

declare namespace google {
  namespace maps {
    interface MapOptions {
      center: LatLng | LatLngLiteral;
      zoom: number;
      mapTypeId: MapTypeId;
      styles?: MapTypeStyle[];
    }

    interface GoogleMap {
      setCenter(latLng: LatLng | LatLngLiteral): void;
      setZoom(zoom: number): void;
    }

    interface MarkerOptions {
      position: LatLng | LatLngLiteral;
      map?: GoogleMap;
      title?: string;
      icon?: string | Icon | Symbol;
      animation?: Animation;
    }

    interface GoogleMarker {
      addListener(eventName: string, handler: Function): void;
      setMap(map: GoogleMap | null): void;
    }

    interface InfoWindowOptions {
      content?: string | Element;
      position?: LatLng | LatLngLiteral;
    }

    interface GoogleInfoWindow {
      setContent(content: string | Element): void;
      open(map?: GoogleMap, anchor?: GoogleMarker): void;
      close(): void;
    }

    interface LatLng {
      lat(): number;
      lng(): number;
    }

    interface LatLngLiteral {
      lat: number;
      lng: number;
    }

    interface Icon {
      url: string;
      scaledSize?: Size;
      anchor?: Point;
    }

    interface Symbol {
      path: SymbolPath;
      fillColor?: string;
      fillOpacity?: number;
      strokeColor?: string;
      strokeWeight?: number;
      scale?: number;
    }

    interface Size {
      width: number;
      height: number;
    }

    interface Point {
      x: number;
      y: number;
    }

    interface MapTypeStyle {
      featureType: string;
      elementType: string;
      stylers: MapTypeStyler[];
    }

    interface MapTypeStyler {
      visibility?: string;
      color?: string;
      weight?: number;
      gamma?: number;
      hue?: string;
      lightness?: number;
      saturation?: number;
    }

    type MapTypeId = "roadmap" | "satellite" | "hybrid" | "terrain";
    type SymbolPath = 0 | 1 | 2 | 3 | 4;
    type Animation = 1 | 2;
  }
}

export {};
