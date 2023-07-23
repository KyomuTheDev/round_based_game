import SharedNet from "shared/Networking";

const Network = SharedNet.Server;

Network.Get("Choose").SetCallTimeout(10);

export = Network;
