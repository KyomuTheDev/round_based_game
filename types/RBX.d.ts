declare interface ReplicatedStorage {
	Maps: Folder & {
		Testing: MapModel;
	};
}

declare interface ServerScriptService {
	Game: {
		Gamemodes: {
			GamemodeFFA: ModuleScript;
		};
	};
}

declare interface Player {
	PlayerGui: PlayerGui;
}
