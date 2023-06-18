import { Box, Button, FormControl, FormLabel, Input, Sheet, Textarea, Typography } from "@mui/joy"
import React from "react"

const FeedbackForm = () => {
  const [feedbackText, setFeedbackText] = React.useState("")
  
  return (
    <Sheet sx={{ resize: "horizontal" }}>
      <Box p="0.5rem">
        <form>
          <FormControl required>
            <FormLabel>Palaute</FormLabel>
            <Textarea slotProps={{ textarea: { minLength: 5 } }} value={feedbackText} onChange={(e) => setFeedbackText(e.target.value)} />
          </FormControl>
          <Button size="sm" sx={{ my: "0.5rem" }} disabled={feedbackText.length < 5}>Lähetä</Button>
          <Typography level="body3">Huom., annat palautetta omalla nimelläsi</Typography>
        </form>
      </Box>
    </Sheet>
  )
}

export default FeedbackForm