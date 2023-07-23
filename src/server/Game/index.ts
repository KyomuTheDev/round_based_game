import { ReplicatedStorage, Workspace } from "@rbxts/services";
import GameSettings from "server/GameSettings";
import Network from "server/Networking";
import UserService from "server/UserService";
import { t } from "@rbxts/t";
import { Gamemodes, GamemodeNames } from "./Gamemodes";
import { Attributes, AttributeNames } from "./GameAttributes";
import SharedTimer from "server/SharedTimer";

const choose = Network.Get("Choose");
const setTimer = Network.Get("SetTimer");
const mapChoosen = Network.Get("MapChoosen");
const gamemodeChoosen = Network.Get("GamemodeChoosen");
const attributeChoosen = Network.Get("AttributeChoosen");

const random = new Random();

class Game {
	private gamemode!: Gamemode;
	private map!: MapModel;
	private atttribute!: GameAttribute;

	private GetChoices(array: (Instance | Gamemode | GameAttribute)[]): LuaTuple<[string[], Map<string, number>]> {
		const choices = new Map<string, number>();
		const choosables: string[] = [];

		for (const _ of $range(1, array.size())) {
			const index = random.NextInteger(0, array.size() - 1);
			const name = array[index].Name;

			choosables.push(name);
			array.remove(index);

			choices.set(name, 0);
		}

		return $tuple(choosables, choices);
	}

	private Choose(title: string, choosables: string[], choices: Map<string, number>): string {
		const chosenPlayers: Player[] = [];

		for (const [plr, _] of UserService.GetUsers()) {
			choose.CallPlayerAsync(plr, title, choosables).andThen(
				(choice) => {
					if (!t.string(choice) || choices.get(choice) === undefined) plr.Kick("Cheating is not allowed!");

					if (chosenPlayers.includes(plr)) return;

					choices.set(choice, (choices.get(choice) as number) + 1);
					chosenPlayers.push(plr);
				},
				() => print(`${plr.Name} did not choose a ${title}.`),
			);
		}

		setTimer.SendToAllPlayers(`Choosing ${title}`, GameSettings.ChoosingTime);
		SharedTimer.setLength(GameSettings.ChoosingTime);
		SharedTimer.setTitle(`Choosing ${title}`);
		SharedTimer.runSync();

		let highest = "";
		let highestScore = -1;

		for (const [name, score] of choices) {
			if (score > highestScore) {
				highest = name;
				highestScore = score;
			}
		}

		return highest;
	}

	ChooseMap() {
		const maps = ReplicatedStorage.Maps.GetChildren();
		const [choosableMaps, choices] = this.GetChoices(maps);
		const choice = this.Choose("map", choosableMaps, choices);

		mapChoosen.SendToAllPlayers(choice);

		this.LoadMap(choice);
	}

	ChooseGamemode() {
		const gamemodes = table.clone(Gamemodes);
		const [choosableGamemodes, choices] = this.GetChoices(gamemodes);
		const choice = this.Choose("gamemode", choosableGamemodes, choices);

		gamemodeChoosen.SendToAllPlayers(choice);

		this.gamemode = GamemodeNames[choice];
	}

	ChooseAttribute() {
		const attributes = table.clone(Attributes);
		const [choosableAttributes, choices] = this.GetChoices(attributes);
		const choice = this.Choose("attribute", choosableAttributes, choices);

		attributeChoosen.SendToAllPlayers(choice);

		this.atttribute = AttributeNames[choice];
	}

	LoadMap(map: string) {
		const model = ReplicatedStorage.Maps.FindFirstChild(map) as MapModel | undefined;
		// this is impossible due to the usage of LoadMap but just in case and to shut the type checker up
		if (!model) return;
		this.map = model;
		this.map.Parent = Workspace;
	}

	LoadGamemode(gamemode: string) {
		this.gamemode.Init();
	}

	LoadAttribute(attribute: string) {
		this.atttribute.Load();
	}

	UnloadMap() {
		this.map.Destroy();
		this.map = undefined as never;
	}

	UnloadGamemode() {
		this.gamemode.Deinit();
		this.gamemode = undefined as never;
	}

	UnloadAttribute() {
		this.atttribute.Unload();
		this.atttribute = undefined as never;
	}

	Intermission() {
		setTimer.SendToAllPlayers("Intermission", GameSettings.IntermissionTime);

		SharedTimer.setLength(GameSettings.IntermissionTime);
		SharedTimer.setTitle("Intermission");
		SharedTimer.runSync();
	}

	Start() {
		const players = UserService.GetUsers();
		const spawnPoints = this.map.SpawnPoints.GetChildren() as BasePart[];
		const parts: BasePart[] = [];

		let count = 0;

		for (const [plr, _] of players) {
			const spawnPoint = spawnPoints[count];
			const character = plr.Character;
			if (!character) continue;

			const primaryPart = character.PrimaryPart;
			if (!primaryPart) continue;

			primaryPart.Anchored = true;
			character.PivotTo(spawnPoint.CFrame);

			parts.push(primaryPart);

			count++;
		}

		setTimer.SendToAllPlayers("Starting...", GameSettings.WaitTime);
		SharedTimer.setLength(GameSettings.WaitTime);
		SharedTimer.setTitle("Starting...");
		SharedTimer.runSync();

		for (const part of parts) {
			part.Anchored = false;
		}

		this.gamemode.Init();
		this.atttribute.Load();
	}

	Stop() {
		this.gamemode.Deinit();
		this.atttribute.Unload();

		for (const [plr, _] of UserService.GetUsers()) {
			const character = plr.Character as { Humanoid: Humanoid } | undefined;
			if (!character) continue;

			character.Humanoid.Health = -1;
		}
	}
}

export default Game;
