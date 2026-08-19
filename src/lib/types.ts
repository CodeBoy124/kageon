export enum SinWeightProperty {
	VENIAL,
	MORTAL
}

export interface SinEntry {
	uid: string;
	commandment: number;
	weight: SinWeightProperty;
	sin: string;
}

export enum CommandmentsVariant {
	CATHOLIC,
	PROTESTANT
}

export interface AppStorageStructure {
	sins: SinEntry[];
	last_confession: number; // in days since Jan. 1st 1970
	commandments_variant?: CommandmentsVariant;
}

export enum ScreenKind {
	PASSWORD,
	OVERVIEW,
	DETAIL
}
