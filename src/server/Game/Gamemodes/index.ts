import GamemodeFFA from "./GamemodeFFA";

const gamemodeFFA = new GamemodeFFA();

export const Gamemodes: Gamemode[] = [gamemodeFFA];
export const GamemodeNames: { [key: string]: Gamemode } = {
	["FFA"]: gamemodeFFA,
};
