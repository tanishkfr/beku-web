"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

const ArrivalContext = createContext({ heroBekuVisible: false })

export function ArrivalProvider({ children }: { children: ReactNode }) {
  const [heroBekuVisible, setHeroBekuVisible] = useState(true)

  useEffect(() => {
    const el = document.querySelector("[data-beku-hero]")
    if (!el) {
      setHeroBekuVisible(false)
      return
    }
    // rootMargin "-72px 0px 0px 0px": only trigger when element clears the nav bar height.
    // Prevents threshold-0 flickering near the boundary and makes the FLIP fire
    // when the headline is cleanly off-screen rather than at 1px.
    const obs = new IntersectionObserver(
      ([entry]) => setHeroBekuVisible(entry.isIntersecting),
      { threshold: 0, rootMargin: "-72px 0px 0px 0px" }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <ArrivalContext.Provider value={{ heroBekuVisible }}>
      {children}
    </ArrivalContext.Provider>
  )
}

export const useArrivalContext = () => useContext(ArrivalContext)
