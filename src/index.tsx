import {
  List,
  ActionPanel,
  Action,
  showToast,
  Toast,
  Icon,
  getPreferenceValues,
} from "@raycast/api";
import { useState, useEffect } from "react";
import { readdirSync, statSync } from "fs";
import { join } from "path";

interface Preferences {
  kundenPath: string;
}

interface Kunde {
  name: string;
  path: string;
}

function getKunden(basePath: string): Kunde[] {
  try {
    const entries = readdirSync(basePath);

    return entries
      .filter((entry) => {
        // Keine versteckten Dateien
        if (entry.startsWith(".")) return false;

        try {
          return statSync(join(basePath, entry)).isDirectory();
        } catch {
          return false;
        }
      })
      .map((entry) => ({
        name: entry,
        path: join(basePath, entry),
      }))
      .sort((a, b) => a.name.localeCompare(b.name, "de"));
  } catch (error) {
    return [];
  }
}

export default function Command() {
  const preferences = getPreferenceValues<Preferences>();
  const kundenPath = preferences.kundenPath;

  const [kunden, setKunden] = useState<Kunde[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!kundenPath) {
      showToast({
        style: Toast.Style.Failure,
        title: "Kein Pfad gesetzt",
        message: "Bitte setze den Kundenordner-Pfad in den Extension-Einstellungen.",
      });
      setIsLoading(false);
      return;
    }

    const result = getKunden(kundenPath);

    if (result.length === 0) {
      showToast({
        style: Toast.Style.Failure,
        title: "Keine Kunden gefunden",
        message: `Pfad: ${kundenPath}`,
      });
    }

    setKunden(result);
    setIsLoading(false);
  }, [kundenPath]);

  return (
    <List isLoading={isLoading} searchBarPlaceholder="Kunde suchen…">
      {kunden.map((kunde) => (
        <List.Item
          key={kunde.name}
          title={kunde.name}
          icon={Icon.Folder}
          accessories={[{ icon: Icon.Finder }]}
          actions={
            <ActionPanel>
              <Action.Open
                title="Im Finder öffnen"
                target={kunde.path}
                icon={Icon.Finder}
              />
              <Action.CopyToClipboard
                title="Pfad kopieren"
                content={kunde.path}
                shortcut={{ modifiers: ["cmd", "shift"], key: "c" }}
              />
              <Action.Open
                title="Im Terminal öffnen"
                target={kunde.path}
                application="Terminal"
                shortcut={{ modifiers: ["cmd"], key: "t" }}
              />
            </ActionPanel>
          }
        />
      ))}
    </List>
  );
}