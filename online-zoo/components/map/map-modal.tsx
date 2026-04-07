"use client";

import { useEffect, useRef, useCallback } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const DEFAULT_ZOOM = 5;

const defaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

interface MapModalProps {
  lat: number;
  lng: number;
  onClose: () => void;
}

export default function MapModal({ lat, lng, onClose }: MapModalProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  // Initialize map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    const map = L.map(mapContainerRef.current).setView([lat, lng], DEFAULT_ZOOM);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);
    L.marker([lat, lng], { icon: defaultIcon }).addTo(map);
    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, [lat, lng]);

  // Lock body scroll + Escape key
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [handleClose]);

  return (
    <div
      className="fixed inset-0 z-[3000] flex items-center justify-center p-5"
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 cursor-pointer"
        onClick={handleClose}
      />

      {/* Modal body */}
      <div className="relative w-full max-w-[900px] max-h-[90vh] rounded-[5px] overflow-hidden bg-white shadow-[0_8px_32px_rgba(0,0,0,0.25)] dark:bg-popover cursor-default">
        {/* Close button */}
        <button
          type="button"
          onClick={handleClose}
          className="absolute top-3 right-3 z-[1000] flex h-11 w-11 items-center justify-center rounded-[5px] border-none bg-white shadow-[0_2px_8px_rgba(0,0,0,0.12)] transition-all duration-200 hover:bg-orange dark:bg-popover [&:hover_svg_path]:stroke-white"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M18 6L6 18M6 6l12 12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* Map container */}
        <div ref={mapContainerRef} className="h-[70vh] min-h-[400px] w-full" />
      </div>
    </div>
  );
}
