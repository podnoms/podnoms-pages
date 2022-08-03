import { PodcastEntry } from "models";
export interface ISharingDialogProps {
  handleClose: () => void;
  episode: PodcastEntry;
  show: boolean;
}
