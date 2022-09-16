interface Init {
    name: string | Iterable<string>;
}
declare abstract class Parsable {
    parsed: boolean;
    names: Set<string>;
    constructor(init: Init);
    abstract Validate(index: string): boolean;
    abstract Parse(args: string[]): void;
}
interface OptionInit extends FlagInit {
    argumentCount: number;
}
export declare class Option extends Parsable {
    shortNames: Set<string>;
    argumentCount: number;
    arguments: string[];
    constructor(init: OptionInit);
    Parse(args: string[]): void;
    Validate(index: string): boolean;
}
interface FlagInit extends Init {
    shortName?: string | string[];
}
export declare class Flag extends Option {
    constructor(init: FlagInit);
}
declare type CommandHandler = (this: Command) => void | Promise<void>;
interface CommandInit extends Init {
    handler?: CommandHandler;
    options?: Iterable<OptionInit | Option>;
    flags?: Iterable<FlagInit | Flag>;
    commands?: Iterable<CommandInit | Command>;
}
interface ExecContext {
    cwd?: string;
    execDir?: string;
    scriptPath?: string;
}
export declare class Command extends Parsable {
    #private;
    options: Set<Option>;
    commands: Set<Command>;
    handler: CommandHandler | null;
    parsedCommand: Command | null;
    arguments: string[];
    constructor(init: CommandInit);
    AddOptions(options: Iterable<OptionInit | Option>): void;
    AddFlags(flags: Iterable<FlagInit | Flag>): void;
    AddCommands(commands: Iterable<CommandInit | Command>): void;
    Validate(index: string): boolean;
    Find(index: string): Parsable | null;
    GetOption(index: string): string[];
    GetFlag(index: string): boolean;
    GetSingle(index: string | number): string;
    Parse(args: string[]): void;
    Execute(context?: ExecContext): Promise<void>;
}
export default class CLI extends Command {
    execContext: ExecContext;
    Execute(context?: ExecContext): Promise<void>;
}
export { CLI };
