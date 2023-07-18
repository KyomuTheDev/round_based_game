import SharedNet from "shared/Networking";

const Network = SharedNet.Server;

Network.Get("ChooseMap").SetCallTimeout(10);
Network.Get("ChooseGamemode").SetCallTimeout(10);
Network.Get("ChooseAttribute").SetCallTimeout(10);

export = Network;
