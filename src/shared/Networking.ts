import Net from "@rbxts/net";

const SharedNet = Net.CreateDefinitions({
	SetTimer: Net.Definitions.ServerToClientEvent<[title: string, time: number]>(),
	GetTimer: Net.Definitions.ServerAsyncFunction<() => { title: string; time: number }>(),
	Choose: Net.Definitions.ClientAsyncFunction<(title: string, choices: string[]) => string>(),
	MapChoosen: Net.Definitions.ServerToClientEvent<[map: string]>(),
	GamemodeChoosen: Net.Definitions.ServerToClientEvent<[gamemode: string]>(),
	AttributeChoosen: Net.Definitions.ServerToClientEvent<[attribute: string]>(),
});

export = SharedNet;
