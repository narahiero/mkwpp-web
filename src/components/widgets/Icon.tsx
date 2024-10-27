import { Region } from "../../api";
import "./Icon.css";
import Flag from "./Flags";
import { Flags } from "./Flags";

import { ReactComponent as CommentIcon } from "../../assets/icons/comment.svg";
import { ReactComponent as GhostIcon } from "../../assets/icons/ghost.svg";
import { ReactComponent as VideoIcon } from "../../assets/icons/video.svg";
import { ReactComponent as DropdownCaret } from "../../assets/icons/dropdowncaret.svg";

export const Icons = {
  Comment: CommentIcon,
  Ghost: GhostIcon,
  Video: VideoIcon,
  Caret: DropdownCaret,
};

export interface IconProps {
  icon: keyof typeof Icons;
}

const Icon = ({ icon }: IconProps) => {
  const IconElement = Icons[icon];

  return (
    <span className="icon">
      <IconElement />
    </span>
  );
};

export interface FlagIconProps {
  region?: Region;
}

export const FlagIcon = ({ region }: FlagIconProps) => {
  return (
    <span className="flag-icon">
      {region && <Flag flag={region.code.toLowerCase() as keyof typeof Flags} />}
    </span>
  );
};

export default Icon;
