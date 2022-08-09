import { Domain, PodcastEntry } from "models";
export interface ISharingDialogProps {
  handleClose: () => void;
  domain: Domain;
  episode: PodcastEntry;
  show: boolean;
}
