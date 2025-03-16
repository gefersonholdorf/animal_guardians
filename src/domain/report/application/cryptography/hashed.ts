export abstract class Hashed {
    abstract hash(text: string): Promise<string>
    abstract compare(text: string, hash: string): Promise<boolean>
}