import Net from "@rbxts/net";

const SharedNet = Net.CreateDefinitions({
	SetTimer: Net.Definitions.ServerToClientEvent<[title: string, time: number]>(),
	Choose: Net.Definitions.ClientAsyncFunction<(title: string, choices: string[]) => string>(),
});

export = SharedNet;
