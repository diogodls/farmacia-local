import React, { useMemo } from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { WebView, WebViewMessageEvent } from "react-native-webview";

import type { Medicine, Pharmacy } from "../types/pharmacy";
import { colors, radii, spacing } from "../styles/theme";

type Region = {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
};

type PharmacyMapSectionProps = {
  pharmacies: Pharmacy[];
  selectedMedicine: Medicine | null;
  region: Region;
  onOpenPharmacy: (pharmacy: Pharmacy) => void;
  onMapInteractionChange: (isInteracting: boolean) => void;
};

export function PharmacyMapSection({
  pharmacies,
  selectedMedicine,
  region,
  onOpenPharmacy,
  onMapInteractionChange,
}: PharmacyMapSectionProps) {
  const mapHtml = useMemo(
    () => buildLeafletHtml(pharmacies, region),
    [pharmacies, region]
  );

  function handleMessage(event: WebViewMessageEvent) {
    try {
      const payload = JSON.parse(event.nativeEvent.data) as {
        type: string;
        pharmacyId?: string;
      };

      if (payload.type !== "open-pharmacy" || !payload.pharmacyId) {
        return;
      }

      const pharmacy = pharmacies.find((item) => item.id === payload.pharmacyId);

      if (pharmacy) {
        onOpenPharmacy(pharmacy);
      }
    } catch {
      return;
    }
  }

  return (
    <View style={styles.wrapper}>
      <WebView
        originWhitelist={["*"]}
        source={{ html: mapHtml }}
        style={styles.map}
        onMessage={handleMessage}
        onShouldStartLoadWithRequest={(request) => {
          return request.url === "about:blank";
        }}
        javaScriptEnabled
        domStorageEnabled
        scrollEnabled={false}
        bounces={false}
        onTouchStart={() => onMapInteractionChange(true)}
        onTouchEnd={() => onMapInteractionChange(false)}
        onTouchCancel={() => onMapInteractionChange(false)}
      />
    </View>
  );
}

function buildLeafletHtml(pharmacies: Pharmacy[], region: Region) {
  const markerData = JSON.stringify(pharmacies);
  const initialView = JSON.stringify({
    latitude: region.latitude,
    longitude: region.longitude,
    zoom: getZoom(region.latitudeDelta),
  });

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/leaflet.css"
        />
        <style>
          html, body, #map {
            margin: 0;
            padding: 0;
            width: 100%;
            height: 100%;
            font-family: Arial, sans-serif;
            background: #f4f2ea;
          }

          .leaflet-container {
            background: #f4f2ea;
          }

          .leaflet-control-zoom {
            margin-bottom: 76px !important;
            margin-right: 12px !important;
            border: none !important;
            box-shadow: 0 4px 12px rgba(0,0,0,0.18) !important;
          }

          .leaflet-control-zoom a {
            width: 34px !important;
            height: 34px !important;
            line-height: 34px !important;
            color: #1f2a24 !important;
            font-weight: 700 !important;
          }

          .pharmacy-popup {
            min-width: 220px;
          }

          .pharmacy-popup h3 {
            margin: 0 0 6px 0;
            color: #1f2a24;
            font-size: 16px;
          }

          .pharmacy-popup p {
            margin: 0 0 6px 0;
            color: #56645c;
            line-height: 1.4;
            font-size: 13px;
          }

          .pharmacy-popup button {
            width: 100%;
            margin-top: 8px;
            border: 0;
            border-radius: 999px;
            background: #1f7a5a;
            color: #fffdf7;
            font-weight: 700;
            padding: 10px 12px;
            font-size: 13px;
          }
        </style>
      </head>
      <body>
        <div id="map"></div>
        <script src="https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/leaflet.js"></script>
        <script>
          const pharmacies = ${markerData};
          const initialView = ${initialView};

          function escapeHtml(value) {
            return String(value)
              .replace(/&/g, "&amp;")
              .replace(/</g, "&lt;")
              .replace(/>/g, "&gt;")
              .replace(/"/g, "&quot;")
              .replace(/'/g, "&#039;");
          }

          function sendOpenPharmacy(pharmacyId) {
            window.ReactNativeWebView.postMessage(
              JSON.stringify({ type: "open-pharmacy", pharmacyId })
            );
          }

          const map = L.map("map", {
            zoomControl: false,
            attributionControl: false
          }).setView([initialView.latitude, initialView.longitude], initialView.zoom);

          L.control.zoom({ position: "bottomright" }).addTo(map);

          L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
            maxZoom: 19,
            subdomains: "abcd"
          }).addTo(map);

          const markerIcon = L.divIcon({
            className: "custom-marker",
            html: '<div style="width:18px;height:18px;background:#d95d39;border:3px solid #ffffff;border-radius:999px;box-shadow:0 2px 8px rgba(0,0,0,0.25);"></div>',
            iconSize: [18, 18],
            iconAnchor: [9, 9],
            popupAnchor: [0, -10]
          });

          pharmacies.forEach((pharmacy) => {
            const popupHtml = \`
              <div class="pharmacy-popup">
                <h3>\${escapeHtml(pharmacy.name)}</h3>
                <p>\${escapeHtml(pharmacy.street)}, \${escapeHtml(pharmacy.district)} - \${escapeHtml(pharmacy.city)}/\${escapeHtml(pharmacy.state)}</p>
                <p>\${escapeHtml(pharmacy.openingHours)}</p>
                <button onclick="sendOpenPharmacy('\${escapeHtml(pharmacy.id)}')">Ver detalhes da farmacia</button>
              </div>
            \`;

            const marker = L.marker([pharmacy.latitude, pharmacy.longitude], { icon: markerIcon })
              .addTo(map)
              .bindPopup(popupHtml, {
                autoPan: true,
                autoPanPaddingTopLeft: [20, 20],
                autoPanPaddingBottomRight: [40, 120]
              });

            marker.on("click", () => {
              const targetZoom = Math.max(map.getZoom(), 15);
              map.flyTo([pharmacy.latitude, pharmacy.longitude], targetZoom, {
                animate: true,
                duration: 0.5
              });
            });
          });

          ["touchstart", "mousedown", "dragstart", "zoomstart"].forEach((eventName) => {
            map.on(eventName, () => {
              document.body.style.overscrollBehavior = "contain";
            });
          });
        </script>
      </body>
    </html>
  `;
}

function getZoom(latitudeDelta: number) {
  if (latitudeDelta <= 0.03) {
    return 14;
  }

  if (latitudeDelta <= 0.08) {
    return 13;
  }

  return 12;
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    marginHorizontal: spacing.sm + 2,
    borderRadius: radii.map,
    overflow: "hidden",
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  map: {
    flex: 1,
    backgroundColor: colors.surface,
  },
});
