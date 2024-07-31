import { RocketIcon } from "@radix-ui/react-icons"

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

export function AlertDemo() {
  return (
    <Alert>
      <RocketIcon className="h-4 w-4" />
      <AlertTitle>Yoooo</AlertTitle>
      <AlertDescription>
        Your new development habit is waiting.
      </AlertDescription>
    </Alert>
  )
}
