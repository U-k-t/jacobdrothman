import { Button } from "../ui/button";

interface ReplayButtonProps {
  onReplay: () => void;
}

export function ReplayButton({ onReplay }: ReplayButtonProps) {
  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      onClick={onReplay}
      aria-label="Replay travel animation"
    >
      Replay trips
    </Button>
  );
}
