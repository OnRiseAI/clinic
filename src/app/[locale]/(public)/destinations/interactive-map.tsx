'use client'

import React, { useState, useEffect } from 'react'
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
  Marker,
} from 'react-simple-maps'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from '@/i18n/navigation'
import { ArrowRight, Activity, Users, MapPin } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

// URL to a valid topojson map of the world
const geoUrl = 'https://unpkg.com/world-atlas@2.0.2/countries-110m.json'

interface InteractiveMapProps {
  countries: Array<{
    id: string
    name: string
    iso_code: string
    slug: string
    flag_emoji: string | null
    status: string | null
  }>
  stats: Record<string, { procedure_count: number; min_price_gbp: number | null }>
  locale: string
}

export function InteractiveMap({ countries, stats, locale }: InteractiveMapProps) {
  const [hoveredCountry, setHoveredCountry] = useState<any>(null)
  const [hoveredClinic, setHoveredClinic] = useState<any>(null)
  const [isMounted, setIsMounted] = useState(false)
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null)
  
  const [position, setPosition] = useState({ coordinates: [20, 45] as [number, number], zoom: 1.5 })
  const [clinics, setClinics] = useState<any[]>([])

  // Avoid hydration mismatch by rendering only after mount
  useEffect(() => {
    setIsMounted(true)
    
    // Fetch clinics
    const fetchClinics = async () => {
      const supabase = createClient()
      const { data, error } = await supabase
        .from('clinics')
        .select('id, name, slug, lat, lng, city_rel:cities(name)')
        .eq('is_active', true)
        .not('lat', 'is', null)
        .not('lng', 'is', null)
        
      if (!error && data) {
        setClinics(data)
      }
    }
    
    fetchClinics()
    
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  // Create a fast lookup map using iso_code (Alpha-3 typically in maps, or match name)
  // The simple-maps topologies typically use ISO 3166-1 numeric or Alpha-3. 
  // We'll match by name or a custom ISO mapping if needed. For now, name matching works for most standard maps.
  const countryMap = new Map(countries.map(c => [c.name, c]))
  
  // Also create an ISO fallback map (assuming our db has 2 or 3 letter codes)
  const isoMap = new Map(countries.map(c => [c.iso_code, c]))
  
  // Hardcoded coming soon countries for visual map population
  const hardcodedComingSoon = new Set(['Mexico', 'Costa Rica', 'Thailand', 'India'])

  // Helper for flag emojis for hardcoded countries
  const getFlagEmoji = (name: string) => {
    const flags: Record<string, string> = {
      'Mexico': '🇲🇽',
      'Costa Rica': '🇨🇷',
      'Thailand': '🇹🇭',
      'India': '🇮🇳'
    }
    return flags[name] || '🌍'
  }

  if (!isMounted) {
    return <div className="w-full h-[500px] bg-navy-light/10 animate-pulse rounded-3xl" />
  }

  return (
    <div 
      className="relative w-full h-[400px] sm:h-[500px] md:h-[600px] bg-[#0A1A2F] rounded-3xl overflow-hidden shadow-2xl border border-white/5"
      onMouseLeave={() => {
        setHoveredCountry(null)
        setHoveredClinic(null)
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary-900/40 via-transparent to-teal-900/20 pointer-events-none" />
      <div className="absolute inset-0 bg-transparent opacity-[0.03] mix-blend-overlay pointer-events-none" />

      <ComposableMap 
        projection="geoMercator" 
        projectionConfig={{ scale: 120 }}
        className="w-full h-full"
      >
        <ZoomableGroup 
          center={position.coordinates} 
          zoom={position.zoom}
          onMoveEnd={(pos) => setPosition(pos as any)}
        >
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => {
                // Try to match geo.properties.name with our countries
                const countryName = geo.properties.name
                const matchedCountry = countryMap.get(countryName)
                
                const isHardcodedComingSoon = hardcodedComingSoon.has(countryName)
                const isSupported = !!matchedCountry || isHardcodedComingSoon
                const isComingSoon = isHardcodedComingSoon || (matchedCountry && matchedCountry.status !== 'published')
                
                // If it's a hardcoded coming soon country, create a dummy object for the tooltip
                const tooltipCountry = isHardcodedComingSoon ? {
                  id: countryName,
                  name: countryName,
                  iso_code: '',
                  slug: '#',
                  flag_emoji: getFlagEmoji(countryName),
                  status: 'coming_soon',
                  stats: null
                } : matchedCountry
                
                // Styling logic
                let defaultFill = "#1E2A42"
                let hoverFill = "#2A3A5A"
                
                if (isSupported) {
                   if (isComingSoon) {
                     defaultFill = "#f97316" // orange-500
                     hoverFill = "#ea580c" // orange-600
                   } else {
                     defaultFill = "#14b8a6" // Teal for active
                     hoverFill = "#0d9488"
                   }
                }

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onMouseEnter={(e) => {
                      if (isSupported && position.zoom <= 2.5) {
                        if (timeoutRef.current) clearTimeout(timeoutRef.current)
                        // Small delay before showing new tooltip to allow moving over other countries
                        timeoutRef.current = setTimeout(() => {
                          setHoveredCountry((prev: any) => {
                             if (prev && prev.geo.id === tooltipCountry?.id) return prev;
                             return {
                               geo: tooltipCountry,
                               stats: stats[tooltipCountry?.id || ''] || {},
                               x: e.clientX,
                               y: e.clientY
                             }
                          })
                        }, 100)
                      }
                    }}
                    onMouseLeave={() => {
                      if (timeoutRef.current) clearTimeout(timeoutRef.current)
                      timeoutRef.current = setTimeout(() => {
                        setHoveredCountry(null)
                      }, 500) // Give more time to move cursor to the tooltip
                    }}
                    onClick={() => {
                      // Optional: handle clicks on the geography
                    }}
                    style={{
                      default: {
                        fill: defaultFill,
                        stroke: "#0A1A2F",
                        strokeWidth: 0.5,
                        outline: "none",
                        transition: "all 250ms",
                      },
                      hover: {
                        fill: hoverFill,
                        stroke: isSupported ? "#fff" : "#0A1A2F",
                        strokeWidth: isSupported ? 1 : 0.5,
                        outline: "none",
                        cursor: isSupported && position.zoom <= 2.5 ? "pointer" : "default",
                      },
                      pressed: {
                        fill: hoverFill,
                        outline: "none",
                      },
                    }}
                  />
                )
              })
            }
          </Geographies>

          {/* Render Clinics when zoomed in */}
          {position.zoom > 2.5 && clinics.map(clinic => (
            <Marker 
              key={clinic.id} 
              coordinates={[clinic.lng, clinic.lat]}
              onMouseEnter={(e) => {
                if (timeoutRef.current) clearTimeout(timeoutRef.current)
                timeoutRef.current = setTimeout(() => {
                  setHoveredClinic((prev: any) => {
                     if (prev && prev.id === clinic.id) return prev;
                     return {
                       ...clinic,
                       x: e.clientX,
                       y: e.clientY
                     }
                  })
                }, 100)
              }}
              onMouseLeave={() => {
                if (timeoutRef.current) clearTimeout(timeoutRef.current)
                timeoutRef.current = setTimeout(() => {
                  setHoveredClinic(null)
                }, 500)
              }}
            >
              <Link href={`/${locale}/clinics/${clinic.slug}` as any}>
                <circle 
                  r={position.zoom > 4 ? 0.8 : 1.5} 
                  fill="#14b8a6" 
                  stroke="#fff" 
                  strokeWidth={0.5} 
                  className="cursor-pointer transition-all duration-300 hover:fill-teal-300"
                  style={{ outline: "none" }}
                />
              </Link>
            </Marker>
          ))}
        </ZoomableGroup>
      </ComposableMap>

      {/* Custom Tooltip */}
      <AnimatePresence>
        {hoveredClinic ? (
          <motion.div
            key="clinic-tooltip"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            onMouseEnter={() => {
              if (timeoutRef.current) clearTimeout(timeoutRef.current)
            }}
            onMouseLeave={() => {
              timeoutRef.current = setTimeout(() => {
                setHoveredClinic(null)
              }, 500)
            }}
            className="fixed pointer-events-auto z-[60] bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.2)] border border-navy/10 min-w-[200px]"
            style={{ 
              left: hoveredClinic.x + 15, 
              top: hoveredClinic.y + 15 
            }}
          >
            <div className="flex items-start gap-2 mb-2">
              <MapPin className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-navy text-sm leading-tight">{hoveredClinic.name}</h3>
                {hoveredClinic.city_rel && (
                  <p className="text-xs text-navy/60 mt-1">{hoveredClinic.city_rel.name}</p>
                )}
              </div>
            </div>
            <Link href={`/${locale}/clinics/${hoveredClinic.slug}` as any} className="pt-2 mt-2 border-t border-navy/5 flex items-center text-xs font-bold text-teal-700 hover:text-teal-500 transition-colors cursor-pointer">
               View Clinic <ArrowRight className="w-3 h-3 ml-1" />
            </Link>
          </motion.div>
        ) : hoveredCountry ? (
          <motion.div
            key="country-tooltip"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            onMouseEnter={() => {
              if (timeoutRef.current) clearTimeout(timeoutRef.current)
            }}
            onMouseLeave={() => {
              timeoutRef.current = setTimeout(() => {
                setHoveredCountry(null)
              }, 500)
            }}
            className="fixed pointer-events-auto z-50 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.2)] border border-navy/10 min-w-[200px]"
            style={{ 
              left: hoveredCountry.x + 15, 
              top: hoveredCountry.y + 15 
            }}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">{hoveredCountry.geo.flag_emoji || '🌍'}</span>
              <h3 className="font-bold text-navy text-lg">{hoveredCountry.geo.name}</h3>
            </div>
            
            {hoveredCountry.geo.status !== 'published' ? (
               <div className="mt-3">
                 <div className="text-xs font-semibold uppercase tracking-wider text-orange-600 bg-orange-50 inline-block px-2 py-1 rounded-md mb-2">
                   Coming Soon
                 </div>
                 <p className="text-sm text-navy/70 leading-relaxed">
                   Are you a top clinic here?
                 </p>
                 <Link href={`/${locale}/list-your-clinic` as any} className="pt-2 mt-2 border-t border-navy/5 flex items-center text-xs font-bold text-orange-600 hover:text-orange-500 transition-colors cursor-pointer block w-full">
                    List Your Clinic <ArrowRight className="w-3 h-3 ml-1" />
                 </Link>
               </div>
            ) : (
               <div className="space-y-2 mt-3">
                 {hoveredCountry.stats?.procedure_count > 0 && (
                   <div className="flex items-center gap-2 text-sm text-navy/70">
                     <Activity className="w-4 h-4 text-teal-600" />
                     <span>{hoveredCountry.stats.procedure_count} Treatments</span>
                   </div>
                 )}
                 {hoveredCountry.stats?.min_price_gbp && (
                   <div className="flex items-center gap-2 text-sm text-navy/70">
                     <Users className="w-4 h-4 text-blue-600" />
                     <span>From £{hoveredCountry.stats.min_price_gbp.toLocaleString('en-GB')}</span>
                   </div>
                 )}
                 <Link href={`/${locale}/destinations/${hoveredCountry.geo.slug}` as any} className="pt-2 mt-2 border-t border-navy/5 flex items-center text-xs font-bold text-teal-700 hover:text-teal-500 transition-colors cursor-pointer block w-full">
                    Explore Clinics <ArrowRight className="w-3 h-3 ml-1" />
                 </Link>
               </div>
            )}
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* Floating Instructions */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full pointer-events-none">
        <p className="text-white/80 text-sm font-medium flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
          Hover over highlighted countries to explore
        </p>
      </div>
    </div>
  )
}
