import { User } from "./User";

interface GameMdl {
  id: string;
  players: User[];
  scoreR: number;
  scoreL: number;
  error: string;
  mode: string;
  status: string;
  winnerId: string;
  type: string;
  owner: User;
}

export interface UserDetails {
    id: string;
    createAt?: string;
    updatedAt?: string;
    online: boolean;
    email: string;
    nickname: string;
    login42: boolean;
    fullName: string;
    twoFAuthSecret?: string;
    is2FAuthEnabled?: boolean;
    is2FAPassed: boolean;
    isPlaying: boolean,
    
    imageUrl?: string;
    expert: boolean;
    playerOf: GameMdl[];
    winCount: number;
    lossCount: number;
    winRatio: number;
    firstCon: boolean;
  }
