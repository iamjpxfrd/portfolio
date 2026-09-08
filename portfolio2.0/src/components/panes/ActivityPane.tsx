import { GitHubCalendar } from "react-github-calendar";
import { profile } from "../../data/resume";
import { useThemeContext } from "../../context/ThemeContext";

const CALENDAR_THEME = {
  dark: ["#141414", "#3a3a3a", "#606060", "#8c8c8c", "#e8e8e8"],
  light: ["#e2e2e2", "#b8b8b8", "#8a8a8a", "#565656", "#171717"],
};

export function ActivityPane() {
  const theme = useThemeContext();

  return (
    <>
      <div style={{ marginBottom: 14 }}>
        <span className="prompt">darwin@cit-u:~$</span> cat activity.log
      </div>
      <div className="contrib-scroll">
        <GitHubCalendar
          username={profile.githubUsername}
          colorScheme={theme}
          theme={CALENDAR_THEME}
          blockSize={7}
          blockMargin={2}
          blockRadius={0}
          fontSize={10}
          showColorLegend
          showTotalCount
        />
      </div>
    </>
  );
}
