import IIxHealth from "./IIxHealth";

const iixHealth = new IIxHealth();

export const Attributes: GameAttribute[] = [iixHealth];
export const AttributeNames: { [key: string]: GameAttribute } = {
	["2xHealth"]: iixHealth,
};
