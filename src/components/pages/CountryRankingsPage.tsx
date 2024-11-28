import { useContext, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";

import Deferred from "../widgets/Deferred";
import { CategorySelect, FlagIcon, LapModeSelect } from "../widgets";
import api from "../../api";
import { useApi } from "../../hooks";
import {
  countryAFTopNumerical,
  countryAFTopToString,
  getCategorySiteHue,
} from "../../utils/EnumUtils";
import OverwriteColor from "../widgets/OverwriteColor";
import {
  useCategoryParam,
  useLapModeParam,
  useRegionTypeRestrictedParam,
  useRowHighlightParam,
  useTopParam,
} from "../../utils/SearchParams";
import Dropdown, { DropdownData } from "../widgets/Dropdown";
import {
  TimetrialsRegionsRankingsListTopEnum,
  TimetrialsRegionsRankingsListTypeEnum,
} from "../../api/generated";
import { handleBars, I18nContext } from "../../utils/i18n/i18n";
import { SettingsContext } from "../../utils/Settings";
import { LapModeEnum } from "../widgets/LapModeSelect";

const CountryRankingsPage = () => {
  const searchParams = useSearchParams();
  const { category, setCategory } = useCategoryParam(searchParams, ["hl"]);
  const { lapMode, setLapMode } = useLapModeParam(searchParams, false, ["hl"]);
  const { top, setTopNumber } = useTopParam(searchParams, ["hl"]);
  const { regionType, setRegionType } = useRegionTypeRestrictedParam(searchParams, ["hl"]);

  const { settings } = useContext(SettingsContext);
  const { translations, lang } = useContext(I18nContext);

  const highlight = useRowHighlightParam(searchParams).highlight;
  const { isLoading, data } = useApi(
    () =>
      api.timetrialsRegionsRankingsList({
        category,
        lapMode,
        top,
        type: regionType,
      }),
    [category, lapMode, top, regionType],
    "countryRankingsTops",
  );

  const highlightElement = useRef(null);
  useEffect(() => {
    if (highlightElement !== null) {
      (highlightElement.current as unknown as HTMLDivElement)?.scrollIntoView({
        inline: "center",
        block: "center",
      });
    }
  }, [highlightElement, isLoading]);

  const siteHue = getCategorySiteHue(category, settings);

  let text = "err";
  switch (top) {
    case TimetrialsRegionsRankingsListTopEnum.Records:
      text = translations.countryRankingsPageExplanationRecords[lang];
      break;
    case TimetrialsRegionsRankingsListTopEnum.Top3:
      text = translations.countryRankingsPageExplanationTop3[lang];
      break;
    case TimetrialsRegionsRankingsListTopEnum.Top5:
      text = translations.countryRankingsPageExplanationTop5[lang];
      break;
    case TimetrialsRegionsRankingsListTopEnum.Top10:
      text = translations.countryRankingsPageExplanationTop10[lang];
      break;
    case TimetrialsRegionsRankingsListTopEnum.All:
      text = translations.countryRankingsPageExplanationAll[lang];
      break;
  }

  return (
    <>
      <h1>{translations.countryRankingsPageHeading[lang]}</h1>
      <p>
        {handleBars(translations.countryRankingsPageExplanation[lang], [
          ["countryRankingsTopType", text],
        ])}
      </p>
      <OverwriteColor hue={siteHue}>
        <div className="module-row">
          <CategorySelect value={category} onChange={setCategory} />
          <LapModeSelect includeOverall value={lapMode} onChange={setLapMode} />
          <Dropdown
            data={
              {
                type: "Normal",
                defaultItemSet: 0,
                value: top,
                valueSetter: setTopNumber,
                data: [
                  {
                    id: 0,
                    children: Object.values(TimetrialsRegionsRankingsListTopEnum)
                      .sort((a, b) => countryAFTopNumerical(a) - countryAFTopNumerical(b))
                      .map((r) => {
                        return {
                          type: "DropdownItemData",
                          element: { text: countryAFTopToString(r), value: r },
                        };
                      }),
                  },
                ],
              } as DropdownData
            }
          />
          <Dropdown
            data={
              {
                type: "Normal",
                defaultItemSet: 0,
                value: regionType,
                valueSetter: setRegionType,
                data: [
                  {
                    id: 0,
                    children: [
                      [
                        TimetrialsRegionsRankingsListTypeEnum.Country,
                        translations.countryRankingsPageDropdownCountries[lang],
                      ],
                      [
                        TimetrialsRegionsRankingsListTypeEnum.Continent,
                        translations.countryRankingsPageDropdownContinents[lang],
                      ],
                      [
                        TimetrialsRegionsRankingsListTypeEnum.Subnational,
                        translations.countryRankingsPageDropdownSubregions[lang],
                      ],
                    ].map(([value, text]) => {
                      return {
                        type: "DropdownItemData",
                        element: { text, value },
                      };
                    }),
                  },
                ],
              } as DropdownData
            }
          />
        </div>
        <div className="module">
          <Deferred isWaiting={isLoading}>
            <table>
              <thead>
                <tr>
                  <th>{translations.countryRankingsPageRank[lang]}</th>
                  <th>{translations.countryRankingsPageCountry[lang]}</th>
                  <th>{translations.countryRankingsPageAverageFinish[lang]}</th>
                </tr>
              </thead>
              <tbody className="table-hover-rows">
                {data?.map((stats, idx, arr) => {
                  const calculatedValueStr = (
                    stats.totalRank / (lapMode === LapModeEnum.Overall ? 64 : 32)
                  ).toFixed(4);
                  const calculatedValue = parseFloat(calculatedValueStr);
                  return (
                    <>
                      {highlight &&
                      calculatedValue > highlight &&
                      (arr[idx - 1] === undefined ||
                        arr[idx - 1].totalRank / (lapMode === LapModeEnum.Overall ? 64 : 32) <
                          highlight) ? (
                        <>
                          <tr ref={highlightElement} key={highlight} className="highlighted">
                            <td />
                            <td>{translations.genericRankingsYourHighlightedValue[lang]}</td>
                            <td>{highlight}</td>
                          </tr>
                        </>
                      ) : (
                        <></>
                      )}
                      <tr
                        key={stats.region.code}
                        className={calculatedValue === highlight ? "highlighted" : ""}
                        ref={calculatedValue === highlight ? highlightElement : undefined}
                      >
                        <td>{stats.rank}</td>
                        <td>
                          <FlagIcon showRegFlagRegardless={true} region={stats.region} />
                          <span>{stats.region.name}</span>
                        </td>
                        <td>{calculatedValueStr}</td>
                      </tr>
                    </>
                  );
                })}
              </tbody>
            </table>
          </Deferred>
        </div>
      </OverwriteColor>
    </>
  );
};

export default CountryRankingsPage;
