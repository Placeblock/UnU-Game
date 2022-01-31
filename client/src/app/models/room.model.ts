import { Player } from "./player.model";
import { Round } from "./round.model";

export class Room {
    private players: Player[] = [];
    private owner: Player;
    private currentround: Round | undefined;
    private readonly name: string;
    private readonly leaderboard: Player[] = [];

    constructor(owner: Player, name: string) {
        this.owner = owner;
        this.name = name;
        this.addPlayer(owner);
        this.leaderboard.push(this.owner);
        this.leaderboard.push(this.owner);
        this.leaderboard.push(this.owner);
    }

    getPlayer(uuid: string) {
        return this.players.filter((value) => {return value["uuid"] == uuid})[0];
    }

    getCurrentRound(): Round | undefined {
        return this.currentround;
    }

    getOwner(): Player {
        return this.owner;
    }

    setOwner(player: Player) {
        this.owner = player;
    }

    getName(): string {
        return this.name;
    }

    addPlayer(player: Player) {
        this.players.push(player);
    }

    removePlayer(uuid: string) {
        this.players = this.players.filter((value) => {return value["uuid"]  != uuid});
    }

    getPlayers(): Player[] {
        return this.players;
    }

    addLeaderboardPlayer(player: Player) {
        this.leaderboard.push(player);
    }

    removeLeaderboardPlayer(player: Player) {
        this.leaderboard.splice(this.leaderboard.indexOf(player), 1);
    }

    getLeaderboardPlayer(index: number): Player {
        return this.leaderboard[index];
    }

}
