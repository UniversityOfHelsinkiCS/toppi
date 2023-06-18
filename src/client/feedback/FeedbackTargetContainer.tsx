import React from "react";
import { useFeedback } from "./FeedbackProvider";
import { Box, Tooltip } from "@mui/joy";
import { SxProps } from "@mui/joy/styles/types";
import FeedbackForm from "./FeedbackForm";

type FeedbackTargetContainerProps = {
  feedbackId: string
} & React.ComponentProps<typeof Box>

const ActiveFeedbackTargetContainer = (props: FeedbackTargetContainerProps) => {
  const [open, setOpen] = React.useState(false)
  const [opened, setOpened] = React.useState(false)

  const activeSx: SxProps = {
    outlineStyle: "solid",
    outlineColor: "lightblue",
    outlineWidth: "2px",
    outlineOffset: "2px",
    borderRadius: "2px",
    cursor: "pointer",
    "&:hover": {
      outlineColor: "blue",
    },
  }

  const handleClick = () => {
    const newOpen = !open
    setOpen(newOpen)
    if (newOpen) setOpened(true)
    console.log(`Feedback ${newOpen ? "opened" : "closed"} for `, props.feedbackId)
  }

  return (
    <Tooltip variant="outlined" arrow title={<FeedbackForm />} open={open} keepMounted={opened}>
      <Box {...props} sx={{
        ...activeSx,
        ...props.sx
      }} onClick={handleClick}>
        {props.children}
      </Box>
    </Tooltip>
  )
}

const FeedbackTargetContainer = (props: FeedbackTargetContainerProps) => {
  const { mode } = useFeedback()

  if (mode === "disabled") {
    return (
      <Box {...props}>
        {props.children}
      </Box>
    )
  }

  return (
    <ActiveFeedbackTargetContainer {...props}>
      {props.children}
    </ActiveFeedbackTargetContainer>
  )
}

export default FeedbackTargetContainer