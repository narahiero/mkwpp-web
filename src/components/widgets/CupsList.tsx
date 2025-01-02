import { useContext } from "react";
import { Link } from "react-router-dom";
import { I18nContext, translate, translateTrack, TranslationKey } from "../../utils/i18n/i18n";
import { getTrackById, MetadataContext } from "../../utils/Metadata";
import { Pages, resolvePage } from "../pages";
import Deferred from "./Deferred";
import "./CupsList.css";
import { TrackCup } from "../../api";

interface CupTracksProps {
  cup: TrackCup;
}

const CupTracks = ({ cup }: CupTracksProps) => {
  const { lang } = useContext(I18nContext);
  const metadata = useContext(MetadataContext);

  return (
    <div key={cup.id} className="module">
      <div className="module-content cups-list-cup">
        <b>{translate(`constantCup${cup.code.toUpperCase()}` as TranslationKey, lang)}</b>
        <ul>
          {cup.tracks.map((trackId) => (
            <li key={trackId}>
              <Link to={resolvePage(Pages.TrackChart, { id: trackId })}>
                {translateTrack(getTrackById(metadata.tracks, trackId), lang)}
              </Link>
            </li>
          ))}
        </ul>
        <div className="cups-list-cup-image-div">
          <img
            src={`/mkw/cups/${cup.id}.png`}
            className="cups-list-cup-image"
            alt="cups-list-cup-image"
          />
        </div>
      </div>
    </div>
  );
};

const CupsList = () => {
  const metadata = useContext(MetadataContext);
  return (
    <>
      <Deferred isWaiting={metadata.isLoading}>
        <div className="cups-list">{metadata.cups?.map((cup) => <CupTracks cup={cup} />)}</div>
      </Deferred>
    </>
  );
};

export default CupsList;
