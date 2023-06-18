import React from "react";

type Mode = "disabled"|"edit"|"view"

const FeedbackContext = React.createContext<{
  mode: Mode,
  setMode: (newMode: Mode) => void
}>({
  mode: "disabled",
  setMode: (mode: Mode) => {}
})

export const useFeedback = () => React.useContext(FeedbackContext)

export const FeedbackProvider = ({ children }: { children: React.ReactNode }) => {
  const [mode, setMode] = React.useState<Mode>("edit")

  return (
    <FeedbackContext.Provider value={{
      mode,
      setMode: setMode
    }}>
      {children}
    </FeedbackContext.Provider>
  )
}