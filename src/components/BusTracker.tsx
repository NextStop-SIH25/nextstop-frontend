import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Navigation, RefreshCw } from 'lucide-react';

interface BusLocation {
  id: string;
  routeNumber: string;
  coordinates: [number, number];
  status: 'live' | 'delayed' | 'offline';
  destination: string;
  estimatedArrival: string;
}

const BusTracker = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState('');
  const [isTokenSet, setIsTokenSet] = useState(false);
  const [busLocations, setBusLocations] = useState<BusLocation[]>([
    {
      id: '1',
      routeNumber: 'B42',
      coordinates: [-74.006, 40.7128],
      status: 'live',
      destination: 'Downtown Terminal',
      estimatedArrival: '5 min'
    },
    {
      id: '2', 
      routeNumber: 'B15',
      coordinates: [-74.0060, 40.7200],
      status: 'delayed',
      destination: 'Airport Hub',
      estimatedArrival: '12 min'
    },
    {
      id: '3',
      routeNumber: 'B23',
      coordinates: [-74.0020, 40.7080],
      status: 'live',
      destination: 'University Campus',
      estimatedArrival: '8 min'
    }
  ]);

  const handleTokenSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mapboxToken.trim()) {
      setIsTokenSet(true);
      initializeMap();
    }
  };

  const initializeMap = () => {
    if (!mapContainer.current || !mapboxToken) return;

    mapboxgl.accessToken = mapboxToken;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [-74.006, 40.7128],
      zoom: 13,
      pitch: 0,
    });

    map.current.addControl(
      new mapboxgl.NavigationControl({
        visualizePitch: true,
      }),
      'top-right'
    );

    // Add bus markers
    busLocations.forEach(bus => {
      const el = document.createElement('div');
      el.className = `bus-marker bus-marker-${bus.status}`;
      el.innerHTML = `
        <div class="bus-icon">
          <span class="route-number">${bus.routeNumber}</span>
        </div>
      `;

      new mapboxgl.Marker(el)
        .setLngLat(bus.coordinates)
        .setPopup(
          new mapboxgl.Popup({ offset: 25 }).setHTML(`
            <div class="bus-popup">
              <h3>Route ${bus.routeNumber}</h3>
              <p><strong>To:</strong> ${bus.destination}</p>
              <p><strong>ETA:</strong> ${bus.estimatedArrival}</p>
              <p><strong>Status:</strong> <span class="status-${bus.status}">${bus.status}</span></p>
            </div>
          `)
        )
        .addTo(map.current!);
    });
  };

  const refreshLocations = () => {
    // Simulate real-time updates
    setBusLocations(prev => prev.map(bus => ({
      ...bus,
      coordinates: [
        bus.coordinates[0] + (Math.random() - 0.5) * 0.002,
        bus.coordinates[1] + (Math.random() - 0.5) * 0.002,
      ] as [number, number],
    })));
  };

  useEffect(() => {
    if (isTokenSet) {
      const interval = setInterval(refreshLocations, 5000);
      return () => clearInterval(interval);
    }
  }, [isTokenSet]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'live': return 'bg-status-live';
      case 'delayed': return 'bg-status-delayed';
      case 'offline': return 'bg-status-offline';
      default: return 'bg-muted';
    }
  };

  if (!isTokenSet) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-brand-header" />
              Setup Mapbox
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleTokenSubmit} className="space-y-4">
              <div>
                <p className="text-sm text-brand-secondary-text mb-2">
                  Enter your Mapbox public token to enable real-time bus tracking.
                </p>
                <p className="text-xs text-brand-small-text mb-4">
                  Get your token at <a href="https://mapbox.com" target="_blank" rel="noopener noreferrer" className="text-brand-header underline">mapbox.com</a>
                </p>
                <Input
                  type="text"
                  placeholder="pk.eyJ1IjoieW91ci11c2VybmFtZSI..."
                  value={mapboxToken}
                  onChange={(e) => setMapboxToken(e.target.value)}
                  className="font-mono text-xs"
                />
              </div>
              <Button type="submit" className="w-full gradient-primary">
                Initialize Map
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Navigation className="h-6 w-6 text-brand-header" />
            <h1 className="text-xl font-bold text-brand-header">Bus Tracker</h1>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={refreshLocations}
            className="flex items-center gap-1"
          >
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Map Container */}
      <div className="relative h-[60vh]">
        <div ref={mapContainer} className="absolute inset-0" />
      </div>

      {/* Bus List */}
      <div className="p-4 space-y-3">
        <h2 className="text-lg font-semibold">Active Buses</h2>
        {busLocations.map((bus) => (
          <Card key={bus.id} className="shadow-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className={`w-3 h-3 rounded-full ${getStatusColor(bus.status)} ${bus.status === 'live' ? 'pulse-live' : ''}`} />
                  </div>
                  <div>
                    <div className="font-semibold text-brand-header">Route {bus.routeNumber}</div>
                    <div className="text-sm text-brand-secondary-text">{bus.destination}</div>
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant={bus.status === 'live' ? 'default' : 'secondary'}>
                    {bus.estimatedArrival}
                  </Badge>
                  <div className="text-xs text-brand-small-text mt-1 capitalize">
                    {bus.status}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <style>{`
        .bus-marker {
          cursor: pointer;
        }
        
        .bus-marker-live .bus-icon {
          background: hsl(var(--status-live));
          box-shadow: 0 0 20px hsl(var(--status-live) / 0.5);
          animation: pulse-live 2s infinite;
        }
        
        .bus-marker-delayed .bus-icon {
          background: hsl(var(--status-delayed));
        }
        
        .bus-marker-offline .bus-icon {
          background: hsl(var(--status-offline));
        }
        
        .bus-icon {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: bold;
          font-size: 10px;
          border: 2px solid white;
        }
        
        .bus-popup {
          padding: 8px;
          min-width: 180px;
        }
        
        .bus-popup h3 {
          margin: 0 0 8px 0;
          font-weight: bold;
        }
        
        .bus-popup p {
          margin: 4px 0;
          font-size: 14px;
        }
        
        .status-live { color: hsl(var(--status-live)); font-weight: bold; }
        .status-delayed { color: hsl(var(--status-delayed)); font-weight: bold; }
        .status-offline { color: hsl(var(--status-offline)); }
      `}</style>
    </div>
  );
};

export default BusTracker;